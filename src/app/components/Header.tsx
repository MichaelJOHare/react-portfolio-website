import siteMetadata from "@/../data/siteMetadata";
import headerNavLinks from "@/../data/headerNavLinks";
import Logo from "@/../data/logo.svg";
import Link from "next/link";
import PDF from "@/assets/icons/pdf.svg";
import { ThemeSwitch } from "./ThemeSwitch";
import { MobileNav } from "./MobileNav";

export const Header = () => {
  return (
    <header className="flex items-center justify-between py-5 px-5">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3 mt-1">
              <Logo />
            </div>
            {typeof siteMetadata.headerTitle === "string" ? (
              <div className="hidden mb-2 h-6 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center pr-2">
        {headerNavLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="px-4 hidden font-bold sm:block"
          >
            {link.title}
          </Link>
        ))}
        <div className="group relative">
          <Link
            href={"./assets/resume/Michael_O'Hare_Resume.pdf"}
            aria-label={`Link to download Résumé`}
            download="Michael_O'Hare_Resume.pdf"
          >
            <div className="flex px-4">
              <PDF className="w-8 h-8 cursor-pointer" />
            </div>
          </Link>
          <span
            role="tooltip"
            className="pointer-events-none absolute px-2 py-2 -top-7 -left-4 w-max opacity-0 transition-opacity group-hover:opacity-100 text-sm font-medium duration-300 bg-zinc-700 text-neutral-100 rounded-lg shadow-sm dark:bg-neutral-300 dark:text-neutral-900"
          >
            Résumé
          </span>
        </div>
        <div className="size-8 pl-2">
          <ThemeSwitch />
        </div>
        <MobileNav />
      </div>
    </header>
  );
};
