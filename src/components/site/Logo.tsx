import { cn } from "@/lib/utils";
import orteqLogo from "@/assets/orteq-logo.png.asset.json";

interface LogoProps {
  className?: string;
  variant?: "header" | "footer";
}

export function Logo({ className, variant = "header" }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <img
        src={orteqLogo.url}
        alt="ORTEQ — Future Technology In Your Hands"
        className={cn(
          "w-auto object-contain",
          variant === "header" ? "h-9 md:h-11" : "h-12 md:h-14",
        )}
      />
    </span>
  );
}
