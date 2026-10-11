"use client";

import Image from "next/image";
import { useCallback, useState, type CSSProperties } from "react";
import { MoreInfo, type ServiceInfo } from "@/components/landing/MoreInfo";

type ServiceCardData = ServiceInfo;

const desktopPlacements = [
  [1, 1], [1, 2], [3, 1], [1, 3], [2, 4],
  [1, 5], [3, 5], [6, 5], [7, 5], [5, 3],
  [3, 2], [4, 1], [2, 3], [3, 4], [4, 4],
  [6, 4], [6, 3], [5, 2], [6, 1], [7, 1],
] as const;

const firstCollection: ServiceCardData[] = [
  { image: "frame-56.png", title: "Sleek & Sophisticated", category: "Hair Styling" },
  { image: "frame-57.png", title: "Effortlessly You", category: "Wig Styling" },
  { image: "frame-58.png", title: "Flawless Finish", category: "Nail Art" },
  { image: "frame-59.png", title: "French Perfection", category: "Manicure" },
  { image: "frame-60.png", title: "The Signature Install", category: "Wig Installation" },
  { image: "frame-61.png", title: "The Braided Edit", category: "Hair Braiding" },
  { image: "frame-62.png", title: "The Sleek Effect", category: "Ponytail Styling" },
  { image: "frame-63.png", title: "Lengths of Luxury", category: "Hair Extensions" },
  { image: "frame-64.png", title: "Twist & Turns", category: "Twist Hairstyles" },
  { image: "frame-65.png", title: "The Perfect Blowout", category: "Hair Styling" },
  { image: "frame-66.png", title: "Pretty in Pink", category: "Nail Art" },
  { image: "frame-67.png", title: "The Perfect Set", category: "Wig Installation" },
  { image: "frame-68.png", title: "The Ultimate Glow Up", category: "Beauty Services" },
  { image: "frame-69.png", title: "Curls for Days", category: "Curly Hairstyles" },
  { image: "frame-70.png", title: "A Little Extra", category: "Nail Art" },
  { image: "frame-71.png", title: "Laid to Perfection", category: "Frontal Installation" },
  { image: "frame-72.png", title: "Nailed to Perfection", category: "Nail Extensions" },
  { image: "frame-73.png", title: "The Silk Press", category: "Hair Styling" },
  { image: "frame-74.png", title: "Braided Beauty", category: "Hair Braiding" },
  { image: "frame-75.png", title: "A Touch of Glam", category: "Nail Extensions" },
];

const secondCollection: ServiceCardData[] = [
  { image: "frame-76.png", title: "Sleek & Sophisticated", category: "Hair Styling" },
  { image: "frame-77.png", title: "Effortlessly You", category: "Wig Styling" },
  { image: "frame-78.png", title: "Flawless Finish", category: "Nail Art" },
  { image: "frame-79.png", title: "French Perfection", category: "Manicure" },
  { image: "frame-80.png", title: "The Signature Install", category: "Wig Installation" },
  { image: "frame-81.png", title: "The Braided Edit", category: "Hair Braiding" },
  { image: "frame-82.png", title: "The Sleek Effect", category: "Ponytail Styling" },
  { image: "frame-83.png", title: "Lengths of Luxury", category: "Hair Extensions" },
  { image: "frame-84.png", title: "Twist & Turns", category: "Twist Hairstyles" },
  { image: "frame-85.png", title: "The Perfect Blowout", category: "Hair Styling" },
  { image: "frame-86.png", title: "Pretty in Pink", category: "Nail Art" },
  { image: "frame-87.png", title: "The Perfect Set", category: "Wig Installation" },
  { image: "frame-88.png", title: "The Ultimate Glow Up", category: "Beauty Services" },
  { image: "frame-89.png", title: "Curls for Days", category: "Curly Hairstyles" },
  { image: "frame-70.png", title: "A Little Extra", category: "Nail Art" },
  { image: "frame-90.png", title: "Laid to Perfection", category: "Frontal Installation" },
  { image: "frame-91.png", title: "Nailed to Perfection", category: "Nail Extensions" },
  { image: "frame-92.png", title: "The Silk Press", category: "Hair Styling" },
  { image: "frame-93.png", title: "Braided Beauty", category: "Hair Braiding" },
  { image: "frame-94.png", title: "A Touch of Glam", category: "Nail Extensions" },
];

function ServiceCard({
  image,
  title,
  category,
  onSelect,
  placement,
}: ServiceCardData & {
  onSelect: (service: ServiceCardData) => void;
  placement: (typeof desktopPlacements)[number];
}) {
  return (
    <article
      className="min-w-0 xl:[grid-column-start:var(--desktop-column)] xl:[grid-row-start:var(--desktop-row)]"
      style={{
        "--desktop-column": placement[0],
        "--desktop-row": placement[1],
      } as CSSProperties}
    >
      <button
        type="button"
        onClick={() => onSelect({ image, title, category })}
        aria-label={`More information about ${title}, ${category}`}
        className="group relative block aspect-[45/68] w-full overflow-hidden bg-[#ddd]"
      >
        <Image
          src={`/images/landing/${image}`}
          alt={`${category}: ${title}`}
          fill
          sizes="(max-width: 639px) 45vw, (max-width: 1023px) 30vw, 18vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </button>
      <div className="mt-3 flex flex-col gap-2">
        <h3 className="font-car text-base leading-tight tracking-[-0.03em] sm:text-lg">
          {title}
        </h3>
        <p className="font-ari text-sm text-[var(--page-foreground)] sm:text-base">
          {category}
        </p>
      </div>
    </article>
  );
}

function ServiceCollection({
  cards,
  label,
  onSelect,
  flow,
}: {
  cards: ServiceCardData[];
  label: string;
  onSelect: (service: ServiceCardData) => void;
  flow: "first" | "second";
}) {
  return (
    <div
      aria-label={label}
      className={`grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:grid-cols-7 xl:gap-x-4 xl:gap-y-24 ${flow === "first" ? "xl:pt-[88px] xl:pb-24" : "xl:pb-[158px]"}`}
    >
      {cards.map((card, index) => (
        <ServiceCard
          key={`${label}-${card.image}-${index}`}
          {...card}
          placement={desktopPlacements[index]}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export function Content() {
  const [selectedService, setSelectedService] = useState<ServiceCardData | null>(null);
  const allCards = [...firstCollection, ...secondCollection];
  const closeMoreInfo = useCallback(() => setSelectedService(null), []);

  const relatedImages = selectedService
    ? [
        selectedService.image,
        ...allCards
          .filter((card) => card.category === selectedService.category && card.image !== selectedService.image)
          .map((card) => card.image),
      ]
    : [];

  return (
    <section className="bg-[var(--page-background)] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20 xl:px-10 xl:py-0">
      <div className="mx-auto max-w-[1440px]">
        <ServiceCollection cards={firstCollection} label="Featured beauty services" onSelect={setSelectedService} flow="first" />
        <ServiceCollection cards={secondCollection} label="More beauty services" onSelect={setSelectedService} flow="second" />
      </div>
      {selectedService && (
        <MoreInfo
          service={selectedService}
          gallery={relatedImages}
          onClose={closeMoreInfo}
        />
      )}
    </section>
  );
}
