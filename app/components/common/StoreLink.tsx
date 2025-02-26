import { ButtonLinkProps } from "./ButtonLink";

function StoreLink({
  className,
  target,
  logo,
  upperText,
  lowerText,
  href,
  onClick,
}: ButtonLinkProps) {
  return (
    <button onClick={onClick} className={className}>
      <img src={logo} alt={`${lowerText} logo`} className="w-5" />
      <div>
        <p className="text-xs">{upperText}</p>
        <p>{lowerText}</p>
      </div>
    </button>
  );
}

export default StoreLink;
