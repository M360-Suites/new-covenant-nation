import Image from "next/image";
import Link from "next/link";

import { CmsImage } from "@/components/ui/cms-image";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { SanityImage } from "@/sanity/lib/image";

export function SermonHighlight({ image, href }: { image: SanityImage | null; href: string }) {
  return (
    <Link href={href} className="group flex flex-col bg-navy lg:min-h-[500px] lg:flex-row">
      <div className="flex flex-col items-start gap-3 px-6 py-14 sm:px-10 lg:w-2/5 lg:justify-center lg:px-16">
        <Eyebrow tone="gold" className="mb-8">
          Watch &amp; Listen
        </Eyebrow>
        <h2 className="text-[40px] leading-[48px] font-bold tracking-[-0.02em] text-white sm:text-5xl sm:leading-[56px]">
          CATCH UP ON OUR
          <span className="my-3 block w-fit -rotate-2 bg-gold px-4 py-2 text-navy">POWERFUL</span>
          SERMONS
        </h2>
        <p className="max-w-[384px] text-sm leading-5 font-medium tracking-[0.01em] text-white">
          Missed a service? Get the teaching that is changing lives, whenever you&apos;re ready.
        </p>
      </div>

      <div className="relative min-h-[320px] flex-1 bg-ink">
        <CmsImage image={image} alt="" sizes="(min-width: 1024px) 60vw, 100vw" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <span className="flex size-20 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-[6px] transition-transform group-hover:scale-105">
            <Image src="/icons/play.svg" alt="" width={16.5} height={21} />
          </span>
        </div>
        <span className="absolute right-4 bottom-4 flex items-center gap-2 rounded bg-black/60 px-3 py-1 text-sm leading-5 font-medium tracking-[0.01em] text-white backdrop-blur-[6px]">
          <Image src="/icons/play-sm.svg" alt="" width={11.667} height={11.667} />
          Watch Full Sermon
        </span>
      </div>
    </Link>
  );
}
