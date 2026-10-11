import {
  DarkModeIcon,
  LoomIcon,
  PaintBoardIcon,
  SocialInstagramIcon,
  SocialTiktokIcon,
  SocialTwitterIcon,
  SocialWhatsappIcon,
} from "@/components/icons";

export type ThemeMode = "light" | "dark" | "colour";

interface HeroProps {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  colors: {
    foreground: string;
    muted: string;
  };
}

const socialIcons = [
  { label: "Instagram", Icon: SocialInstagramIcon },
  { label: "Twitter", Icon: SocialTwitterIcon },
  { label: "TikTok", Icon: SocialTiktokIcon },
  { label: "WhatsApp", Icon: SocialWhatsappIcon },
];

const themeOptions = [
  { mode: "light", label: "Light", Icon: LoomIcon },
  { mode: "dark", label: "Dark", Icon: DarkModeIcon },
  { mode: "colour", label: "Colour", Icon: PaintBoardIcon },
] as const;

export function Hero({ mode, setMode, colors }: HeroProps) {
  return (
    <section className="bg-[var(--page-background)] px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:pb-20 lg:pt-7">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 sm:gap-12 lg:gap-10">
        <header className="flex flex-wrap items-center justify-between gap-6">
          <p className="font-ari text-sm tracking-[0.1px] sm:text-base">
            BEAUTY , REDEFINED
          </p>
          <div className="flex flex-wrap items-center justify-end gap-5 sm:gap-8">
            <nav aria-label="Social media" className="flex items-center gap-4">
              {socialIcons.map(({ label, Icon }) => (
                <a
                  key={label}
                  href="#socials"
                  aria-label={label}
                  className="text-[var(--page-foreground)] transition-opacity hover:opacity-60"
                >
                  <Icon className="block size-5" />
                </a>
              ))}
            </nav>
            <a
              href="mailto:amorglamour@gmail.com"
              className="font-ari text-sm transition-opacity hover:opacity-60 sm:text-base"
            >
              Book Appointment
            </a>
          </div>
        </header>

        <h1 className="select-none text-center font-car text-[clamp(8rem,25vw,250px)] leading-[0.78] tracking-[-0.04em]">
          AM
        </h1>

        <div className="flex flex-col gap-8 sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:items-start lg:gap-30">
          <p className="font-ari text-sm leading-relaxed sm:text-base lg:min-w-0 lg:flex-1">
            Welcome to Amor Glamour, where beauty meets creativity. <span className="text-[var(--page-muted)]">We specialise in transforming everyday looks into beautiful expressions</span> of confidence, individuality, and style.
          </p>
          <p className="font-ari text-sm leading-relaxed sm:text-base lg:min-w-0 lg:flex-1">
            From flawless nail sets and stunning hairstyles to seamless wig installations and <span className="text-[var(--page-muted)]">personalised beauty treatments, we&apos;re here to help you look</span> and feel your absolute best.
          </p>

          <div className="font-ari text-sm tracking-[0.1px] sm:text-base lg:ml-auto lg:flex-1">
            <p>Your Beauty Destination</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              <span>Hair</span>
              <span className="text-[var(--page-muted)]">Nails</span>
              <span>Wigs</span>
              <span className="text-[var(--page-muted)]">More</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-3 lg:ml-0 lg:flex-col">
            {themeOptions.map(({ mode: option, label, Icon }) => (
              <button
                key={option}
                type="button"
                onClick={() => setMode(option)}
                aria-pressed={mode === option}
                style={{ color: mode === option ? colors.foreground : colors.muted }}
                className="flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Icon className="block size-4" />
                <span className="font-ari text-sm sm:text-base">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
