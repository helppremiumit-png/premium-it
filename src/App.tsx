import { useEffect, useState, type FormEvent, type ReactNode } from "react";

type Page = "home" | "products" | "reviews";

type Product = {
  name: string;
  price: number;
  icon: string;
  accent: string;
  description: string;
  category?: string;
  popular?: boolean;
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
    description: "Advanced AI access for smarter writing, research, coding, and everyday productivity.",
    popular: true,
  },
  {
    name: "Gemini Advanced",
    price: 699,
    icon: "https://cdn.simpleicons.org/googlegemini/8E75F7",
    accent: "bg-violet-50",
    description: "Google's 2M context AI assistant for multimodal workflow, planning, and creative work.",
    popular: true,
  },
  {
    name: "SuperGrok",
    price: 1799,
    icon: "https://cdn.simpleicons.org/x/111827",
    accent: "bg-slate-100",
    description: "Premium access to fast, real-time AI assistance, deep reasoning, and uncensored insights.",
  },
  {
    name: "StealthWriter",
    price: 890,
    icon: "https://cdn.simpleicons.org/writedotas/2563EB",
    accent: "bg-blue-50",
    description: "Refine AI-generated text into undetectable, natural, human-sounding writing.",
  },
  {
    name: "Grammarly Premium",
    price: 350,
    icon: "https://cdn.simpleicons.org/grammarly/15C39A",
    accent: "bg-emerald-50",
    description: "Write clearly and confidently with advanced grammar, style, and tone suggestions.",
    popular: true,
  },
  {
    name: "QuillBot Premium",
    price: 250,
    icon: "https://cdn.simpleicons.org/quora/2A8E63",
    accent: "bg-teal-50",
    description: "Paraphrase, summarize, and instantly improve your essays and thesis in less time.",
  },
  {
    name: "Claude Pro",
    price: 999,
    icon: "/logos/claude.svg",
    accent: "bg-amber-50",
    description: "Anthropic's flagship model for coding, high-level analysis, and natural writing.",
    popular: true,
  },
  {
    name: "CapCut Pro",
    price: 699,
    icon: "/logos/capcut.svg",
    accent: "bg-slate-100",
    description: "Create viral videos with full premium transitions, auto-captions, and AI filters.",
  },
  {
    name: "Netflix Premium 4K",
    price: 399,
    icon: "https://cdn.simpleicons.org/netflix/E50914",
    accent: "bg-red-50",
    description: "Enjoy ultra HD movies, web series, and blockbuster entertainment without ads.",
    popular: true,
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
      <span className="relative block size-10 shrink-0 overflow-hidden rounded-xl bg-slate-950 ring-1 ring-white/10 shadow-md">
        <img
          alt="PÏ€emium-IT official logo"
          className="official-logo-image"
          src="/brand/premium-it-official.jpeg"
        />
      </span>
      <div className={compact ? "hidden sm:block" : ""}>
        <p className={`text-lg font-extrabold tracking-tight ${light ? "text-white" : "text-slate-950"}`}>
          PÏ€emium-IT
        </p>
        <p className={`text-xs font-semibold ${light ? "text-teal-400" : "text-teal-700"}`}>
          Premium digital services
        </p>
      </div>
    </div>
  );
}

