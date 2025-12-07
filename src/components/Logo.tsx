import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ className, size = "md" }: LogoProps) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <div className={cn("relative", sizes[size], className)}>
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="2" y="2" width="16" height="16" rx="4" className="fill-primary" />
        <rect x="22" y="2" width="16" height="16" rx="4" className="fill-primary" />
        <rect x="2" y="22" width="16" height="16" rx="4" className="fill-primary" />
        <rect x="22" y="22" width="16" height="16" rx="4" className="fill-primary/60" />
      </svg>
    </div>
  );
};
