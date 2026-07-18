import productAio from "@/assets/product-aio.jpg";
import productLedwall from "@/assets/product-ledwall.jpg";
import productSignage from "@/assets/product-signage.jpg";
import productVideowall from "@/assets/product-videowall.jpg";
import productSelfservice from "@/assets/product-selfservice.jpg";
import productPos from "@/assets/product-pos.jpg";
import productIndustrial from "@/assets/product-industrial.jpg";
import productIfp from "@/assets/product-ifp.jpg";
import productDrone from "@/assets/product-drone.jpg";

import indCorporate from "@/assets/industry-corporate.jpg";
import indEducation from "@/assets/industry-education.jpg";
import indHealthcare from "@/assets/industry-healthcare.jpg";
import indRetail from "@/assets/industry-retail.jpg";
import indControl from "@/assets/industry-control.jpg";
import indAuditorium from "@/assets/industry-auditorium.jpg";
import indHospitality from "@/assets/industry-hospitality.jpg";
import indGovernment from "@/assets/industry-government.jpg";
import indTransport from "@/assets/industry-transport.jpg";
import indBanking from "@/assets/industry-banking.jpg";
import indManufacturing from "@/assets/industry-manufacturing.jpg";
import indMall from "@/assets/industry-mall.jpg";

import projBoardroom from "@/assets/project-boardroom.jpg";
import projOutdoor from "@/assets/project-outdoor.jpg";
import projUniversity from "@/assets/project-university.jpg";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  applications: string[];
  features: string[];
  advantages: string[];
  specs: { label: string; value: string }[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "all-in-one-displays",
    name: "All-In-One Displays",
    tagline: "Plug-and-play brilliance at flagship scale.",
    description:
      "Integrated LED All-In-One displays engineered for boardrooms and command centers — ready in minutes, brilliant for decades.",
    image: productAio,
    applications: ["Boardrooms", "Executive suites", "Digital lobbies", "Broadcast studios"],
    features: [
      "108–165 inch integrated LED",
      "P1.2 / P1.5 / P1.8 pixel pitch",
      "Bezel-less panoramic canvas",
      "Wireless & wired casting",
      "Android + Windows OPS ready",
    ],
    advantages: [
      "Fully assembled — no on-site calibration",
      "Cinematic contrast and colour fidelity",
      "Whisper-quiet thermal engineering",
    ],
    specs: [
      { label: "Sizes", value: "108\" / 138\" / 165\"" },
      { label: "Pixel pitch", value: "P1.2 / P1.5 / P1.8" },
      { label: "Resolution", value: "Up to 4K UHD" },
      { label: "Brightness", value: "600 nits" },
      { label: "Refresh rate", value: "3840 Hz" },
      { label: "Warranty", value: "3 years on-site" },
    ],
  },
  {
    slug: "digital-led-walls",
    name: "Digital LED Walls",
    tagline: "Seamless, unlimited canvas.",
    description:
      "Fine-pitch modular LED walls for auditoriums, control rooms and flagship retail — engineered for 24/7 operation.",
    image: productLedwall,
    applications: ["Auditoriums", "Control rooms", "Outdoor advertising", "Retail flagships"],
    features: [
      "P0.9 to P4 outdoor pitch",
      "Front & rear service",
      "Genlock synchronised playback",
      "IP65-rated outdoor variants",
    ],
    advantages: [
      "Modular repair — no downtime",
      "HDR10 colour reproduction",
      "Custom shapes & curves",
    ],
    specs: [
      { label: "Pixel pitch", value: "P0.9 – P16" },
      { label: "Brightness", value: "800 – 6500 nits" },
      { label: "Refresh rate", value: "3840 Hz+" },
      { label: "Ingress", value: "IP54 / IP65" },
      { label: "Lifespan", value: "100,000 hrs" },
      { label: "Warranty", value: "2 years standard" },
    ],
  },
  {
    slug: "commercial-displays",
    name: "Commercial Displays",
    tagline: "24×7 professional-grade LCDs.",
    description:
      "Commercial-grade 4K signage displays with built-in players, hardened for public spaces and continuous operation.",
    image: productSignage,
    applications: ["Retail", "Hospitality", "Transportation", "Corporate lobbies"],
    features: [
      "43\" to 98\" 4K UHD",
      "Built-in Android SoC",
      "Portrait & landscape mount",
      "Remote CMS management",
    ],
    advantages: [
      "Optical bonding — zero glare",
      "500-nit peak brightness",
      "Integrated Wi-Fi and LAN",
    ],
    specs: [
      { label: "Sizes", value: "43 – 98 inch" },
      { label: "Panel", value: "IPS 4K UHD" },
      { label: "Brightness", value: "500 nits" },
      { label: "Uptime rating", value: "24 / 7" },
      { label: "OS", value: "Android 11 / Windows OPS" },
      { label: "Warranty", value: "3 years" },
    ],
  },
  {
    slug: "lcd-video-walls",
    name: "LCD Video Walls",
    tagline: "Ultra-narrow bezel matrix.",
    description:
      "Precision LCD video walls with 0.88mm combined bezels for mission-critical monitoring and immersive branding.",
    image: productVideowall,
    applications: ["Command centers", "Broadcast", "Trading floors", "Retail experiences"],
    features: [
      "0.88 / 1.7 / 3.5mm bezel widths",
      "500 – 700 nit high brightness",
      "Custom matrix configuration",
      "24×7 industrial panel",
    ],
    advantages: ["Millisecond video sync", "Multi-source input", "Portrait / landscape / tilt"],
    specs: [
      { label: "Bezel-to-bezel", value: "0.88 – 3.5mm" },
      { label: "Sizes", value: "46 / 49 / 55 inch" },
      { label: "Brightness", value: "500 – 700 nits" },
      { label: "Duty cycle", value: "24 / 7" },
      { label: "Colour", value: "10-bit / 1.07B" },
      { label: "Warranty", value: "3 years" },
    ],
  },
  {
    slug: "digital-standees",
    name: "Digital Standees",
    tagline: "Vertical storytelling.",
    description:
      "Slim floor-standing digital standees for wayfinding, promotion and customer engagement in high-footfall spaces.",
    image: productSignage,
    applications: ["Malls", "Airports", "Hotels", "Showrooms"],
    features: [
      "43\" / 55\" / 65\" formats",
      "Capacitive touch option",
      "Integrated media player",
      "Cable management enclosure",
    ],
    advantages: ["Rapid roll-out kits", "Custom brand livery", "Anti-glare glass"],
    specs: [
      { label: "Sizes", value: "43 / 55 / 65 inch" },
      { label: "Orientation", value: "Portrait" },
      { label: "Touch", value: "PCAP 10-point (optional)" },
      { label: "Connectivity", value: "Wi-Fi / LAN / 4G" },
      { label: "Warranty", value: "2 years" },
    ],
  },
  {
    slug: "self-service-displays",
    name: "Self-Service Displays",
    tagline: "Interaction, unattended.",
    description:
      "Rugged self-service kiosks with integrated peripherals for check-in, ordering and public-service automation.",
    image: productSelfservice,
    applications: ["Airports", "Banking", "Government", "Quick-service restaurants"],
    features: [
      "Integrated printer / scanner",
      "PCAP multi-touch",
      "Anti-vandal enclosure",
      "Accessibility compliant",
    ],
    advantages: ["Reduces queue times", "Modular peripherals", "Remote monitoring"],
    specs: [
      { label: "Screen", value: "22 – 32 inch" },
      { label: "Enclosure", value: "SS304 / powder-coated MS" },
      { label: "Peripherals", value: "Printer / QR / NFC / MSR" },
      { label: "OS", value: "Windows 11 / Android" },
      { label: "Warranty", value: "2 years" },
    ],
  },
  {
    slug: "point-of-sale-displays",
    name: "Point of Sale Displays",
    tagline: "Every counter, on-brand.",
    description:
      "Compact POS-side displays that turn every transaction into an upsell moment, tightly integrated with retail POS systems.",
    image: productPos,
    applications: ["Retail chains", "QSR", "Pharmacies", "Auto dealerships"],
    features: [
      "10\" / 15\" / 21\" formats",
      "USB / HDMI / LAN input",
      "Landscape & portrait mount",
      "Dual-display option",
    ],
    advantages: ["Plug-and-play", "Retail CMS ready", "Low-power operation"],
    specs: [
      { label: "Sizes", value: "10 / 15 / 21 inch" },
      { label: "Panel", value: "IPS Full HD" },
      { label: "Inputs", value: "HDMI / USB / LAN" },
      { label: "Warranty", value: "2 years" },
    ],
  },
  {
    slug: "industrial-displays",
    name: "Industrial Displays",
    tagline: "Built for the factory floor.",
    description:
      "Ruggedised HMI and monitoring displays for manufacturing, energy and process-control environments.",
    image: productIndustrial,
    applications: ["Manufacturing", "Energy", "Oil & gas", "Warehousing"],
    features: [
      "IP65 / IP66 rated",
      "Wide temperature (-20 to 60°C)",
      "Optical bonding",
      "Sunlight-readable option",
    ],
    advantages: ["Vibration & dust resistant", "Panel-mount ready", "Long-life LED backlight"],
    specs: [
      { label: "Sizes", value: "10 – 55 inch" },
      { label: "Ingress", value: "IP65 / IP66" },
      { label: "Brightness", value: "up to 1500 nits" },
      { label: "MTBF", value: "50,000 hrs" },
      { label: "Warranty", value: "3 years" },
    ],
  },
  {
    slug: "interactive-flat-panels",
    name: "Interactive Flat Panels",
    tagline: "Collaboration, on tap.",
    description:
      "Ultra-slim 4K interactive flat panels for smart classrooms and modern meeting rooms — with 20-point touch.",
    image: productIfp,
    applications: ["Smart classrooms", "Meeting rooms", "Training centers", "Innovation labs"],
    features: [
      "65\" / 75\" / 86\" / 98\"",
      "20-point IR + Anti-glare glass",
      "Dual OS: Android + Windows OPS",
      "Wireless casting from any device",
      "Built-in whiteboard & annotation",
    ],
    advantages: [
      "Zero-latency writing feel",
      "Split-screen multi-source",
      "Cloud content management",
    ],
    specs: [
      { label: "Sizes", value: "65 / 75 / 86 / 98 inch" },
      { label: "Touch", value: "20-point IR" },
      { label: "Resolution", value: "3840 × 2160 UHD" },
      { label: "Brightness", value: "400 nits" },
      { label: "OS", value: "Android 13 + Windows OPS" },
      { label: "Warranty", value: "3 years on-site" },
    ],
  },
];

