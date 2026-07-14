import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center transition-transform duration-300 hover:scale-[1.02]"
    >
      <Image
        src="/logos/logo-horizontal.png"
        alt="TopStudyTutor"
        width={420}
        height={95}
        priority
        className="h-24 w-auto object-contain"
      />
    </Link>
  );
}