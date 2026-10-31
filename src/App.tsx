import { useEffect, useState, type FormEvent, type ReactNode } from "react";

type Page = "home" | "products" | "reviews";

type Product = {
  name: string;
  price: number;
  icon: string;
  accent: string;
  description: string;
};

type Review = {
  id: number;
  name: string;
  product: string;
  rating: number;
  message: string;
  date: string;
};

const WHATSAPP_NUMBER = "8801410161380";

const products: Product[] = [
  {
    name: "ChatGPT Plus",
    price: 450,
    icon: "/logos/openai.svg",
    accent: "bg-emerald-50",
    description: "Advanced AI access for smarter writing, research, and everyday productivity.",
  },
  {
    name: "Gemini",
    price: 699,
    icon: "https://cdn.simpleicons.org/googlegemini/8E75F7",
    accent: "bg-violet-50",
    description: "Google's powerful AI assistant for ideas, planning, and creative work.",
  },
  {
    name: "SuperGrok",
    price: 1799,
    icon: "https://cdn.simpleicons.org/x/111827",
    accent: "bg-slate-100",
    description: "Premium access to fast, real-time AI assistance and deeper reasoning.",
  },
  {
    name: "StealthWriter",
    price: 890,
    icon: "https://cdn.simpleicons.org/writedotas/2563EB",
    accent: "bg-blue-50",
    description: "Refine AI-generated text into natural, polished, human-sounding writing.",
  },
  {
    name: "Grammarly",
    price: 350,
    icon: "https://cdn.simpleicons.org/grammarly/15C39A",
    accent: "bg-emerald-50",
    description: "Write clearly and confidently with advanced grammar and tone suggestions.",
  },
  {
    name: "QuillBot",
    price: 250,
    icon: "https://cdn.simpleicons.org/quora/2A8E63",
    accent: "bg-teal-50",
    description: "Paraphrase, summarize, and improve your writing in less time.",
  },
  {
    name: "Cloude Pro",
    price: 999,
    icon: "/logos/claude.svg",
    accent: "bg-rose-50",
    description: "Creative tools for design, photo editing, video, and professional content.",
  },
  {
    name: "CapCut Pro",
    price: 699,
    icon: "/logos/capcut.svg",
    accent: "bg-slate-100",
    description: "Create polished videos with premium effects, templates, and editing tools.",
  },
  {
    name: "Netflix",
    price: 399,
    icon: "https://cdn.simpleicons.org/netflix/E50914",
    accent: "bg-red-50",
    description: "Enjoy popular movies, series, and entertainment on your favorite screen.",
  },
];

function AppLink({
  href,
  children,
  className = "",
  onClick,
  label,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  label?: string;
}) {
  return (
    <a
      aria-label={label}
      className={className}
      href={href}
      onClick={onClick}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      target={href.startsWith("http") ? "_blank" : undefined}
    >
      {children}
    </a>
  );
}

function Brand({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="relative block size-10 shrink-0 overflow-hidden rounded-xl bg-slate-950">
        <img
          alt="Pπemium-IT official logo"
          className="official-logo-image"
          src="./brand/premium-it-logo.png"
        />
      </span>
      <div className={compact ? "hidden sm:block" : ""}>
        <p className={`text-lg font-extrabold tracking-tight ${light ? "text-white" : "text-slate-950"}`}>
          Pπemium-IT
        </p>
        <p className={`text-xs font-medium ${light ? "text-slate-400" : "text-slate-500"}`}>
          Premium digital services
        </p>
      </div>
    </div>
  );
}

