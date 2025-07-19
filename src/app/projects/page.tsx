import { Card } from "@/app/components/Card";
import projectsData from "@/../data/projectsData";
import { Footer } from "../components/Footer";

export default function Projects() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-center text-6xl font-extrabold text-gray-900 sm:pl-22 sm:text-left dark:text-gray-100">
            Projects
          </h1>
        </div>
        <div className="py-12 lg:max-w-none">
          <div className="-m-4 flex flex-wrap lg:justify-center">
            {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
                playable={d.playable}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
