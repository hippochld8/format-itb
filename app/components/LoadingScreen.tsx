"use client";

import { useEffect, useState } from "react";

type Stage = "in" | "hold" | "out" | "fade" | "hidden";

export default function LoadingScreen() {
  const [stage, setStage] = useState<Stage>("in");

  useEffect(() => {
    const t1 = setTimeout(() => setStage("hold"), 550);
    const t2 = setTimeout(() => setStage("out"), 1400);
    const t3 = setTimeout(() => setStage("fade"), 1900);
    const t4 = setTimeout(() => setStage("hidden"), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []); // <- cuma sekali, gak lagi dengerin perubahan pathname

  if (stage === "hidden") return null;

  return (
    <div
      className={`loading-overlay ${stage === "fade" ? "loading-overlay-out" : ""}`}
      aria-hidden="true"
    >
      <div className={`loading-logo-wrap loading-logo-${stage === "fade" ? "out" : stage}`}>
        <img src="/logo_navbar.svg" alt="" className="loading-logo" />
      </div>
    </div>
  );
}