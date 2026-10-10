"use client";

import { useEffect, useRef } from "react";

export function DynamicBackground({ admin = false }: { admin?: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const move = (event: PointerEvent) => {
      element.style.setProperty("--mouse-x", `${event.clientX}px`);
      element.style.setProperty("--mouse-y", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ "--mouse-x": "50vw", "--mouse-y": "30vh" } as React.CSSProperties}
    >
      <div className="absolute inset-0 bg-[#050816]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(59,130,246,0.18),transparent_18rem),radial-gradient(circle_at_18%_8%,rgba(139,92,246,0.14),transparent_24rem),radial-gradient(circle_at_86%_12%,rgba(0,168,255,0.13),transparent_24rem),linear-gradient(180deg,#050816_0%,#02050f_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0,rgba(139,92,246,0.045)_1px,transparent_1px),linear-gradient(0deg,transparent_0,rgba(59,130,246,0.035)_1px,transparent_1px)] bg-[size:76px_76px] opacity-25" />
      <div className="absolute left-[8%] top-[18%] h-1 w-1 rounded-full bg-[#45bdff] shadow-[0_0_14px_#45bdff]" />
      <div className="absolute right-[12%] top-[26%] h-1.5 w-1.5 rounded-full bg-[#9b5cff] shadow-[0_0_14px_#9b5cff]" />
      <div className="absolute bottom-[18%] left-[42%] h-1 w-1 rounded-full bg-[#45bdff] shadow-[0_0_14px_#45bdff]" />
      {admin ? <div className="absolute inset-0 bg-[#050816]/35" /> : null}
    </div>
  );
}
