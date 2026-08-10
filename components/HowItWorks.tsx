"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    n: 1,
    title: "Connect Wallet",
    desc: "Connect your Freighter wallet to get started.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor" />
        <path d="M2 10h20" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    n: 2,
    title: "Create a Goal",
    desc: "Set your target amount and optional deadline.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M15 3l1.5 2M9 3 7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="17" cy="6" r="3" fill="#e0342a" />
        <path d="M16 6h2M17 5v2" stroke="white" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: 3,
    title: "Deposit USDC",
    desc: "Deposit any amount of USDC toward your goal.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 7v10M9 10h4.5a1.5 1.5 0 0 1 0 3H9m0 0h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: 4,
    title: "Stay Locked",
    desc: "Funds are locked until your goal is met or the deadline passes.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2C9.24 2 7 4.24 7 7v1H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V7c0-2.76-2.24-5-5-5z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="12" cy="15" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    n: 5,
    title: "Unlock & Withdraw",
    desc: "Once unlocked, withdraw your funds in one transaction.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 8h2V7a3 3 0 0 1 6 0v1M5 8h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="14" r="1.5" fill="#e0342a" />
        <path d="M12 15.5V18" stroke="#e0342a" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
      className="relative flex flex-col gap-4 p-6 rounded-2xl bg-[#111] card-border hover:border-white/12 transition-colors duration-200 group"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
    >
      {/* Step number badge */}
      <span className="absolute top-4 left-4 w-6 h-6 rounded-md bg-red flex items-center justify-center text-[10px] font-black text-white leading-none">
        {step.n}
      </span>

      {/* Icon */}
      <div className="mt-4 w-12 h-12 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/70 group-hover:text-red transition-colors duration-200">
        {step.icon}
      </div>

      {/* Text */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-1">{step.title}</h3>
        <p className="text-xs text-white/45 leading-relaxed">{step.desc}</p>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true });

  return (
    <section id="how-it-works" className="py-24 relative" aria-labelledby="hiw-heading">
      {/* Section background hint */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 40% at 20% 50%, rgba(224,52,42,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-widest text-red uppercase mb-3">
            Simple Steps
          </p>
          <h2 id="hiw-heading" className="text-3xl sm:text-4xl font-black">
            How <span className="text-red">FundKeep</span> Works
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="relative">
          {/* Connecting dashed line — desktop only */}
          <div
            className="hidden xl:block absolute top-[52px] left-[calc(1/10*100%)] right-[calc(1/10*100%)] h-px border-t border-dashed border-white/10 z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 relative z-10">
            {steps.map((step, i) => (
              <StepCard key={step.n} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
