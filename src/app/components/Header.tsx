import siteMetadata from "@/../data/siteMetadata";
import headerNavLinks from "@/../data/headerNavLinks";
import Logo from "@/../data/logo.svg";
import Link from "next/link";
import PDF from "@/assets/icons/pdf.svg";
import { ThemeSwitch } from "./ThemeSwitch";
import { MobileNav } from "./MobileNav";

export const Header = () => {
  return (
    <header className="flex items-center justify-between py-5 pl-5">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="pt-1 pr-3">
              <Logo />
            </div>
            {typeof siteMetadata.headerTitle === "string" ? (
              <div className="hidden h-10 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex h-10">
        {headerNavLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="hidden h-full w-24 items-center justify-center border-r font-bold first:w-22 sm:flex"
          >
            <div className="flex h-full w-full items-center justify-center rounded transition-colors hover:bg-neutral-300 dark:hover:bg-neutral-600">
              {link.title}
            </div>
          </Link>
        ))}
        <div className="group relative w-19 border-r">
          <div className="h-full w-full rounded transition-colors hover:bg-neutral-300 dark:hover:bg-neutral-600">
            <button className="flex h-full w-full cursor-pointer items-center justify-center">
              <a
                href="/assets/resume/Michael_O'Hare_Resume.pdf"
                aria-label="Link to download Résumé"
                download="Michael_O'Hare_Resume.pdf"
              >
                <PDF className="size-6" />
              </a>
            </button>
          </div>
          <span
            role="tooltip"
            className="pointer-events-none absolute -top-7 -left-4 w-max rounded-lg bg-zinc-700 py-2 pr-2 text-sm font-medium text-neutral-100 opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100 dark:bg-neutral-300 dark:text-neutral-900"
          >
            Résumé
          </span>
        </div>
        <div className="border-r sm:border-none">
          <ThemeSwitch />
        </div>
        <MobileNav />
      </div>
    </header>
  );
};