export type Industry = {
  slug: string;
  name: string;
  description: string;
  image: string;
  challenges: string[];
  solutions: string[];
  recommended: string[]; // product slugs
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "education",
    name: "Education",
    description:
      "Smart classrooms, digital libraries and interactive lecture halls that keep every learner engaged.",
    image: indEducation,
    challenges: [
      "Static whiteboards limit engagement",
      "Difficulty sharing multimedia lessons",
      "Institution-wide content management",
    ],
    solutions: [
      "Interactive flat panels with 20-point touch",
      "Wireless casting from student devices",
      "Centralised content and permission control",
    ],
    recommended: ["interactive-flat-panels", "commercial-displays", "digital-standees"],
  },
  {
    slug: "corporate",
    name: "Corporate",
    description: "Executive boardrooms, huddle spaces and enterprise digital signage.",
    image: indCorporate,
    challenges: [
      "Ineffective hybrid meetings",
      "Fragmented internal communications",
      "Global broadcast requirements",
    ],
    solutions: [
      "All-In-One boardroom displays",
      "Enterprise-wide digital signage CMS",
      "Command-quality video walls",
    ],
    recommended: ["all-in-one-displays", "lcd-video-walls", "commercial-displays"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    description: "Clinical wayfinding, digital queue and patient education.",
    image: indHealthcare,
    challenges: ["Complex hospital wayfinding", "Managing OPD queues", "Patient information display"],
    solutions: [
      "Anti-microbial commercial displays",
      "Integrated queue-management signage",
      "OT-grade medical-imaging monitors",
    ],
    recommended: ["commercial-displays", "digital-standees", "self-service-displays"],
  },
  {
    slug: "retail",
    name: "Retail",
    description: "Storefront displays, in-aisle signage and endless-aisle experiences.",
    image: indRetail,
    challenges: [
      "Static signage under-performs",
      "Multi-store content sync",
      "Point-of-sale storytelling",
    ],
    solutions: [
      "Dayparted digital signage",
      "Cloud CMS across every store",
      "Point-of-sale companion screens",
    ],
    recommended: ["commercial-displays", "point-of-sale-displays", "digital-standees"],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    description: "Hotel lobbies, restaurant menus and event ballrooms.",
    image: indHospitality,
    challenges: [
      "Digital menu updates take hours",
      "Guest wayfinding in large properties",
      "Brand-consistent event backdrops",
    ],
    solutions: [
      "Instant cloud menu updates",
      "Way-finding standees and lobby video walls",
      "Rental-friendly LED backdrops",
    ],
    recommended: ["digital-led-walls", "digital-standees", "commercial-displays"],
  },
  {
    slug: "government",
    name: "Government",
    description: "Citizen service centres, control rooms and public information displays.",
    image: indGovernment,
    challenges: [
      "Citizen-facing information at scale",
      "Mission-critical monitoring",
      "Multi-language public displays",
    ],
    solutions: [
      "Rugged commercial signage",
      "Video-wall command centres",
      "Self-service citizen kiosks",
    ],
    recommended: ["lcd-video-walls", "self-service-displays", "commercial-displays"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    description: "Shop-floor HMI, OEE dashboards and safety broadcast.",
    image: indManufacturing,
    challenges: [
      "Real-time production visibility",
      "Harsh factory environments",
      "Safety-critical broadcast",
    ],
    solutions: [
      "IP-rated industrial displays",
      "OEE video-wall dashboards",
      "PA-integrated signage",
    ],
    recommended: ["industrial-displays", "lcd-video-walls", "commercial-displays"],
  },
  {
    slug: "banking",
    name: "Banking",
    description: "Branch signage, queue systems and digital rate boards.",
    image: indBanking,
    challenges: [
      "Real-time FX and rate updates",
      "Branch queue management",
      "Compliance-ready display uptime",
    ],
    solutions: [
      "Live-feed rate signage",
      "Queue-management kiosks",
      "24×7 commercial-grade displays",
    ],
    recommended: ["commercial-displays", "self-service-displays", "digital-standees"],
  },
  {
    slug: "transportation",
    name: "Transportation",
    description: "Airports, metros and inter-city stations.",
    image: indTransport,
    challenges: [
      "Live schedule broadcasting",
      "Multi-lingual passenger info",
      "Continuous 24×7 operation",
    ],
    solutions: [
      "High-brightness commercial displays",
      "Video-wall departure boards",
      "Self-service check-in kiosks",
    ],
    recommended: ["commercial-displays", "lcd-video-walls", "self-service-displays"],
  },
  {
    slug: "control-rooms",
    name: "Control Rooms",
    description: "24×7 monitoring for utilities, security and critical infrastructure.",
    image: indControl,
    challenges: [
      "Multi-source, multi-window visualisation",
      "Millisecond source switching",
      "Non-stop reliability",
    ],
    solutions: [
      "Ultra-narrow-bezel video walls",
      "Fine-pitch LED command walls",
      "Redundant controller architecture",
    ],
    recommended: ["lcd-video-walls", "digital-led-walls", "all-in-one-displays"],
  },
  {
    slug: "auditoriums",
    name: "Auditoriums",
    description: "Convention halls, corporate townhalls and university auditoriums.",
    image: indAuditorium,
    challenges: [
      "High-brightness stage visuals",
      "Long-throw viewing distance",
      "Fast rental turnaround",
    ],
    solutions: [
      "Fine-pitch LED stage walls",
      "Modular rental frames",
      "Genlock synchronised playback",
    ],
    recommended: ["digital-led-walls", "all-in-one-displays", "commercial-displays"],
  },
  {
    slug: "shopping-malls",
    name: "Shopping Malls",
    description: "Atriums, wayfinding and premium brand storytelling.",
    image: indMall,
    challenges: [
      "Hero atrium impact",
      "Store-level directory management",
      "Advertising monetisation",
    ],
    solutions: [
      "Vertical LED columns",
      "Way-finding standees",
      "Ad-network-ready CMS",
    ],
    recommended: ["digital-led-walls", "digital-standees", "commercial-displays"],
  },
];

export type Solution = {
  slug: string;
  name: string;
  summary: string;
};

export const SOLUTIONS: Solution[] = [
  { slug: "smart-classroom", name: "Smart Classroom", summary: "Interactive learning that keeps every learner engaged." },
  { slug: "digital-signage", name: "Digital Signage", summary: "Cloud-managed digital signage across every location." },
  { slug: "boardroom", name: "Boardroom Solutions", summary: "All-In-One executive collaboration canvases." },
  { slug: "meeting-rooms", name: "Meeting Rooms", summary: "Huddle-space displays with wireless casting." },
  { slug: "command-center", name: "Command Center", summary: "Mission-critical multi-source visualisation." },
  { slug: "control-room", name: "Control Room", summary: "24×7 ultra-narrow-bezel monitoring walls." },
  { slug: "hospital-display", name: "Hospital Digital Display", summary: "Wayfinding, queue and patient education." },
  { slug: "retail-display", name: "Retail Display", summary: "Storefront, in-aisle and endless aisle." },
  { slug: "airport-display", name: "Airport Display", summary: "Passenger info at terminal scale." },
  { slug: "hotel-display", name: "Hotel Display", summary: "Lobby, in-room and event digital." },
  { slug: "restaurant-display", name: "Restaurant Display", summary: "Digital menus that update instantly." },
  { slug: "shopping-mall-display", name: "Shopping Mall Display", summary: "Atrium hero walls and wayfinding." },
];

export type Project = {
  title: string;
  location: string;
  industry: string;
  image: string;
  blurb: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Global HQ Executive Boardroom",
    location: "Mumbai, MH",
    industry: "Corporate",
    image: projBoardroom,
    blurb: "165\" All-In-One LED with 12-mic array and dual OPS PCs.",
  },
  {
    title: "Landmark Outdoor Media Wall",
    location: "New Delhi, DL",
    industry: "Advertising",
    image: projOutdoor,
    blurb: "P6 outdoor LED spanning 380m² of building façade.",
  },
  {
    title: "State University Smart Campus",
    location: "Pune, MH",
    industry: "Education",
    image: projUniversity,
    blurb: "220 interactive flat panels across 4 academic blocks.",
  },
];

export const COUNTERS = [
  { value: "15+", label: "Years of Excellence" },
  { value: "2.5k+", label: "Projects Delivered" },
  { value: "85+", label: "Cities Covered" },
  { value: "500+", label: "Enterprise Clients" },
];

export const CLIENTS = [
  "TATA",
  "INFOSYS",
  "AIIMS",
  "RELIANCE",
  "WIPRO",
  "L&T",
  "AXIS BANK",
  "BHEL",
  "IIT DELHI",
  "METRO RAIL",
  "TAJ HOTELS",
  "HAL",
];
