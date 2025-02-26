import Link from "next/link";

export interface ButtonLinkProps {
  href: string;
  children?: React.ReactNode;
  className?: string;
  target?: string;
  logo?: string;
  upperText?: string;
  lowerText?: string;
  onClick?: () => void;
}

function ButtonLink({ href, children, className, target }: ButtonLinkProps) {
  return (
    <Link href={href} className={className} target={target}>
      {children}
    </Link>
  );
}

export default ButtonLink;
