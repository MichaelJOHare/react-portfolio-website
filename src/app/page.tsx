import { AboutSection } from "./components/AboutSection";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <>
      <div className="divide-y divide-gray-700 dark:divide-gray-700">
        <div className="pt-6 pb-8 md:space-y-5">
          <h1
            className="text-center text-6xl font-extrabold text-gray-900
              sm:pl-16 sm:text-left dark:text-gray-100"
          >
            About Me
          </h1>
        </div>
        <div className="container max-w-screen py-12">
          <div className="flex flex-wrap justify-center">
            <AboutSection />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
