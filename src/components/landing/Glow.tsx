import Image from "next/image";
import { ArrowUpRightIcon } from "@/components/icons";

export function Glow() {
  return (
    <section className="bg-[var(--page-background)] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-x-12 lg:gap-y-8">
        <h2 className="font-car text-[clamp(3rem,10vw,6.25rem)] leading-[0.95] tracking-[-0.04em] text-[var(--glow-foreground)] lg:col-span-2">
          LET’S MAKE YOU GLOW
        </h2>
        <div className="flex flex-col items-start gap-6 lg:row-start-2 lg:min-h-full lg:justify-between lg:gap-6">
          <p className="max-w-[430px] font-ari text-base leading-relaxed text-[var(--glow-muted)] sm:text-lg">
            Your next favourite look is just an appointment away. Let us bring your beauty vision to life.
          </p>
          <a
            href="mailto:amorglamour@gmail.com"
            className="group inline-flex shrink-0 items-center gap-1"
          >
            <span className="flex min-h-12 items-center justify-center rounded-full bg-[var(--action-background)] px-8 font-ari text-base text-[var(--action-foreground)] transition-opacity group-hover:opacity-80">
              Book an Appointment
            </span>
            <span className="flex size-12 items-center justify-center rounded-full bg-[var(--action-background)] text-[var(--action-foreground)] transition-opacity group-hover:opacity-80">
              <ArrowUpRightIcon className="block size-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:col-start-2 lg:row-start-2 lg:ml-auto lg:w-full">
          {["frame-95.png", "frame-96.png", "frame-97.png"].map((image) => (
            <div key={image} className="relative aspect-[2/3] overflow-hidden bg-[#ddd]">
              <Image
                src={`/images/landing/${image}`}
                alt="Amor Glamour beauty service"
                fill
                sizes="(max-width: 1023px) 30vw, 18vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
