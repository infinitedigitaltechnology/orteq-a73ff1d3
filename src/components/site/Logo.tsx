import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "header" | "footer";
}

export function Logo({ className, variant = "header" }: LogoProps) {
  // Path to the manually uploaded logo. 
  // User can upload a file named 'logo.png' or 'logo.svg' to the public/ folder.
  const logoPath = "/logo.png"; 

  return (
    <div className={cn("flex items-center gap-2 group", className)}>
      <div className={cn(
        "relative shrink-0 overflow-hidden",
        variant === "header" ? "h-8 md:h-10" : "h-10 md:h-12"
      )}>
        {/* We use an img tag with a fallback logic. 
            If /logo.png exists, it will show. 
            If it fails to load, we could conditionally render the SVG.
            For now, we will provide a way to switch or use the image directly. */}
        <img 
          src={logoPath} 
          alt="ORTEQ Logo" 
          className="h-full w-auto object-contain transition-opacity duration-300"
          onError={(e) => {
            // If the image fails to load, we hide the image and show the fallback SVG
            e.currentTarget.style.display = 'none';
            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'block';
          }}
        />
        <div style={{ display: 'none' }} className="h-full w-auto">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-auto"
          >
            <path
              d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C16.4183 4 20 7.58172 20 12C20 13.5855 19.5393 15.0637 18.7454 16.3079L15.4142 12.9767C15.7877 12.6792 16 12.366 16 12C16 9.79086 14.2091 8 12 8C11.634 8 11.3208 8.2123 11.0233 8.58579L7.69211 5.25463C8.93627 4.46071 10.4145 4 12 4ZM5.25463 7.69211L8.58579 11.0233C8.2123 11.3208 8 11.634 8 12C8 14.2091 9.79086 16 12 16C12.366 16 12.6792 15.7877 12.9767 15.4142L16.3079 18.7454C15.0637 19.5393 13.5855 20 12 20C7.58172 20 4 16.4183 4 12C4 10.4145 4.46071 8.93627 5.25463 7.69211Z"
              fill="currentColor"
              className="text-primary transition-colors group-hover:text-primary/90"
            />
            <path
              d="M16.5 16.5L21 21"
              stroke="#D71920"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      
      {/* 
        Optional: Keep the text brand name if the uploaded logo is just an icon.
        If the uploaded logo already contains the text "ORTEQ", 
        the user might want to hide these spans.
      */}
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-bold tracking-tighter uppercase",
            variant === "header" ? "text-lg md:text-xl" : "text-xl md:text-2xl"
          )}
        >
          Orteq
        </span>
        <span
          className={cn(
            "text-[8px] font-medium uppercase tracking-[0.3em] opacity-80 text-primary"
          )}
        >
          India
        </span>
      </div>
    </div>
  );
}
