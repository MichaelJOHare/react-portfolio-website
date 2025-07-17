import { AboutSection } from "./components/AboutSection";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pb-8 pt-6 md:space-y-5">
          <h1 className="text-6xl pl-16 font-extrabold text-gray-900 dark:text-gray-100">
            About Me
          </h1>
        </div>
        <div className="container py-12 max-w-screen">
          <div className="-m-4 flex flex-wrap justify-center">
            <AboutSection />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
