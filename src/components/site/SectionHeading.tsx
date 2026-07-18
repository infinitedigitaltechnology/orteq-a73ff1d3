import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  const alignCls = align === "center" ? "text-center items-center mx-auto" : "";
  return (
    <div className={`mb-12 flex flex-col gap-4 ${alignCls} max-w-3xl`}>
      {eyebrow ? (
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </span>
      ) : null}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl text-balance">
          {title}
        </h2>
        {action}
      </div>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">
          {description}
        </p>
      ) : null}
    </div>
  );
}