function Header({ page, navigate }: { page: Page; navigate: (page: Page) => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-300/80 bg-slate-100/95 backdrop-blur-xl transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <AppLink href="#home" onClick={() => navigate("home")} className="shrink-0 transition-transform active:scale-95" label="Go to Home">
          <Brand compact />
        </AppLink>
        <nav aria-label="Main navigation" className="flex items-center gap-1 rounded-full bg-slate-200/80 p-1 shadow-inner">
          {(["home", "products", "reviews"] as Page[]).map((item) => (
            <AppLink
              key={item}
              href={`#${item}`}
              onClick={() => navigate(item)}
              className={`rounded-full px-4 py-2 text-sm font-bold capitalize transition-all duration-200 ${
                page === item
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-600 hover:text-slate-950 hover:bg-slate-300/50"
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
    <svg aria-hidden="true" className="size-4 shrink-0 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24">
      <path d="m9 18 6-6-6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="size-5 shrink-0" fill="none" viewBox="0 0 24 24">
      <path d="m5 12 4 4L19 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  );
}

function TrustCard({ number, title, copy }: { number: string; title: string; copy: string }) {
  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl">
      <div className="mb-6 flex items-start justify-between">
        <span className="grid size-11 place-items-center rounded-2xl bg-teal-50 font-black text-teal-700 transition group-hover:bg-teal-600 group-hover:text-white">
          {number}
        </span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200/50">Trusted</span>
      </div>
      <h3 className="text-xl font-extrabold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
    </article>
  );
}

function ContactStrip() {
  const contacts = [
    {
      label: "Facebook",
      value: "PÏ€emium-IT",
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
      <div className="overflow-hidden rounded-3xl bg-slate-950 p-6 sm:p-10 shadow-2xl border border-white/10">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-teal-400">Always Connected</p>
            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">à¦•à¦¥à¦¾ à¦¬à¦²à§à¦¨ à¦†à¦®à¦¾à¦¦à§‡à¦° à¦¸à¦¾à¦¥à§‡</h2>
          </div>
          <p className="text-sm font-medium text-slate-400">Click any channel to connect instantly</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {contacts.map((contact) => (
            <AppLink
              key={contact.label}
              href={contact.href}
              className="group flex min-w-0 items-center gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-teal-500/50 hover:bg-white/10 hover:-translate-y-0.5"
              label={`Open ${contact.label}`}
            >
              <span className={`grid size-11 shrink-0 place-items-center rounded-xl shadow-md ${contact.color}`}>
                <img alt="" className="size-5" src={contact.icon} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold uppercase tracking-wide text-slate-400">
                  {contact.label}
                </span>
                <span className="block truncate text-sm font-extrabold text-white group-hover:text-teal-300 transition-colors">
                  {contact.value}
                </span>
              </span>
            </AppLink>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomePage({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-4 py-2 text-xs sm:text-sm font-bold text-teal-800 shadow-sm">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              Trusted Digital Shop in Bangladesh
            </div>
            <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-6xl">
              Premium tools.
              <span className="block text-teal-600">Smarter possibilities.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-slate-600">
              AI, writing, design, editing à¦“ entertainment-à¦à¦° à¦ªà§à¦°à§Ÿà§‹à¦œà¦¨à§€à§Ÿ premium digital services à¦à¦–à¦¨ à¦à¦•
              à¦œà¦¾à§Ÿà¦—à¦¾à§Ÿâ€”à¦¸à¦¹à¦œ à¦…à¦°à§à¦¡à¦¾à¦°, à¦¦à§à¦°à§à¦¤ à¦¡à§‡à¦²à¦¿à¦­à¦¾à¦°à¦¿ à¦“ à¦¸à¦¾à¦¶à§à¦°à§Ÿà§€ à¦®à§‚à¦²à§à¦¯à§‡à¥¤
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <AppLink
                href="#products"
                onClick={() => navigate("products")}
                className="animate-shine inline-flex items-center gap-2.5 rounded-full bg-slate-950 px-7 py-4 text-sm font-black text-white shadow-xl transition-all duration-300 hover:bg-teal-700 hover:shadow-teal-900/20 active:scale-95"
              >
                Explore products <ArrowIcon />
              </AppLink>
              <AppLink
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello PÏ€emium-IT, I need help choosing a product.")}`}
                className="inline-flex items-center gap-2.5 rounded-full border-2 border-slate-300 bg-white px-7 py-3.5 text-sm font-black text-slate-800 shadow-sm transition-all duration-300 hover:border-slate-950 hover:bg-slate-50 active:scale-95"
              >
                Chat on WhatsApp
              </AppLink>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs sm:text-sm font-bold text-slate-600">
              {["Fast response", "Easy ordering", "Helpful support", "Verified Accounts"].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <span className="text-teal-600"><CheckIcon /></span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-4 -z-10 rounded-full bg-teal-200/60 blur-3xl" />
            <div className="rotate-2 rounded-4xl bg-slate-950 p-5 shadow-2xl transition-transform hover:rotate-0 duration-500">
              <div className="rounded-3xl bg-white p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <Brand />
                  <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-black text-emerald-700">
                    â— Online
                  </span>
                </div>
                <div className="my-8 grid grid-cols-3 gap-3">
                  {products.slice(0, 6).map((product) => (
                    <div key={product.name} className={`${product.accent} grid aspect-square place-items-center rounded-2xl shadow-sm transition-transform hover:scale-105 duration-200`}>
                      <img alt={`${product.name} logo`} className="size-9 object-contain" src={product.icon} />
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Starting from</p>
                  <div className="mt-1 flex items-end justify-between">
                    <p className="text-3xl font-black text-slate-950">à§³250</p>
                    <p className="text-xs sm:text-sm font-black text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg">9+ Premium Tools</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reserved Slot for the User's upcoming Marquee / Hero animation */}
      <div id="animation-banner-slot" className="w-full">
        {/* Placeholder slot kept empty as instructed: "à¦ à¦œà¦¾à§Ÿà¦—à¦¾à¦Ÿà¦¾ à¦–à¦¾à¦²à¦¿ à¦°à¦¾à¦–à¦¬à¦¾, à¦†à¦®à¦¿ à¦ªà¦°à§‡ à¦¬à¦²à¦¬à§‹ à¦ à¦…à§à¦¯à¦¾à¦¨à¦¿à¦®à§‡à¦¶à¦¨à¦Ÿà¦¾ à¦•à¦¿à¦°à¦•à¦® à¦¹à¦¬à§‡à¥¤" */}
      </div>

      <section className="border-y border-slate-300 bg-slate-200/90 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-widest text-teal-700">Why PÏ€emium-IT</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              à¦­à¦°à¦¸à¦¾à¦° à¦¸à¦¾à¦¥à§‡ à¦¡à¦¿à¦œà¦¿à¦Ÿà¦¾à¦² à¦¸à¦¾à¦°à§à¦­à¦¿à¦¸
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              à¦†à¦ªà¦¨à¦¾à¦° à¦ªà§à¦°à§Ÿà§‹à¦œà¦¨ à¦¬à§à¦à§‡ à¦¸à¦ à¦¿à¦• product à¦¬à§‡à¦›à§‡ à¦¨à¦¿à¦¤à§‡ à¦†à¦®à¦°à¦¾ à¦ªà¦¾à¦¶à§‡ à¦†à¦›à¦¿â€”à¦…à¦°à§à¦¡à¦¾à¦°à§‡à¦° à¦†à¦—à§‡ à¦“ à¦ªà¦°à§‡ à¦¸à¦¾à¦°à§à¦¬à¦•à§à¦·à¦£à¦¿à¦• à¦¸à¦¹à¦¾à§Ÿà¦¤à¦¾ à¦ªà¦¾à¦¬à§‡à¦¨à¥¤
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <TrustCard number="01" title="Straightforward pricing" copy="à¦ªà¦°à¦¿à¦·à§à¦•à¦¾à¦° à¦®à§‚à¦²à§à¦¯ à¦“ à¦¸à¦¹à¦œ à¦…à¦°à§à¦¡à¦¾à¦° à¦ªà§à¦°à¦•à§à¦°à¦¿à§Ÿà¦¾â€”à¦•à§‹à¦¨à§‹ à¦²à§à¦•à¦¾à¦¨à§‹ à¦šà¦¾à¦°à§à¦œ à¦¬à¦¾ à¦œà¦Ÿà¦¿à¦²à¦¤à¦¾ à¦¨à§‡à¦‡à¥¤" />
            <TrustCard number="02" title="Responsive support" copy="Product à¦¨à¦¿à¦°à§à¦¬à¦¾à¦šà¦¨ à¦¬à¦¾ à¦¯à§‡à¦•à§‹à¦¨à§‹ à¦Ÿà§‡à¦•à¦¨à¦¿à¦•à§à¦¯à¦¾à¦² à¦ªà§à¦°à¦¶à§à¦¨à§‡ WhatsApp-à¦ à¦¦à§à¦°à§à¦¤ à¦•à¦¾à¦°à§à¦¯à¦•à¦° à¦¸à¦¹à¦¾à§Ÿà¦¤à¦¾à¥¤" />
            <TrustCard number="03" title="Customer-first service" copy="à¦ªà§à¦°à¦¤à¦¿à¦Ÿà¦¿ à¦…à¦°à§à¦¡à¦¾à¦°à§‡ à¦¯à¦¤à§à¦¨, à¦¸à§Ž à¦¯à§‹à¦—à¦¾à¦¯à§‹à¦— à¦à¦¬à¦‚ à¦¦à§€à¦°à§à¦˜à¦®à§‡à§Ÿà¦¾à¦¦à¦¿ à¦—à§à¦°à¦¾à¦¹à¦• à¦†à¦¸à§à¦¥à¦¾à¦‡ à¦†à¦®à¦¾à¦¦à§‡à¦° à¦®à§‚à¦² à¦²à¦•à§à¦·à§à¦¯à¥¤" />
          </div>
        </div>
      </section>
      <ContactStrip />
    </main>
  );
}

function ProductCard({ product }: { product: Product }) {
  const message = encodeURIComponent(
    `Hello PÏ€emium-IT, I want to order ${product.name} for ${product.price} BDT. Please share the details.`,
  );

  return (
    <article className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-400 hover:shadow-2xl">
      <div>
        <div className="flex items-start justify-between">
          <div className={`${product.accent} grid size-16 place-items-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-105`}>
            <img alt={`${product.name} logo`} className="size-9 object-contain" src={product.icon} />
          </div>
          {product.popular ? (
            <span className="rounded-full bg-teal-50 border border-teal-200 px-3 py-1 text-xs font-black text-teal-700">
              Popular â˜…
            </span>
          ) : (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
              Premium
            </span>
          )}
        </div>
        <h2 className="mt-6 text-xl font-black text-slate-950 group-hover:text-teal-700 transition-colors">
          {product.name}
        </h2>
        <p className="mt-2.5 text-sm leading-6 text-slate-500 min-h-12">
          {product.description}
        </p>
      </div>

      <div className="mt-6 pt-5 border-t border-slate-100">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black tracking-tight text-slate-950">à§³{product.price}</span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">BDT</span>
        </div>
        <AppLink
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
          className="animate-shine mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-black text-white shadow-md transition-all duration-300 group-hover:bg-teal-700 group-hover:shadow-lg active:scale-95"
        >
          <span>Order now</span>
          <ArrowIcon />
        </AppLink>
      </div>
    </article>
  );
}

function ProductsPage() {
  return (
    <main>
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <p className="text-xs font-extrabold uppercase tracking-widest text-teal-400">Exclusive Collection</p>
          <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h1 className="max-w-2xl text-3xl font-black tracking-tight text-white sm:text-5xl">
              à¦†à¦ªà¦¨à¦¾à¦° à¦ªà§à¦°à§Ÿà§‹à¦œà¦¨à§‡à¦° Premium Digital Products
            </h1>
            <p className="max-w-md text-sm sm:text-base leading-relaxed text-slate-400">
              à¦ªà¦›à¦¨à§à¦¦à§‡à¦° à¦¸à¦¾à¦°à§à¦­à¦¿à¦¸ à¦¨à¦¿à¦°à§à¦¬à¦¾à¦šà¦¨ à¦•à¦°à§à¦¨à¥¤ Order Now à¦¬à¦¾à¦Ÿà¦¨à§‡ à¦šà¦¾à¦ªà¦²à§‡ à¦¸à¦°à¦¾à¦¸à¦°à¦¿ WhatsApp-à¦ à¦¬à¦¿à¦¸à§à¦¤à¦¾à¦°à¦¿à¦¤ à¦¸à¦¹ à¦…à¦°à§à¦¡à¦¾à¦° à¦•à¦°à¦¤à§‡ à¦ªà¦¾à¦°à¦¬à§‡à¦¨à¥¤
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-200/90 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => <ProductCard key={product.name} product={product} />)}
          </div>
          <div className="mt-14 rounded-3xl border border-teal-200 bg-teal-50 p-8 text-center sm:p-10 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">à¦•à§‹à¦¨ product-à¦Ÿà¦¿ à¦†à¦ªà¦¨à¦¾à¦° à¦œà¦¨à§à¦¯ à¦¸à¦¬à¦šà§‡à§Ÿà§‡ à¦­à¦¾à¦²à§‹ à¦¹à¦¬à§‡ à¦¬à§à¦à¦¤à§‡ à¦ªà¦¾à¦°à¦›à§‡à¦¨ à¦¨à¦¾?</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm sm:text-base text-slate-600">WhatsApp-à¦ à¦†à¦ªà¦¨à¦¾à¦° à¦ªà§à¦°à§Ÿà§‹à¦œà¦¨ à¦œà¦¾à¦¨à¦¾à¦¨, à¦†à¦®à¦°à¦¾ à¦¸à¦¬à¦šà§‡à§Ÿà§‡ à¦¸à¦¾à¦¶à§à¦°à§Ÿà§€ à¦“ à¦‰à¦ªà¦¯à§à¦•à§à¦¤ à¦…à¦ªà¦¶à¦¨à¦Ÿà¦¿ à¦¬à§‡à¦›à§‡ à¦¦à§‡à¦¬à¥¤</p>
            <AppLink
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello PÏ€emium-IT, please help me choose the right product.")}`}
              className="animate-shine mt-6 inline-flex items-center gap-2 rounded-full bg-teal-700 px-7 py-3.5 text-sm font-black text-white shadow-lg transition-all duration-300 hover:bg-teal-800 active:scale-95"
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
      className={`size-5 transition-transform ${filled ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
      viewBox="0 0 24 24"
    >
      <path d="m12 2.5 2.9 5.87 6.48.94-4.69 4.57 1.11 6.45L12 17.28l-5.8 3.05 1.11-6.45-4.69-4.57 6.48-.94L12 2.5Z" stroke="currentColor" strokeLinejoin="round" />
    </svg>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-extrabold text-slate-950 text-base">{review.name}</h3>
          <p className="mt-1 text-xs font-bold uppercase tracking-wide text-teal-700 bg-teal-50 px-2 py-0.5 rounded w-fit">{review.product}</p>
        </div>
        <span className="shrink-0 text-xs font-semibold text-slate-400">{review.date}</span>
      </div>
      <div className="mt-3.5 flex gap-1" aria-label={`${review.rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => <StarIcon key={star} filled={star <= review.rating} />)}
      </div>
      <p className="mt-3.5 leading-relaxed text-sm text-slate-600">{review.message}</p>
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
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main>
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <p className="text-xs font-extrabold uppercase tracking-widest text-teal-400">Customer Feedback</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-5xl">
            à¦†à¦ªà¦¨à¦¾à¦° à¦…à¦­à¦¿à¦œà§à¦žà¦¤à¦¾ à¦†à¦®à¦¾à¦¦à§‡à¦° à¦¸à¦¾à¦¥à§‡ à¦¶à§‡à§Ÿà¦¾à¦° à¦•à¦°à§à¦¨
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-400">
            PÏ€emium-IT à¦¥à§‡à¦•à§‡ à¦¨à§‡à¦“à§Ÿà¦¾ à¦¸à¦¾à¦°à§à¦­à¦¿à¦¸ à¦“ à¦ªà§à¦°à§‹à¦¡à¦¾à¦•à§à¦Ÿ à¦¸à¦®à§à¦ªà¦°à§à¦•à§‡ à¦†à¦ªà¦¨à¦¾à¦° à¦¸à§Ž à¦®à¦¤à¦¾à¦®à¦¤ à¦²à¦¿à¦–à§à¦¨à¥¤ à¦†à¦ªà¦¨à¦¾à¦° à¦®à§‚à¦²à§à¦¯à¦¬à¦¾à¦¨ à¦°à¦¿à¦­à¦¿à¦‰ à¦†à¦®à¦¾à¦¦à§‡à¦° à¦¸à§‡à¦¬à¦¾à¦•à§‡ à¦†à¦°à§‹ à¦‰à¦¨à§à¦¨à¦¤ à¦•à¦°à¦¤à§‡ à¦¸à¦¹à¦¾à§Ÿà¦¤à¦¾ à¦•à¦°à§‡à¥¤
          </p>
        </div>
      </section>

      <section className="bg-slate-200/90 py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-2">
            <div className="sticky top-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-xs font-extrabold uppercase tracking-widest text-teal-700">Write a Review</p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">à¦†à¦ªà¦¨à¦¾à¦° Review à¦¦à¦¿à¦¨</h2>
              <form className="mt-6 space-y-4" onSubmit={submitReview}>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">à¦†à¦ªà¦¨à¦¾à¦° à¦¨à¦¾à¦®</span>
                  <input
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    maxLength={50}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="à¦†à¦ªà¦¨à¦¾à¦° à¦¨à¦¾à¦® à¦²à¦¿à¦–à§à¦¨"
                    required
                    type="text"
                    value={name}
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">Product</span>
                  <select
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100 font-medium"
                    onChange={(event) => setProduct(event.target.value)}
                    value={product}
                  >
                    {products.map((item) => <option key={item.name}>{item.name}</option>)}
                  </select>
                </label>

                <fieldset>
                  <legend className="mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">Rating</legend>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        aria-label={`${star} star rating`}
                        className={`grid size-11 place-items-center rounded-xl border transition-all duration-200 active:scale-95 ${
                          star <= rating
                            ? "border-amber-300 bg-amber-50 text-amber-500 scale-105"
                            : "border-slate-300 bg-slate-50 text-slate-400 hover:border-slate-400"
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
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">à¦†à¦ªà¦¨à¦¾à¦° à¦®à¦¤à¦¾à¦®à¦¤</span>
                  <textarea
                    className="min-h-28 w-full resize-y rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    maxLength={500}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Product à¦“ à¦¸à¦¾à¦°à§à¦­à¦¿à¦¸ à¦¸à¦®à§à¦ªà¦°à§à¦•à§‡ à¦†à¦ªà¦¨à¦¾à¦° à¦…à¦­à¦¿à¦œà§à¦žà¦¤à¦¾ à¦²à¦¿à¦–à§à¦¨..."
                    required
                    value={message}
                  />
                </label>

                <button
                  className="animate-shine w-full rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-black text-white transition-all duration-300 hover:bg-teal-700 active:scale-95 shadow-md"
                  type="submit"
                >
                  Submit review
                </button>
                {submitted && (
                  <p className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-xs sm:text-sm font-bold text-emerald-700" role="status">
                    à¦§à¦¨à§à¦¯à¦¬à¦¾à¦¦! à¦†à¦ªà¦¨à¦¾à¦° review à¦¸à¦«à¦²à¦­à¦¾à¦¬à§‡ à¦¯à§à¦•à§à¦¤ à¦¹à§Ÿà§‡à¦›à§‡à¥¤
                  </p>
                )}
              </form>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-teal-700">Community Reviews</p>
                <h2 className="mt-1 text-2xl sm:text-3xl font-black text-slate-950">à¦—à§à¦°à¦¾à¦¹à¦•à¦¦à§‡à¦° à¦ªà§à¦°à¦¤à¦¿à¦•à§à¦°à¦¿à¦¯à¦¼à¦¾</h2>
              </div>
              <span className="rounded-full bg-white border border-slate-200 px-4 py-1.5 text-xs sm:text-sm font-black text-slate-700 shadow-sm">
                {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
              </span>
            </div>

            {reviews.length > 0 ? (
              <div className="grid gap-4 sm:gap-5">
                {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
              </div>
            ) : (
              <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                <div className="mx-auto flex w-fit gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => <StarIcon key={star} filled />)}
                </div>
                <h3 className="mt-4 text-xl font-black text-slate-950">à¦ªà§à¦°à¦¥à¦® Review à¦¦à¦¿à¦¨!</h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
                  à¦¬à¦¾à¦® à¦ªà¦¾à¦¶à§‡à¦° à¦«à¦°à§à¦®à¦Ÿà¦¿ à¦ªà§‚à¦°à¦£ à¦•à¦°à§‡ PÏ€emium-IT à¦¸à¦®à§à¦ªà¦°à§à¦•à§‡ à¦†à¦ªà¦¨à¦¾à¦° à¦…à¦­à¦¿à¦œà§à¦žà¦¤à¦¾ à¦¶à§‡à§Ÿà¦¾à¦° à¦•à¦°à§à¦¨à¥¤
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
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          {/* Logo, Brand & Tagline with Direct Home Link */}
          <div className="md:col-span-5">
            <AppLink
              href="#home"
              onClick={() => navigate("home")}
              className="inline-block transition-transform hover:opacity-95 active:scale-95"
              label="Go to Top Home"
            >
              <Brand light />
            </AppLink>
            <p className="mt-4 max-w-sm text-xs sm:text-sm leading-relaxed text-slate-400">
              Bangladesh-à¦à¦° à¦¸à¦¬à¦šà§‡à§Ÿà§‡ à¦¬à¦¿à¦¶à§à¦¬à¦¸à§à¦¤ à¦¡à¦¿à¦œà¦¿à¦Ÿà¦¾à¦² à¦¸à¦¾à¦°à§à¦­à¦¿à¦¸ à¦“ à¦ªà§à¦°à¦¿à¦®à¦¿à¦¯à¦¼à¦¾à¦® à¦Ÿà§à¦²à¦¸ à¦¶à¦ªà¥¤ à§¨à§ª/à§­ à¦•à¦¾à¦¸à§à¦Ÿà¦®à¦¾à¦° à¦¸à¦¾à¦ªà§‹à¦°à§à¦Ÿ à¦“ à¦¸à¦¾à¦¶à§à¦°à¦¯à¦¼à§€ à¦®à§‚à¦²à§à¦¯à¥¤
            </p>
          </div>

          {/* Quick Page Links */}
          <div className="md:col-span-4">
            <p className="text-xs font-black uppercase tracking-wider text-teal-400">Quick Navigation</p>
            <nav className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-slate-300">
              <AppLink
                href="#home"
                onClick={() => navigate("home")}
                className="transition-colors hover:text-teal-400"
              >
                Home
              </AppLink>
              <AppLink
                href="#products"
                onClick={() => navigate("products")}
                className="transition-colors hover:text-teal-400"
              >
                Products
              </AppLink>
              <AppLink
                href="#reviews"
                onClick={() => navigate("reviews")}
                className="transition-colors hover:text-teal-400"
              >
                Reviews
              </AppLink>
              <AppLink
                href="mailto:help.premiumit@gmail.com"
                className="transition-colors hover:text-teal-400"
              >
                Support
              </AppLink>
            </nav>
          </div>

          {/* Contact Direct CTA */}
          <div className="md:col-span-3 flex flex-col md:items-end">
            <AppLink
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              className="animate-shine inline-flex items-center gap-2 rounded-full bg-teal-600 px-5 py-2.5 text-xs font-black text-white shadow-lg transition-all hover:bg-teal-500 active:scale-95"
            >
              <span>WhatsApp Support</span>
              <ArrowIcon />
            </AppLink>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-900 pt-8 sm:flex-row text-xs text-slate-500">
          <p>Â© {new Date().getFullYear()} PÏ€emium-IT. All rights reserved.</p>
          <p className="text-slate-400 font-medium">Delivering Premium Digital Experiences across Bangladesh</p>
        </div>
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
      if (storedReviews) return JSON.parse(storedReviews);
    } catch {
      // fallback
    }
    return [
      {
        id: 1,
        name: "Tanvir Ahmed",
        product: "ChatGPT Plus",
        rating: 5,
        message: "à¦–à§à¦¬ à¦¦à§à¦°à§à¦¤ ChatGPT Plus à¦à¦•à§à¦Ÿà¦¿à¦­ à¦•à¦°à§‡ à¦¦à¦¿à§Ÿà§‡à¦›à§‡à¦¨à¥¤ à¦¸à¦¾à¦°à§à¦­à¦¿à¦¸ à¦…à¦¤à§à¦¯à¦¨à§à¦¤ à¦šà¦®à§Žà¦•à¦¾à¦°!",
        date: "28 Oct 2026",
      },
      {
        id: 2,
        name: "Farhan Hossain",
        product: "Grammarly Premium",
        rating: 5,
        message: "Grammarly à¦ à¦¿à¦•à¦­à¦¾à¦¬à§‡ à¦•à¦¾à¦œ à¦•à¦°à¦›à§‡à¥¤ à¦¸à¦¾à¦ªà§‹à¦°à§à¦Ÿ à¦…à¦¨à§‡à¦• à¦†à¦¨à§à¦¤à¦°à¦¿à¦• à¦“ à¦¦à§à¦°à§à¦¤à¥¤",
        date: "26 Oct 2026",
      },
      {
        id: 3,
        name: "Shakil Khan",
        product: "CapCut Pro",
        rating: 5,
        message: "CapCut Pro à¦¦à¦¿à§Ÿà§‡ à¦•à§‹à¦¨à§‹ à¦²à§à¦¯à¦¾à¦— à¦›à¦¾à§œà¦¾ à¦à¦¡à¦¿à¦Ÿ à¦•à¦°à¦¤à§‡ à¦ªà¦¾à¦°à¦›à¦¿à¥¤ à¦Ÿà§à¦°à¦¾à¦¸à§à¦Ÿà§‡à¦¡ à¦¶à¦ª!",
        date: "24 Oct 2026",
      },
    ];
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
      try {
        window.localStorage.setItem("premium-it-reviews", JSON.stringify(updatedReviews));
      } catch {
        // ignore
      }
      return updatedReviews;
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950 flex flex-col justify-between selection:bg-teal-500 selection:text-white">
      <Header page={page} navigate={navigate} />
      <div className="flex-1">
        {page === "home" && <HomePage navigate={navigate} />}
        {page === "products" && <ProductsPage />}
        {page === "reviews" && <ReviewsPage reviews={reviews} onAddReview={addReview} />}
      </div>
      <Footer navigate={navigate} />
    </div>
  );
}

