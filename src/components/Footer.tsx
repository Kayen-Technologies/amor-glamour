interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`flex w-full flex-1 flex-col overflow-hidden bg-[var(--page-background)] pt-14 pb-0 sm:pt-16 lg:pb-0 lg:pt-20 ${className}`}>
      <div className="mx-auto flex w-full flex-1 flex-col gap-0">
        <div className="grid gap-4 px-5 text-sm sm:grid-cols-2 sm:items-center sm:px-8 sm:text-base lg:grid-cols-3 lg:px-10">
          <a className="font-ari text-[var(--footer-foreground)] transition-opacity hover:opacity-60" href="tel:+233502324582">
            +233 50 232 4582
          </a>
          <a className="font-ari text-[var(--footer-foreground)] transition-opacity hover:opacity-60 sm:text-right lg:text-center" href="mailto:amorglamour@gmail.com">
            amorglamour@gmail.com
          </a>
          <p className="font-ari text-[var(--footer-muted)] sm:col-span-2 lg:col-span-1 lg:text-right">
            © 2026 Amor Glamour. All rights reserved.
          </p>
        </div>

        <p className="m-0 mt-auto w-full whitespace-nowrap pt-8 text-justify font-car text-[clamp(1.5rem,12vw,12.125rem)] leading-none tracking-[-0.04em] [text-align-last:justify] sm:pt-10 lg:pt-12 lg:text-[clamp(3.75rem,16vw,12.125rem)]">
          AMOR GLAMOUR
        </p>
      </div>
    </footer>
  );
}
