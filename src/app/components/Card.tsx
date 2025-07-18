import Image from "next/image";
import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  imgSrc: string;
  href: string;
  playable?: boolean;
}

export const Card = ({
  title,
  description,
  imgSrc,
  href,
  playable,
}: CardProps) => (
  <div className="h-[32rem] max-w-[34rem] p-4 md:w-1/2">
    <div
      className="flex h-full flex-col overflow-hidden rounded-md border-2
        border-gray-400 hover:bg-slate-100 dark:border-gray-700
        dark:hover:bg-zinc-800"
    >
      <Link href={href} aria-label={`Link to ${title}`}>
        <Image
          alt={title}
          src={imgSrc}
          className="h-56 w-lg object-cover object-[center_20%]"
          width={544}
          height={306}
          priority={true}
        />
      </Link>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h2 className="mb-3 text-2xl leading-8 font-bold tracking-tight">
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          </h2>
          <p className="mb-3 max-w-none text-gray-800 dark:text-gray-200">
            {description}
          </p>
        </div>
        <div className="mt-auto">
          <Link
            href={href}
            className="text-primary-500 hover:text-primary-600
              dark:hover:text-primary-400 text-base leading-6 font-medium"
            aria-label={`Link to ${title}`}
          >
            {playable ? "Play now" : "Learn more"} &rarr;
          </Link>
        </div>
      </div>
    </div>
  </div>
);
