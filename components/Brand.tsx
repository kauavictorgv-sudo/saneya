import Image from "next/image";

type BrandProps = {
  inverse?: boolean;
};

export default function Brand({ inverse = false }: BrandProps) {
  return (
    <span
      className={`inline-flex items-center ${
        inverse ? "rounded-xl bg-background px-3 py-2 shadow-sm" : ""
      }`}
    >
      <Image
        src="/saneya-logo.svg"
        alt=""
        aria-hidden="true"
        width={151}
        height={42}
        className="h-9 w-auto sm:h-10"
        unoptimized
      />
    </span>
  );
}
