const gridStyle = (color) => ({
  backgroundImage: [
    `linear-gradient(${color} 1px, transparent 1px)`,
    `linear-gradient(90deg, ${color} 1px, transparent 1px)`,
  ].join(","),
  backgroundSize: "24px 24px",
});

const darkGridMask =
  "radial-gradient(ellipse 68% 58% at 50% 48%, #000 8%, #000 42%, transparent 78%)";

export function AuthHeroPattern() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(ellipse_90%_70%_at_50%_40%,rgba(0,122,255,0.2),transparent_62%)] dark:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-linear-to-r from-black via-transparent to-black opacity-70 dark:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-linear-to-b from-black/50 via-transparent to-black/90 dark:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 dark:hidden"
        style={gridStyle("rgba(0,0,0,0.11)")}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden dark:block"
        style={{
          ...gridStyle("rgba(255,255,255,0.07)"),
          WebkitMaskImage: darkGridMask,
          maskImage: darkGridMask,
        }}
      />

      {/* Floating orbs — light mode */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[8%] top-[18%] size-28 rounded-full bg-accent/10 blur-3xl animate-[auth-float-y_5s_ease-in-out_infinite] motion-reduce:animate-none dark:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[12%] bottom-[22%] size-20 rounded-full bg-[#5E5CE6]/10 blur-3xl animate-[auth-float-y_7s_ease-in-out_1.5s_infinite] motion-reduce:animate-none dark:hidden"
      />

      {/* Floating orbs — dark mode */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[12%] top-[15%] hidden size-32 rounded-full bg-accent/20 blur-3xl animate-[auth-float-y_5s_ease-in-out_infinite] motion-reduce:animate-none dark:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] bottom-[20%] hidden size-24 rounded-full bg-[#5E5CE6]/22 blur-3xl animate-[auth-float-y_6.5s_ease-in-out_1s_infinite] motion-reduce:animate-none dark:block"
      />
    </>
  );
}
