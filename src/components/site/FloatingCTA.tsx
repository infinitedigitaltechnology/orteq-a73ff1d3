import { Phone, MessageCircle } from "lucide-react";

export function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a
        href="tel:+911100000000"
        aria-label="Call ORTEQ"
        className="flex size-12 items-center justify-center rounded-full bg-white text-foreground shadow-lift ring-1 ring-black/5 transition-transform hover:scale-105"
      >
        <Phone className="size-4" />
      </a>
      <a
        href="https://wa.me/911100000000"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform hover:scale-105"
      >
        <MessageCircle className="size-4" />
      </a>
    </div>
  );
}
