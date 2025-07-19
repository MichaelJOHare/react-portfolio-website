import { Mail, Github, Linkedin } from "./icons";

const components = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
};

type SocialIconProps = {
  kind: keyof typeof components;
  href: string | undefined;
  size?: string;
};

export const SocialIcon = ({
  kind,
  href,
  size = "size-8",
}: SocialIconProps) => {
  if (
    !href ||
    (kind === "mail" &&
      !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href))
  )
    return null;

  const SocialSvg = components[kind];

  return (
    <a
      className="text-sm transition hover:text-neutral-700 dark:hover:text-neutral-500"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg className={`fill-current ${size}`} />
    </a>
  );
};