function Header({ page, navigate }: { page: Page; navigate: (page: Page) => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-300/80 bg-slate-100/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <AppLink href="#home" onClick={() => navigate("home")} className="shrink-0">
          <Brand compact />
        </AppLink>
        <nav aria-label="Main navigation" className="flex items-center gap-1 rounded-full bg-slate-100 p-1">
          {(["home", "products", "reviews"] as Page[]).map((item) => (
            <AppLink
              key={item}
              href={`#${item}`}
              onClick={() => navigate(item)}
              className={`rounded-full px-3 py-2 text-sm font-bold capitalize transition sm:px-4 ${
                page === item
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-500 hover:text-slate-950"
              }`}
            >
              {item}
            </AppLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path d="m9 18 6-6-6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
      <path d="m5 12 4 4L19 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  );
}

function TrustCard({ number, title, copy }: { number: string; title: string; copy: string }) {
  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl">
      <div className="mb-8 flex items-start justify-between">
        <span className="animate-number-blink grid size-10 place-items-center rounded-full bg-teal-50 font-extrabold text-teal-700 transition-colors group-hover:bg-teal-600 group-hover:text-white">
          {number}
        </span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Trusted</span>
      </div>
      <h3 className="text-xl font-extrabold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{copy}</p>
    </article>
  );
}

function ContactStrip() {
  const contacts = [
    {
      label: "Facebook",
      value: "Pπemium-IT",
      href: "https://www.facebook.com/premiumit2.0",
      icon: "https://cdn.simpleicons.org/facebook/ffffff",
      color: "bg-blue-600",
    },
    {
      label: "Email",
      value: "help.premiumit@gmail.com",
      href: "mailto:help.premiumit@gmail.com",
      icon: "https://cdn.simpleicons.org/gmail/ffffff",
      color: "bg-rose-500",
    },
    {
      label: "WhatsApp",
      value: "01410-161380",
      href: `https://wa.me/${WHATSAPP_NUMBER}`,
      icon: "https://cdn.simpleicons.org/whatsapp/ffffff",
      color: "bg-emerald-500",
    },
    {
      label: "Instagram",
      value: "@premiumit2.0",
      href: "https://www.instagram.com/premiumit2.0/",
      icon: "https://cdn.simpleicons.org/instagram/ffffff",
      color: "bg-fuchsia-600",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
      <div className="overflow-hidden rounded-3xl bg-slate-950 p-6 sm:p-8">
        <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-teal-400">Always connected</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white">কথা বলুন আমাদের সাথে</h2>
          </div>
          <p className="text-sm text-slate-400">Click any channel to connect directly</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {contacts.map((contact) => (
            <AppLink
              key={contact.label}
              href={contact.href}
              className="group flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20 hover:bg-white/10"
              label={`Open ${contact.label}`}
            >
              <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${contact.color}`}>
                <img alt="" className="size-5" src={contact.icon} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold uppercase tracking-wide text-slate-400">
                  {contact.label}
                </span>
                <span className="block truncate text-sm font-bold text-white">{contact.value}</span>
              </span>
            </AppLink>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolsFlowBanner() {
  const streamIcons = [
    { name: "ChatGPT", icon: "./logos/openai.svg", bg: "bg-emerald-50" },
    { name: "Gemini", icon: "https://cdn.simpleicons.org/googlegemini/8E75F7", bg: "bg-violet-50" },
    { name: "SuperGrok", icon: "https://cdn.simpleicons.org/x/111827", bg: "bg-slate-100" },
    { name: "StealthWriter", icon: "https://cdn.simpleicons.org/writedotas/2563EB", bg: "bg-blue-50" },
    { name: "Grammarly", icon: "https://cdn.simpleicons.org/grammarly/15C39A", bg: "bg-emerald-50" },
    { name: "QuillBot", icon: "https://cdn.simpleicons.org/quora/2A8E63", bg: "bg-teal-50" },
    { name: "Claude Pro", icon: "./logos/claude.svg", bg: "bg-rose-50" },
    { name: "CapCut Pro", icon: "./logos/capcut.svg", bg: "bg-slate-100" },
    { name: "Netflix", icon: "https://cdn.simpleicons.org/netflix/E50914", bg: "bg-red-50" },
  ];

  const reversedIcons = [...streamIcons].reverse();
  const leftTrack = [
    ...reversedIcons,
    ...reversedIcons,
    ...reversedIcons,
    ...reversedIcons,
  ];

  const rightTrack = [
    ...streamIcons,
    ...streamIcons,
    ...streamIcons,
    ...streamIcons,
  ];

  return (
    <section className="relative overflow-hidden py-6 my-2 bg-gradient-to-b from-transparent via-slate-200/40 to-transparent">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="relative flex items-center justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white/80 py-5 sm:py-6 shadow-sm backdrop-blur-md">
          
          {/* Left Wing: Cards gliding right and spinning, absorbing into center P with mask fade & scale */}
          <div className="w-1/2 overflow-hidden flex justify-end [mask-image:linear-gradient(to_right,transparent,black_15%,black_82%,rgba(0,0,0,0.15)_96%,transparent_100%)]">
            <div className="animate-inflow-left flex items-center gap-3.5 sm:gap-5 pr-2">
              {leftTrack.map((item, idx) => (
                <div
                  key={`left-in-${idx}`}
                  className={`${item.bg} flex size-11 sm:size-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200/90 p-2 shadow-sm transition-transform hover:scale-110`}
                  title={item.name}
                >
                  <img
                    alt={item.name}
                    className="animate-spin-clockwise size-full object-contain"
                    src={item.icon}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Stable Center Brand P Icon with subtle gravitational absorption boundary */}
          <div className="relative z-30 shrink-0 flex items-center justify-center mx-1 sm:mx-2">
            {/* Soft magnetic glow aura */}
            <div className="pointer-events-none absolute size-24 rounded-full bg-teal-400/35 blur-xl" />
            
            {/* Spinning decorative orbit ring */}
            <div className="animate-spin-slow pointer-events-none absolute size-15 sm:size-17 rounded-full border border-dashed border-teal-500/60" />
            
            {/* Absorption Event Horizon Ring */}
            <div className="pointer-events-none absolute size-14 sm:size-16 rounded-full bg-teal-500/15 blur-sm" />

            {/* Center P Icon Badge */}
            <div className="animate-center-pulse relative flex size-12 sm:size-14 items-center justify-center rounded-2xl bg-slate-950 p-1.5 shadow-2xl ring-4 ring-white">
              <img
                alt="PÏ€emium-IT Official Brand Icon"
                className="size-full object-contain"
                src="./brand/premium-it-logo.png"
              />
            </div>
          </div>

          {/* Right Wing: Cards gliding left and spinning, absorbing into center P with mask fade & scale */}
          <div className="w-1/2 overflow-hidden flex justify-start [mask-image:linear-gradient(to_left,transparent,black_15%,black_82%,rgba(0,0,0,0.15)_96%,transparent_100%)]">
            <div className="animate-inflow-right flex items-center gap-3.5 sm:gap-5 pl-2">
              {rightTrack.map((item, idx) => (
                <div
                  key={`right-in-${idx}`}
                  className={`${item.bg} flex size-11 sm:size-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200/90 p-2 shadow-sm transition-transform hover:scale-110`}
                  title={item.name}
                >
                  <img
                    alt={item.name}
                    className="animate-spin-counter size-full object-contain"
                    src={item.icon}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function RoleSwitcher() {
  const roles = [
    "Student",
    "Developer",
    "Researcher",
    "Writer",
    "Video Editor",
    "Designer",
    "Doctor",
    "Professional",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2 text-sm sm:text-base font-extrabold text-slate-700">
      <span className="text-slate-500">Built for every</span>
      <div className="border-beam-container shadow-sm">
        <div className="border-beam-inner flex items-center justify-center px-4 py-1.5 transition-all">
          <span className="bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent font-black tracking-wide text-sm sm:text-base transition-all duration-300">
            {roles[index]}
          </span>
        </div>
      </div>
      <span className="text-slate-500">& professional</span>
    </div>
  );
}

function HomePage({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pt-10 pb-16 lg:grid-cols-2 lg:px-8 lg:pt-14 lg:pb-20">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-4 py-1.5 text-xs sm:text-sm font-bold text-teal-800 shadow-sm">
              <span className="size-2 rounded-full bg-emerald-500" />
              Trusted digital shop in Bangladesh
            </div>
            <RoleSwitcher />
            <h1 className="max-w-2xl text-5xl font-black leading-tight tracking-tight text-slate-950 sm:text-6xl">
              Premium tools.
              <span className="block text-teal-600">Smarter possibilities.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              AI, writing, design, editing ও entertainment-এর প্রয়োজনীয় premium digital services এখন এক
              জায়গায়—সহজ অর্ডার, দ্রুত সাপোর্ট এবং সাশ্রয়ী মূল্যে।
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <AppLink
                href="#products"
                onClick={() => navigate("products")}
                className="animate-shine inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:bg-teal-700 active:scale-95"
              >
                Explore products <ArrowIcon />
              </AppLink>
              <AppLink
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Pπemium-IT, I need help choosing a product.")}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-extrabold text-slate-800 transition hover:border-slate-950"
              >
                Chat on WhatsApp
              </AppLink>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-600">
              {["Fast response", "Easy ordering", "Helpful support"].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <span className="text-teal-600"><CheckIcon /></span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-4 -z-10 rounded-full bg-teal-100 blur-3xl" />
            <div className="rotate-2 rounded-4xl bg-slate-950 p-5 shadow-2xl transition-all duration-500 hover:rotate-0 hover:scale-[1.02] hover:shadow-teal-950/40">
              <div className="rounded-3xl bg-white p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <Brand />
                  <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-extrabold text-emerald-700">
                    Online
                  </span>
                </div>
                <div className="my-8 grid grid-cols-3 gap-3">
                  {products.slice(0, 6).map((product) => (
                    <div key={product.name} className={`${product.accent} grid aspect-square place-items-center rounded-2xl`}>
                      <img alt={`${product.name} logo`} className="size-9 object-contain" src={product.icon} />
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Starting from</p>
                  <div className="mt-1 flex items-end justify-between">
                    <p className="text-3xl font-black text-slate-950">৳250</p>
                    <p className="text-sm font-bold text-teal-700">9 premium products</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ToolsFlowBanner />

      <section className="border-y border-slate-300 bg-slate-200 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-extrabold uppercase tracking-widest text-teal-700">Why Pπemium-IT</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              ভরসার সাথে ডিজিটাল সার্ভিস
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              আপনার প্রয়োজন বুঝে সঠিক product বেছে নিতে আমরা পাশে আছি—অর্ডারের আগে ও পরে।
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <TrustCard number="01" title="Straightforward pricing" copy="পরিষ্কার মূল্য ও সহজ অর্ডার প্রক্রিয়া—কোনো অপ্রয়োজনীয় জটিলতা নেই।" />
            <TrustCard number="02" title="Responsive support" copy="Product নির্বাচন বা অর্ডার সংক্রান্ত প্রশ্নে WhatsApp-এ দ্রুত সহায়তা।" />
            <TrustCard number="03" title="Customer-first service" copy="প্রতিটি অর্ডারে যত্ন, পরিষ্কার যোগাযোগ এবং দীর্ঘমেয়াদি আস্থাই আমাদের অগ্রাধিকার।" />
          </div>
        </div>
      </section>
      <ContactStrip />
    </main>
  );
}

function ProductCard({ product }: { product: Product }) {
  const message = encodeURIComponent(
    `Hello Pπemium-IT, I want to order ${product.name} for ${product.price} BDT. Please share the details.`,
  );

  return (
    <article className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div className={`${product.accent} grid size-16 place-items-center rounded-2xl`}>
          <img alt={`${product.name} logo`} className="size-9 object-contain" src={product.icon} />
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-500">Premium</span>
      </div>
      <h2 className="mt-6 text-xl font-black text-slate-950">{product.name}</h2>
      <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">{product.description}</p>
      <div className="mt-6 flex items-end gap-2 border-t border-slate-100 pt-5">
        <span className="text-3xl font-black tracking-tight text-slate-950">৳{product.price}</span>
        <span className="pb-1 text-xs font-bold uppercase tracking-wider text-slate-400">BDT</span>
      </div>
      <AppLink
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
        className="animate-shine mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-extrabold text-white transition group-hover:bg-teal-700 active:scale-95"
      >
        Order now <ArrowIcon />
      </AppLink>
    </article>
  );
}

function ProductsPage() {
  return (
    <main>
      <section className="border-b border-slate-200 bg-slate-950">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <p className="text-sm font-extrabold uppercase tracking-widest text-teal-400">Product collection</p>
          <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h1 className="max-w-2xl text-4xl font-black tracking-tight text-white sm:text-5xl">
              আপনার প্রয়োজনের premium digital products
            </h1>
            <p className="max-w-md leading-7 text-slate-400">
              পছন্দের product নির্বাচন করুন। Order Now চাপলে সরাসরি WhatsApp-এ আমাদের সাথে কথা বলতে পারবেন।
            </p>
          </div>
        </div>
      </section>
      <section className="bg-slate-200 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => <ProductCard key={product.name} product={product} />)}
          </div>
          <div className="mt-12 rounded-3xl border border-teal-200 bg-teal-50 p-6 text-center sm:p-8">
            <h2 className="text-2xl font-black text-slate-950">কোন productটি আপনার জন্য সঠিক বুঝতে পারছেন না?</h2>
            <p className="mx-auto mt-2 max-w-xl text-slate-600">WhatsApp-এ আপনার প্রয়োজন বলুন, আমরা সঠিক option বেছে নিতে সাহায্য করব।</p>
            <AppLink
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Pπemium-IT, please help me choose the right product.")}`}
              className="animate-shine mt-6 inline-flex items-center gap-2 rounded-full bg-teal-700 px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-teal-800 active:scale-95"
            >
              Get help on WhatsApp <ArrowIcon />
            </AppLink>
          </div>
        </div>
      </section>
      <ContactStrip />
    </main>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`size-5 ${filled ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
      viewBox="0 0 24 24"
    >
      <path d="m12 2.5 2.9 5.87 6.48.94-4.69 4.57 1.11 6.45L12 17.28l-5.8 3.05 1.11-6.45-4.69-4.57 6.48-.94L12 2.5Z" stroke="currentColor" strokeLinejoin="round" />
    </svg>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-extrabold text-slate-950">{review.name}</h3>
          <p className="mt-1 text-xs font-bold uppercase tracking-wide text-teal-700">{review.product}</p>
        </div>
        <span className="shrink-0 text-xs font-semibold text-slate-400">{review.date}</span>
      </div>
      <div className="mt-4 flex gap-1" aria-label={`${review.rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => <StarIcon key={star} filled={star <= review.rating} />)}
      </div>
      <p className="mt-4 leading-7 text-slate-600">{review.message}</p>
    </article>
  );
}

function ReviewsPage({ reviews, onAddReview }: { reviews: Review[]; onAddReview: (review: Review) => void }) {
  const [name, setName] = useState("");
  const [product, setProduct] = useState(products[0].name);
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitReview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanMessage = message.trim();
    if (!cleanName || !cleanMessage) return;

    onAddReview({
      id: Date.now(),
      name: cleanName,
      product,
      rating,
      message: cleanMessage,
      date: new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date()),
    });
    setName("");
    setProduct(products[0].name);
    setRating(5);
    setMessage("");
    setSubmitted(true);
  };

  return (
    <main>
      <section className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <p className="text-sm font-extrabold uppercase tracking-widest text-teal-400">Customer reviews</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl">
            আপনার অভিজ্ঞতা আমাদের সাথে শেয়ার করুন
          </h1>
          <p className="mt-5 max-w-2xl leading-7 text-slate-400">
            Pπemium-IT থেকে নেওয়া product ও service সম্পর্কে আপনার মতামত লিখুন। আপনার feedback আমাদের service আরও ভালো করতে সাহায্য করবে।
          </p>
        </div>
      </section>

      <section className="bg-slate-200 py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-2">
            <div className="sticky top-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-extrabold uppercase tracking-widest text-teal-700">Write a review</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">আপনার Review দিন</h2>
              <form className="mt-7 space-y-5" onSubmit={submitReview}>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-700">আপনার নাম</span>
                  <input
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    maxLength={50}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="আপনার নাম লিখুন"
                    required
                    type="text"
                    value={name}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-700">Product</span>
                  <select
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    onChange={(event) => setProduct(event.target.value)}
                    value={product}
                  >
                    {products.map((item) => <option key={item.name}>{item.name}</option>)}
                  </select>
                </label>

                <fieldset>
                  <legend className="mb-2 text-sm font-bold text-slate-700">Rating</legend>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        aria-label={`${star} star rating`}
                        className={`grid size-11 place-items-center rounded-xl border transition ${
                          star <= rating
                            ? "border-amber-300 bg-amber-50"
                            : "border-slate-300 bg-slate-50 hover:border-slate-400"
                        }`}
                        key={star}
                        onClick={() => setRating(star)}
                        type="button"
                      >
                        <StarIcon filled={star <= rating} />
                      </button>
                    ))}
                  </div>
                </fieldset>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-700">আপনার মতামত</span>
                  <textarea
                    className="min-h-32 w-full resize-y rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    maxLength={500}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Product ও service সম্পর্কে আপনার অভিজ্ঞতা লিখুন..."
                    required
                    value={message}
                  />
                </label>

                <button
                  className="animate-shine w-full rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-teal-700 active:scale-95"
                  type="submit"
                >
                  Submit review
                </button>
                {submitted && (
                  <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700" role="status">
                    ধন্যবাদ। আপনার review সফলভাবে যোগ হয়েছে।
                  </p>
                )}
              </form>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-widest text-teal-700">Community feedback</p>
                <h2 className="mt-2 text-3xl font-black text-slate-950">Customer reviews</h2>
              </div>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-extrabold text-slate-600 shadow-sm">
                {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
              </span>
            </div>

            {reviews.length > 0 ? (
              <div className="grid gap-5">
                {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-400 bg-slate-100 p-10 text-center">
                <div className="mx-auto flex w-fit gap-1">
                  {[1, 2, 3, 4, 5].map((star) => <StarIcon key={star} filled />)}
                </div>
                <h3 className="mt-5 text-xl font-black text-slate-950">প্রথম reviewটি আপনার হতে পারে</h3>
                <p className="mx-auto mt-2 max-w-md leading-7 text-slate-600">
                  বাম পাশের form পূরণ করে Pπemium-IT সম্পর্কে আপনার অভিজ্ঞতা শেয়ার করুন।
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <ContactStrip />
    </main>
  );
}

function Footer({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <Brand light />
        <div className="flex gap-6 text-sm font-bold text-slate-400">
          <AppLink href="#home" onClick={() => navigate("home")} className="hover:text-white">Home</AppLink>
          <AppLink href="#products" onClick={() => navigate("products")} className="hover:text-white">Products</AppLink>
          <AppLink href="#reviews" onClick={() => navigate("reviews")} className="hover:text-white">Reviews</AppLink>
          <AppLink href="mailto:help.premiumit@gmail.com" className="hover:text-white">Support</AppLink>
        </div>
        <p className="text-sm text-slate-500">© 2025 Pπemium-IT. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function App() {
  const getPage = (): Page => {
    if (window.location.hash === "#products") return "products";
    if (window.location.hash === "#reviews") return "reviews";
    return "home";
  };
  const [page, setPage] = useState<Page>(getPage);
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const storedReviews = window.localStorage.getItem("premium-it-reviews");
      return storedReviews ? JSON.parse(storedReviews) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const onHashChange = () => setPage(getPage());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = (nextPage: Page) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addReview = (review: Review) => {
    setReviews((currentReviews) => {
      const updatedReviews = [review, ...currentReviews];
      window.localStorage.setItem("premium-it-reviews", JSON.stringify(updatedReviews));
      return updatedReviews;
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <Header page={page} navigate={navigate} />
      {page === "home" && <HomePage navigate={navigate} />}
      {page === "products" && <ProductsPage />}
      {page === "reviews" && <ReviewsPage reviews={reviews} onAddReview={addReview} />}
      <Footer navigate={navigate} />
    </div>
  );
}
