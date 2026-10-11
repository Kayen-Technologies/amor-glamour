"use client";

import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { Footer } from "@/components/Footer";
import { Content } from "@/components/landing/Content";
import { Experience } from "@/components/landing/Experience";
import { Glow } from "@/components/landing/Glow";
import { Hero, type ThemeMode } from "@/components/landing/Hero";
import { IntroLoader } from "@/components/landing/IntroLoader";

const themeStorageKey = "amor-glamour-theme";

function isThemeMode(value: string | null): value is ThemeMode {
  return value === "light" || value === "dark" || value === "colour";
}

const themeSubscribers = new Set<() => void>();

function getThemeSnapshot(): ThemeMode {
  try {
    const savedMode = window.localStorage.getItem(themeStorageKey);
    if (isThemeMode(savedMode)) return savedMode;
  } catch {
    // Fall back to the document theme when browser storage is unavailable.
  }

  const documentMode = document.documentElement.dataset.theme ?? null;
  return isThemeMode(documentMode) ? documentMode : "light";
}

function getServerThemeSnapshot(): ThemeMode {
  return "light";
}

function subscribeToTheme(onChange: () => void) {
  themeSubscribers.add(onChange);
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== themeStorageKey && event.key !== null) return;

    const nextMode = isThemeMode(event.newValue) ? event.newValue : "light";
    document.documentElement.dataset.theme = nextMode;
    themeSubscribers.forEach((subscriber) => subscriber());
  };

  window.addEventListener("storage", handleStorage);
  return () => {
    themeSubscribers.delete(onChange);
    window.removeEventListener("storage", handleStorage);
  };
}

function setThemeMode(nextMode: ThemeMode) {
  document.documentElement.dataset.theme = nextMode;

  try {
    window.localStorage.setItem(themeStorageKey, nextMode);
  } catch {
    // Keep the theme usable if browser storage is unavailable.
  }

  themeSubscribers.forEach((subscriber) => subscriber());
}

const themes = {
  light: {
    background: "#ffffff",
    foreground: "#080808",
    experienceForeground: "#080808",
    experienceMuted: "#080808",
    glowForeground: "#080808",
    glowMuted: "#08080880",
    footerForeground: "#080808",
    footerMuted: "#08080880",
    muted: "rgba(8,8,8,0.5)",
    actionBackground: "#080808",
    actionForeground: "#ffffff",
  },
  dark: {
    background: "#080808",
    foreground: "#ffffff",
    experienceForeground: "#FFFFFF",
    experienceMuted: "#FFFFFFCC",
    glowForeground: "#FFFFFF",
    glowMuted: "#FFFFFF80",
    footerForeground: "#FFFFFF",
    footerMuted: "#FFFFFF80",
    muted: "rgba(255,255,255,0.5)",
    actionBackground: "#ffffff",
    actionForeground: "#080808",
  },
  colour: {
    background: "#e8dfd1",
    foreground: "#080808",
    experienceForeground: "#020202",
    experienceMuted: "#747474",
    glowForeground: "#080808",
    glowMuted: "#08080880",
    footerForeground: "#080808",
    footerMuted: "#08080880",
    muted: "rgba(8,8,8,0.5)",
    actionBackground: "#080808",
    actionForeground: "#ffffff",
  },
};

export default function Landing() {
  const mode = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const [showIntro, setShowIntro] = useState(true);
  const colors = themes[mode];
  const finishIntro = useCallback(() => setShowIntro(false), []);
  const themeStyle = {
    "--page-background": colors.background,
    "--page-foreground": colors.foreground,
    "--page-muted": colors.muted,
    "--experience-foreground": colors.experienceForeground,
    "--experience-muted": colors.experienceMuted,
    "--glow-foreground": colors.glowForeground,
    "--glow-muted": colors.glowMuted,
    "--footer-foreground": colors.footerForeground,
    "--footer-muted": colors.footerMuted,
    "--action-background": colors.actionBackground,
    "--action-foreground": colors.actionForeground,
  } as CSSProperties;

  useEffect(() => {
    if (!showIntro) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showIntro]);

  return (
    <main
      style={themeStyle}
      className="flex min-h-screen flex-col bg-[var(--page-background)] text-[var(--page-foreground)] transition-colors"
    >
      {showIntro && <IntroLoader onComplete={finishIntro} />}
      <Hero mode={mode} setMode={setThemeMode} colors={colors} />
      <Content />
      <Experience />
      <Glow />
      <Footer className="mt-auto" />
    </main>
  );
}
