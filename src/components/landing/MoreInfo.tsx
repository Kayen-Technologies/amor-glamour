"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export interface ServiceInfo {
  image: string;
  title: string;
  category: string;
}

interface MoreInfoProps {
  service: ServiceInfo;
  gallery: string[];
  onClose: () => void;
}

const nailArtGallery = [
  "/images/landing/more-info/nail-process-1.jpeg",
  "/images/landing/more-info/nail-process-2.jpeg",
  "/images/landing/more-info/nail-art-inspiration.jpeg",
];

const nailServices = [
  { name: "Acrylic Full Set", price: "GHS 180" },
  { name: "Gel Extension", price: "GHS 200" },
  { name: "French Tips", price: "GHS 180" },
  { name: "Acrylic Refill", price: "GHS 120" },
  { name: "Custom Nail Art", price: "From GHS 50" },
];

function getDescription(category: string) {
  if (/nail|manicure/i.test(category)) {
    return "Elevate your look with beautifully crafted nail extensions, tailored to your preferred shape, length, and style. Whether you love something subtle or bold, we'll bring your nail inspiration to life.";
  }

  return `Explore our ${category.toLowerCase()} services, tailored to your style and preferences. We’ll work with you to create a look that feels like you.`;
}

function getServiceOptions(service: ServiceInfo) {
  return nailServices;
}

export function MoreInfo({ service, gallery, onClose }: MoreInfoProps) {
  const [activeImage, setActiveImage] = useState(0);
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isNailService = /nail|manicure/i.test(service.category);
  const images = [...new Set([
    ...(gallery.length > 0 ? gallery : [service.image]),
    ...(isNailService ? nailArtGallery : []),
  ])];
  const previews = isNailService ? nailArtGallery : images.slice(0, 3);
  const serviceOptions = getServiceOptions(service);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable?.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  function moveImage(direction: -1 | 1) {
    setActiveImage((current) => (current + direction + images.length) % images.length);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-5"
      onClick={onClose}
    >
      <section
        ref={dialogRef}
        aria-labelledby="more-info-title"
        aria-modal="true"
        className="grid h-[min(92dvh,760px)] w-full max-w-[1120px] grid-cols-1 grid-rows-[36%_minmax(0,1fr)] overflow-hidden bg-white text-[#080808] sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] sm:grid-rows-1"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="relative min-h-0 overflow-hidden bg-[#ddd]">
          <Image
            src={images[activeImage].startsWith("/") ? images[activeImage] : `/images/landing/${images[activeImage]}`}
            alt={`${service.category}: ${service.title}`}
            fill
            priority
            sizes="(max-width: 639px) 100vw, 48vw"
            className="object-cover"
          />

          {images.length > 1 && (
            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 sm:bottom-[12.5%] sm:left-[16%] sm:translate-x-0 sm:gap-4">
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => moveImage(-1)}
                className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white"
              >
                <Image
                  src="/images/landing/more-info/arrow-up-right.svg"
                  alt=""
                  width={15}
                  height={15}
                  className="-rotate-[135deg]"
                />
              </button>
              <div className="flex h-[82px] items-center gap-2 sm:h-[105px] sm:gap-4">
                {previews.map((image, index) => {
                  const src = image.startsWith("/") ? image : `/images/landing/${image}`;
                  const imageIndex = images.indexOf(image);

                  return (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      aria-label={`Show image ${index + 1}`}
                      aria-pressed={activeImage === imageIndex}
                      onClick={() => setActiveImage(imageIndex)}
                      className={`relative h-full w-[58px] overflow-hidden border sm:w-[77px] ${activeImage === imageIndex ? "border-white" : "border-white/60"}`}
                    >
                      <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                aria-label="Next image"
                onClick={() => moveImage(1)}
                className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white"
              >
                <Image
                  src="/images/landing/more-info/arrow-up-right.svg"
                  alt=""
                  width={15}
                  height={15}
                  className="rotate-45"
                />
              </button>
            </div>
          )}
        </div>

        <div className="flex min-h-0 flex-col overflow-y-auto px-4 pb-5 pt-3 sm:px-6 sm:pb-6 sm:pt-3">
          <div className="flex justify-end">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close more information"
              className="flex size-9 items-center justify-center rounded-md bg-[#e6e6e6] transition-colors hover:bg-[#d8d8d8]"
            >
              <Image src="/images/landing/more-info/close.svg" alt="" width={24} height={24} />
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-5 sm:mt-5 sm:gap-6">
            <div className="flex flex-col gap-3">
              <div>
                <p className="font-ari text-base leading-[1.1]">{service.category}</p>
                <h2 id="more-info-title" className="mt-2 font-car text-3xl leading-none tracking-[-0.03em] sm:text-4xl">
                  {service.title}
                </h2>
              </div>
              <p className="font-ari text-sm leading-[1.2] text-black/50 sm:text-base">
                {getDescription(service.category)}
              </p>
            </div>

            <Image
              src="/images/landing/more-info/divider.svg"
              alt=""
              width={500}
              height={1}
              className="h-px max-w-full"
            />

            <div className="flex flex-col gap-4">
              <h3 className="font-car text-lg leading-none">A look at our services</h3>
              <div className="flex flex-col gap-3">
                {serviceOptions.map(({ name, price }) => (
                  <div key={name} className="flex items-center justify-between gap-4">
                    <p className="font-ari text-sm leading-[1.1] sm:text-base">{name}</p>
                    <p className="shrink-0 font-car text-base leading-none sm:text-xl">{price}</p>
                  </div>
                ))}
              </div>
              <Image
                src="/images/landing/more-info/divider.svg"
                alt=""
                width={500}
                height={1}
                className="h-px max-w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-car text-lg leading-none">Additional Information</h3>
              <p className="font-ari text-sm leading-[1.2] text-black/50 sm:text-base">
                {isNailService
                  ? "Prices may vary depending on nail length, design complexity, and additional customizations."
                  : "Service availability and pricing may vary depending on your selected style and customization."}
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-center pt-2">
            <a
              href="mailto:amorglamour@gmail.com"
              className="group inline-flex items-center gap-0.5"
            >
              <span className="flex h-12 items-center justify-center rounded-full bg-[#080808] px-8 font-ari text-sm text-white transition-opacity group-hover:opacity-80 sm:text-base">
                Book an Appointment
              </span>
              <span className="flex size-12 items-center justify-center rounded-full bg-[#080808] text-white transition-opacity group-hover:opacity-80">
                <Image src="/images/landing/more-info/booking-arrow.svg" alt="" width={24} height={24} />
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
