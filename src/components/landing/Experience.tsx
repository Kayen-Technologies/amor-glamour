import Image from "next/image";

export function Experience() {
  return (
    <section className="bg-[var(--page-background)] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-2 lg:items-end lg:gap-x-16 lg:gap-y-14">
        <p className="font-car text-2xl leading-[1.35] text-[var(--experience-foreground)] sm:text-3xl lg:col-span-2 lg:max-w-5xl lg:text-[2rem]">
          {`At Amor Glamour, beauty is more than just a look; it's a feeling. From beautifully styled hair and flawless wig installations to perfectly crafted nails, we're all about bringing your beauty vision to life and making every visit feel special.`}
        </p>

        <div className="relative aspect-[3/4] overflow-hidden bg-[#ddd] sm:aspect-[4/3] lg:aspect-[3/4]">
          <Image
            src="/images/landing/rectangle-1.png"
            alt="The Amor Experience"
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center gap-6 lg:gap-8">
          <h2 className="font-car text-4xl leading-none text-[var(--experience-foreground)] sm:text-5xl lg:text-[3.5rem]">
            The Amor Experience
          </h2>
          <p className="font-ari text-base leading-relaxed text-[var(--experience-muted)] sm:text-lg">
            Amor Glamour is a beauty salon dedicated to helping you look and feel your best. With a passion for creativity, attention to detail, and personalised care, we bring together hair, nails, wigs, and more to create looks that are uniquely yours.
          </p>
        </div>
      </div>
    </section>
  );
}
