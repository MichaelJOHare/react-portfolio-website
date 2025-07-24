import Image from "next/image";
import Backpacking from "@/../public/assets/images/backpacking.jpg";
import PicOfMe from "@/../public/assets/images/me.png";
import TheFellas from "@/../public/assets/images/the-fellas.png";

export const AboutSection = () => {
  return (
    <div className="space-y-16 lg:space-y-24">
      <section className="overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl leading-tight font-bold text-black sm:text-4xl lg:text-5xl dark:text-white">
                Hi, I'm Michael O'Hare
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                Welcome to my website—it's still a work in progress, so new
                things will keep being added. I'm Michael or Mike, whichever you
                prefer. I love spending time outdoors doing things like
                backpacking, skiing, and fishing. Having lived in Colorado for
                10 years, I was able to enjoy all of those quite a lot.
              </p>
            </div>

            <div className="relative flex justify-center">
              <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl">
                <Image
                  src={PicOfMe}
                  alt="Michael O'Hare"
                  fill
                  className="object-cover object-[center_20%]"
                  placeholder="blur"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-16">
            <div className="md:order-last">
              <h2 className="text-3xl leading-tight font-bold text-black sm:text-4xl lg:text-5xl dark:text-white">
                What have I been up to?
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                I like learning new coding languages by developing something
                chess-related. If you can't tell by my projects page (upper
                right corner), I really like chess. Plus it's very fun to build
                a chess app from scratch—there's always something to improve.
                Whether it's adding the Stockfish chess engine or implementing a
                way to import FEN strings to the board, you'll always have
                something to work on.
              </p>
            </div>
            <div className="relative flex justify-center md:order-first">
              <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl">
                <Image
                  src={TheFellas}
                  alt="Backpacking trip with friends"
                  fill
                  className="object-cover"
                  placeholder="blur"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl leading-tight font-bold text-black sm:text-4xl lg:text-5xl dark:text-white">
                Where I'm at and where I'm going
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                  I recently started a new job working in support for OpenVMS
                  (one of the oldest operating systems!) so I haven't had a lot
                  of time to focus on side projects. But I've been doing some
                  learning in my free time with new web frameworks. It's an
                  exciting time to be working in tech!
                </p>
                <p>
                  If you like anything you see here and want to team up for some
                  coding projects, you can get in touch with me through my
                  resume in the top right corner.
                </p>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl">
                <Image
                  src={Backpacking}
                  alt="Backpacking adventure"
                  fill
                  className="object-cover"
                  placeholder="blur"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
