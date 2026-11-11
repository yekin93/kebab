import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PNG } from "pngjs";

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { resolvePublicMenuUrl } = await server.ssrLoadModule(
    "/src/lib/publicMenuUrl.ts",
  );
  const { generateMenuQRCode, downloadQRCode, qrOptions } =
    await server.ssrLoadModule("/src/lib/qrCode.ts");
  for (const input of [
    undefined,
    "",
    "no-url",
    "http://restaurant.at",
    "https://localhost",
    "https://127.0.0.1",
    "https://192.168.1.8",
    "https://[::1]",
    "https://restaurant.local",
    "https://restaurant.invalid",
    "https://restaurant.test",
    "https://user:pass@restaurant.at",
    "https://restaurant.at?x=1",
    "https://restaurant.at#menu",
    "https://restaurant.at/base",
    "https://restaurant.at:8080",
  ]) {
    assert.equal(
      resolvePublicMenuUrl(input).url,
      null,
      `Rejected invalid public URL: ${input}`,
    );
    await assert.rejects(() => generateMenuQRCode(input));
  }
  const target = "https://example.com/speisekarte";
  assert.equal(resolvePublicMenuUrl(" https://EXAMPLE.com/ ").url, target);
  const assets = await generateMenuQRCode("https://example.com");
  assert.equal(assets.url, target);
  assert.match(assets.pngDataUrl, /^data:image\/png;base64,/);
  assert.match(assets.svg, /<svg/);
  assert.match(assets.svg, /width="2048"/);
  assert.match(assets.svg, /height="2048"/);
  assert.equal(
    decodeURIComponent(assets.svgDataUrl.split(",").slice(1).join(",")),
    assets.svg,
  );
  const pngBuffer = Buffer.from(assets.pngDataUrl.split(",")[1], "base64");
  const png = PNG.sync.read(pngBuffer);
  assert.equal(png.width, 2048);
  assert.equal(png.height, 2048);
  assert.equal(qrOptions.margin, 4);
  assert.equal(qrOptions.errorCorrectionLevel, "H");
  assert.deepEqual([...png.data.subarray(0, 4)], [255, 255, 255, 255]);
  await mkdir("qa/qr-validation", { recursive: true });
  await writeFile("qa/qr-validation/fixture.png", pngBuffer);
  await writeFile("qa/qr-validation/fixture.svg", assets.svg);
  if (process.env.QR_DECODER_PATH) {
    const { default: jsQR } = await import(
      pathToFileURL(process.env.QR_DECODER_PATH).href
    );
    const decoded = jsQR(
      new Uint8ClampedArray(png.data),
      png.width,
      png.height,
    );
    assert.equal(decoded?.data, target);
    console.log(
      "PASS: Generated PNG decoded with jsQR to the exact /speisekarte target.",
    );
  }
  const downloads = [];
  const blobs = [];
  const originalCreateObjectURL = URL.createObjectURL;
  const originalRevokeObjectURL = URL.revokeObjectURL;
  globalThis.document = {
    createElement: () => ({
      click() {
        downloads.push({ filename: this.download, href: this.href });
      },
      remove() {},
    }),
    body: { append() {} },
  };
  globalThis.window = { setTimeout: (callback) => callback() };
  URL.createObjectURL = (blob) => {
    blobs.push(blob);
    return "blob:qr-test";
  };
  URL.revokeObjectURL = () => {};
  try {
    downloadQRCode(assets, "png");
    downloadQRCode(assets, "svg");
    assert.deepEqual(
      downloads.map((item) => item.filename),
      ["koz-speisekarte.png", "koz-speisekarte.svg"],
    );
    assert.equal(blobs[0].type, "image/png");
    assert.equal(blobs[1].type, "image/svg+xml;charset=utf-8");
    assert.deepEqual(Buffer.from(await blobs[0].arrayBuffer()), pngBuffer);
    assert.equal(await blobs[1].text(), assets.svg);
  } finally {
    URL.createObjectURL = originalCreateObjectURL;
    URL.revokeObjectURL = originalRevokeObjectURL;
    delete globalThis.document;
    delete globalThis.window;
  }
  const { menu, categories } = await server.ssrLoadModule("/src/data/menu.ts");
  const { default: DigitalMenuPage } = await server.ssrLoadModule(
    "/src/pages/DigitalMenuPage.tsx",
  );
  const digitalMarkup = renderToStaticMarkup(createElement(DigitalMenuPage));
  for (const product of menu)
    assert.ok(
      digitalMarkup.includes(product.name.replaceAll("&", "&amp;")),
      `Shared product: ${product.name}`,
    );
  assert.equal(
    (digitalMarkup.match(/class="menu-item"/g) ?? []).length,
    menu.length,
  );
  assert.equal(categories.length, 6);
  const { default: HomePage } = await server.ssrLoadModule(
    "/src/pages/HomePage.tsx",
  );
  const homepageMarkup = renderToStaticMarkup(createElement(HomePage));
  assert.ok(homepageMarkup.includes('id="startseite"'));
  assert.ok(homepageMarkup.includes('id="menu-panel"'));
  assert.ok(!homepageMarkup.includes("/entwickler/qr"));
  const { QRCodeGenerator } = await server.ssrLoadModule(
    "/src/components/qr/QRCodeGenerator.tsx",
  );
  const missingMarkup = renderToStaticMarkup(
    createElement(QRCodeGenerator, { publicSiteUrl: undefined }),
  );
  assert.ok(missingMarkup.includes('role="alert"'));
  assert.equal((missingMarkup.match(/disabled=""/g) ?? []).length, 3);
  assert.ok(!missingMarkup.includes("data:image"));
  for (const route of ["speisekarte", "entwickler/qr"])
    assert.ok(
      (await readFile(`dist/${route}/index.html`, "utf8")).includes("/assets/"),
    );
  assert.ok(
    (await readFile("dist/entwickler/qr/index.html", "utf8")).includes(
      "noindex, nofollow",
    ),
  );
  console.log(
    "PASS: URL validation and disabled state; shared menu products; PNG/SVG generation and dimensions; static route entries.",
  );
  console.log(
    "QR decoding fixture is TEST DATA ONLY: https://example.com/speisekarte. Never print it for the restaurant.",
  );
} finally {
  await server.close();
}
