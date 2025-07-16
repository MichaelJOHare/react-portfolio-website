import Image from "next/image";
import Backpacking from "@/../public/assets/images/backpacking.jpg";
import PicOfMe from "@/../public/assets/images/me.png";
import TheFellas from "@/../public/assets/images/the-fellas.png";

// fix this, way too much resizing
export const AboutSection = () => {
  return (
    <div>
      <section className="overflow-hidden">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 md:grid-cols-2">
            <div className="pb-2 lg:pb-0 lg:px-4">
              <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl lg:max-w-lg lg:text-5xl">
                {"Hi I am Michael O'Hare"}
              </h2>
              <p className="mt-3 text-xl leading-relaxed text-black dark:text-gray-300 md:mt-8">
                {
                  "Welcome to my website, it's still a work in progress so new\
                things will keep on being added. I'm Michael or Mike, whichever\
                you prefer. I love spending time outdoors doing things like\
                backpacking, skiing, and fishing and having lived in Colorado\
                for 10 years I was able to enjoy all of those quite a lot."
                }
              </p>
            </div>

            <div className="relative">
              <Image
                src={PicOfMe}
                alt="picture of me"
                className="relative w-full xl:max-w-lg xl:mx-auto"
                width={565}
                height={665}
                placeholder="blur"
              ></Image>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-10 overflow-hidden sm:pt-16 2xl:pt-16">
        <div className=" mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 md:grid-cols-2">
            <div className="relative">
              <Image
                src={TheFellas}
                alt="backpacking trip"
                className="relative px-4 w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110"
                width={565}
                height={665}
                placeholder="blur"
              ></Image>
            </div>
            <div className="order-first px-4 lg:order-last">
              <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl lg:text-5xl">
                {"What have I been up to?"}
              </h2>
              <p className="mt-3 text-xl leading-relaxed text-black dark:text-gray-300 md:mt-8">
                {
                  " I like learning new coding languages by developing something to\
                do with chess. If you can't tell by my projects page (upper\
                right corner), I really like chess. Plus it's very fun to do a\
                chess app from scratch - there's always something to improve.\
                Whether it's adding the Stockfish chess engine or implementing a\
                way to import FEN strings to the board you'll always have\
                something to do."
                }
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-10 overflow-hidden sm:pt-16 2xl:pt-16">
        <div className="mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 md:grid-cols-2">
            <div className="px-4 pb-2 lg:pb-0">
              <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl lg:text-5xl">
                {"Where I'm at and where I'm going"}
              </h2>
              <div className="mt-3 text-xl leading-relaxed text-black dark:text-gray-300 md:mt-8">
                <p>
                  {
                    "I recently started a new job working in support for OpenVMS\
                  (one of the oldest operating systems!) so I haven't had a lot\
                  of time to focus on side projects. But I've been doing some\
                  learning in my free time of new web frameworks. It's an\
                  exciting time to be working in tech!"
                  }
                </p>
                <p>
                  {
                    "If you like anything you see on here and want to team up for\
                  some coding projects, you can get in touch with me through my\
                  resume in the top right corner."
                  }
                </p>
              </div>
            </div>

            <div className="relative">
              <Image
                src={Backpacking}
                alt="Picture of backpacking"
                className="relative px-4 w-full lg:max-w-lg mx-auto lg:origin-bottom lg:scale-110"
                width={565}
                height={665}
                placeholder="blur"
              ></Image>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
