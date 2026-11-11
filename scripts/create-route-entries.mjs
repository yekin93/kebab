import { readFile, mkdir, writeFile } from "node:fs/promises";

const html = await readFile(
  new URL("../dist/index.html", import.meta.url),
  "utf8",
);
for (const route of ["speisekarte", "entwickler/qr"]) {
  let entry = html.replace(
    /<title>.*?<\/title>/s,
    `<title>${route === "speisekarte" ? "Unsere Speisekarte | KÖZ KEBAP" : "QR-Menükarte · Entwicklung | KÖZ KEBAP"}</title>`,
  );
  if (route === "entwickler/qr")
    entry = entry.replace(
      "</head>",
      '<meta name="robots" content="noindex, nofollow" /></head>',
    );
  const directory = new URL(`../dist/${route}/`, import.meta.url);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL("index.html", directory), entry);
}
console.log("Static route entries generated: /speisekarte and /entwickler/qr");
