'use client'

import Image from 'next/image'
import {useEffect, useState} from 'react'
import {urlFor} from '@/sanity/lib/image'

export default function Hero({hero}) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!hero) return null

  const {
    tag,
    heading,
    subheading,
    backgroundImage,
    backgroundImageMobile,
    ctaLabel,
    ctaUrl,
  } = hero

  const desktopImg =
    backgroundImage && urlFor(backgroundImage).width(1920).height(662).url()
  const mobileImg =
    backgroundImageMobile &&
    urlFor(backgroundImageMobile).width(828).height(287).url()

  return (
    <section
      className={`al-hero relative mb-[20px] md:mb-[47px] ${
        isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      } transition-all duration-300 ease-out`}
    >
      {/* Background image */}
      <div className="relative h-[287px] w-full overflow-hidden md:h-[662px]">
        {desktopImg && (
          <Image
            src={desktopImg}
            alt={heading || 'Services hero'}
            fill
            priority
            className="hidden md:block object-cover"
            sizes="100vw"
          />
        )}
        {mobileImg && (
          <Image
            src={mobileImg}
            alt={heading || 'Services hero'}
            fill
            priority
            className="md:hidden object-cover"
            sizes="100vw"
          />
        )}
        {!desktopImg && !mobileImg && (
          <div className="h-full w-full bg-black" />
        )}
      </div>

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Text block – CENTER ALIGNED */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="pointer-events-auto w-full">
          <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
            {/* Column centered with text-center */}
            <div className="mx-auto flex flex-col items-center text-center max-w-[754px]">
              {/* Top tag – centered */}
              {tag && (
                <div className="al-hero-tag mb-[16px] inline-block rounded-[12px] border border-[#c4c6c8] bg-white px-[20px] py-[12px] text-center text-[12px] font-semibold leading-[12px] tracking-[1.08px] text-[#0533d5]">
                  {tag}
                </div>
              )}

              {/* Heading – centered */}
              {heading && (
                <h1 className="al-hero-heading mb-[16px] md:mb-[24px] text-[28px] md:text-[38px] leading-[34px] md:leading-[44px] font-semibold text-white">
                  {heading}
                </h1>
              )}

              {/* Body copy – centered */}
              {subheading && (
                <p className="al-hero-text max-w-[754px] text-[16px] leading-[24px] font-normal text-[#dcdcdc]">
                  {subheading}
                </p>
              )}

              {/* Optional CTA – centered */}
              {ctaLabel && ctaUrl && (
                <div className="mt-6">
                  <a
                    href={ctaUrl}
                    className="inline-flex items-center rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  >
                    {ctaLabel}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
