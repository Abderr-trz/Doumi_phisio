import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandMarkProps = { className?: string; compact?: boolean; inverse?: boolean };

export function BrandMark({ className, compact = false, inverse = false }: BrandMarkProps) {
  return (
    <span className={cn("brand-lockup", compact && "brand-lockup--compact", inverse && "brand-lockup--inverse", className)}>
      <Image
        src="/logo_doumi.png"
        alt="Doumi Physio — Centre médical"
        width={180}
        height={133}
        className="brand-logo-image"
        priority
      />
    </span>
  );
}
