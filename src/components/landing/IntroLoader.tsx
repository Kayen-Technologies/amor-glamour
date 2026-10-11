"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const loaderImages = [
  "frame-56.png",
  "frame-58.png",
  "frame-60.png",
  "frame-61.png",
  "frame-65.png",
  "frame-70.png",
  "frame-80.png",
  "frame-90.png",
];

const nameDuration = 800;
const imageRevealDuration = 1100;
const progressDuration = 3000;
const holdDuration = 800;
const exitDuration = 1320;

type IntroPhase = "name" | "loading" | "hold" | "exit";

interface IntroLoaderProps {
  onComplete: () => void;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [phase, setPhase] = useState<IntroPhase>("name");
  const [progress, setProgress] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [imageRevealed, setImageRevealed] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const skipTimer = window.setTimeout(() => onCompleteRef.current(), 0);
      return () => window.clearTimeout(skipTimer);
    }

    let progressTimer: number | undefined;
    let holdTimer: number | undefined;
    let finishTimer: number | undefined;

    const nameTimer = window.setTimeout(() => {
      setPhase("loading");
      const startedAt = performance.now();
      let currentImage = 0;
      let imageHasSettled = false;

      progressTimer = window.setInterval(() => {
        const elapsed = Math.min(performance.now() - startedAt, progressDuration);
        const nextProgress = Math.floor((elapsed / progressDuration) * 100);
        setProgress(nextProgress);

        if (elapsed >= imageRevealDuration && !imageHasSettled) {
          imageHasSettled = true;
          setImageRevealed(true);
        }

        const imageChanges = Math.max(1, loaderImages.length - 1);
        const changeInterval = progressDuration / imageChanges;
        const nextImage = Math.min(
          Math.floor(elapsed / changeInterval),
          loaderImages.length - 1,
        );

        if (nextImage !== currentImage) {
          currentImage = nextImage;
          setImageIndex(nextImage);
        }

        if (elapsed >= progressDuration) {
          if (progressTimer !== undefined) window.clearInterval(progressTimer);
          setProgress(100);
          setImageIndex(loaderImages.length - 1);
          setPhase("hold");

          holdTimer = window.setTimeout(() => {
            setPhase("exit");
            finishTimer = window.setTimeout(
              () => onCompleteRef.current(),
              exitDuration,
            );
          }, holdDuration);
        }
      }, 30);
    }, nameDuration);

    return () => {
      window.clearTimeout(nameTimer);
      if (progressTimer !== undefined) window.clearInterval(progressTimer);
      if (holdTimer !== undefined) window.clearTimeout(holdTimer);
      if (finishTimer !== undefined) window.clearTimeout(finishTimer);
    };
  }, []);

  const imageSrc = `/images/landing/${loaderImages[imageIndex]}`;

  return (
    <div
      aria-label="Loading Amor Glamour"
      aria-hidden="true"
      className={`intro-loader fixed inset-0 z-[100] flex items-center justify-center overflow-hidden ${phase === "exit" ? "intro-loader--exit" : ""}`}
    >
      <div
        className="intro-loader__content flex flex-col items-center gap-5"
        data-phase={phase}
      >
        <div className="intro-loader__header relative flex h-8 w-full items-center">
          <h1
            className={`intro-loader__name font-car text-xs font-semibold tracking-[0.1em] sm:text-sm ${phase === "name" ? "intro-loader__name--centered" : ""} ${phase === "exit" ? "intro-loader__name--exit" : ""}`}
          >
            AMOR GLAMOUR
          </h1>
          {phase !== "name" && (
            <span
              className={`intro-loader__counter absolute right-0 font-ari text-xs tabular-nums sm:text-sm ${phase === "loading" ? "intro-loader__counter--enter" : ""} ${phase === "exit" ? "intro-loader__counter--exit" : ""}`}
            >
              {progress}
            </span>
          )}
        </div>

        <div className="intro-loader__image-slot relative aspect-[4/5] w-full overflow-hidden">
          {phase !== "name" && (
            <div
              className={`intro-loader__card absolute inset-0 ${imageRevealed ? "intro-loader__card--settled" : "intro-loader__card--enter"} ${phase === "exit" ? "intro-loader__card--exit" : ""}`}
            >
              <Image
                key={imageSrc}
                src={imageSrc}
                alt=""
                fill
                loading="eager"
                sizes="(max-width: 520px) 38vw, 210px"
                className={`intro-loader__photo object-cover ${imageIndex > 0 ? "intro-loader__photo--swap" : ""}`}
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
