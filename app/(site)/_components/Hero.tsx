"use client";

import { useEffect, useRef, useState } from "react";
import { img } from "@/lib/images";
import { useMounted } from "@/lib/hooks/use-mounted";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const mounted = useMounted();
  const [isJumping, setIsJumping] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollToNext = () => {
    const heroHeight = heroRef.current?.offsetHeight ?? 0;
    window.scrollTo({ top: heroHeight, behavior: "smooth" });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      const rect = heroRef.current?.getBoundingClientRect();
      rafRef.current = null;
      if (!rect) return;
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      setTilt({ x, y });
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setTilt({ x: 0, y: 0 });
  };

  const handleMascotClick = () => {
    if (isJumping) return;
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 600);
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="hero-stage bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${img("hero_format.png")})` }}
    >
      <div className="hero-stage-inner">
        <div className="w-full mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14">
          {/* Text - kiri */}
          <div className="flex flex-col gap-10 text-center md:text-left">
            <h1
              className={`text-6xl text-center md:text-left md:text-8xl font-bold leading-[1.15] lg-sheen-text hero-fade-in ${mounted ? "hero-fade-in-active" : ""}`}
              style={{ animationDelay: "0ms" }}
            >
              Wilujeng Sumping!
            </h1>
            <h2
              className={`text-4xl text-center md:text-left md:text-6xl font-semibold text-white/90 hero-fade-in ${mounted ? "hero-fade-in-active" : ""}`}
              style={{ animationDelay: "120ms" }}
            >
              Forum Mahasiswa Garut ITB
            </h2>
            <p
              className={`text-lg text-center md:text-left md:text-2xl text-white/70 italic hero-fade-in ${mounted ? "hero-fade-in-active" : ""}`}
              style={{ animationDelay: "240ms" }}
            >
              Niti Harti Surti Tur Mukti
            </p>

            <button
              onClick={scrollToNext}
              className={`lg-btn lg-btn-primary self-center md:self-start px-7 py-3.5 text-base hero-fade-in ${mounted ? "hero-fade-in-active" : ""}`}
              style={{ animationDelay: "360ms" }}
            >
              Ayo Mulai Petualangan!
            </button>
          </div>

          {/* Maskot - kanan */}
          <div
            className={`shrink-0 relative hero-fade-in ${mounted ? "hero-fade-in-active" : ""}`}
            style={{ animationDelay: "180ms" }}
          >
            <div
              className="mascot-shadow"
              style={{
                transform: `translate(${tilt.x * 20}px, 0) scale(${isHovering ? 1.15 : 1})`,
              }}
            />

            {/* Wrapper ini yang megang animasi float (CSS only) */}
            <div className="mascot-float">
              {/* Img ini yang megang tilt dari mouse (JS only) */}
              <img
                src={img("maskot.png")}
                alt="Maskot FORMAT ITB"
                onClick={handleMascotClick}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className={`relative w-40 md:w-81 h-auto cursor-pointer ${isJumping ? "mascot-jump" : ""}`}
                style={{
                  transform: !isJumping
                    ? `translate(${tilt.x * 16}px, ${tilt.y * 12}px) rotate(${tilt.x * 4}deg) scale(${isHovering ? 1.06 : 1})`
                    : undefined,
                  transition: isJumping ? undefined : "transform 0.15s ease-out",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={scrollToNext}
        aria-label="Scroll ke bawah"
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60 hover:text-white/90 transition-colors hero-fade-in ${mounted ? "hero-fade-in-active" : ""}`}
        style={{ animationDelay: "500ms" }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="scroll-chevron"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </section>
  );
}