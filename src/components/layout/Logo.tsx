import { Flame } from "lucide-react";
import { restaurant } from "../../data/restaurant";
export function Logo({
  footer = false,
  href = "#startseite",
}: {
  footer?: boolean;
  href?: string;
}) {
  const [firstWord, ...remainingWords] = restaurant.name.split(" ");
  return (
    <a
      className={`logo ${footer ? "footer-logo" : ""}`}
      href={href}
      aria-label={`${restaurant.name} – zur Startseite`}
    >
      <Flame strokeWidth={1.8} />
      <span>
        {firstWord}
        <span className="logo-space">{` ${remainingWords.join(" ")}`}</span>
        <small>{restaurant.tagline}</small>
      </span>
    </a>
  );
}
