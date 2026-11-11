import type { ReactNode } from "react";
export function SectionHeading({
  eyebrow,
  children,
  light = false,
}: {
  eyebrow: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`section-heading ${light ? "light" : ""}`}>
      <p className="eyebrow">
        <span />
        {eyebrow}
      </p>
      <h2>{children}</h2>
    </div>
  );
}
