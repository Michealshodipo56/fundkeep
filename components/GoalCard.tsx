"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const activities = [
  { type: "Deposit", amount: "+200.00 USDC", time: "2 days ago" },
  { type: "Deposit", amount: "+150.00 USDC", time: "7 days ago" },
  { type: "Goal Created", amount: "1,500.00 USDC target", time: "14 days ago" },
];

function ProgressBar({ value }: { value: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="h-2 rounded-full bg-white/10 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: inView ? `${value}%` : 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        className="h-full rounded-full"
        style={{ background: "linear-gradient(90deg, #e0342a, #ff6b5b)" }}
      />
    </div>
  );
}

export default function GoalCard() {
  const [dot, setDot] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setDot((v) => !v), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    /* Perspective wrapper — gives the card its 3D stage */
    <div style={{ perspective: "1000px" }} className="w-full max-w-[420px]">
    <motion.div
      initial={{ opacity: 0, y: 30, rotateY: -8, rotateX: 2 }}
      animate={{ opacity: 1, y: 0, rotateY: -8, rotateX: 2 }}
      whileHover={{ rotateY: -2, rotateX: 0, scale: 1.015 }}
      transition={{
        opacity: { duration: 0.6, delay: 0.4, ease: "easeOut" },
        y:       { duration: 0.6, delay: 0.4, ease: "easeOut" },
        rotateY: { duration: 0.2, ease: "easeOut" },
        rotateX: { duration: 0.2, ease: "easeOut" },
        scale:   { duration: 0.2, ease: "easeOut" },
      }}
      className="relative rounded-2xl bg-[#111] card-border overflow-hidden w-full"
      style={{
        boxShadow: "0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05), -8px 12px 32px rgba(0,0,0,0.5)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <span className="text-sm font-semibold text-white/80">My Goals</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-white/50">
            <motion.span
              animate={{ opacity: dot ? 1 : 0.3 }}
              transition={{ duration: 0.4 }}
              className="w-2 h-2 rounded-full bg-emerald-400 inline-block"
            />
            Connected
          </div>
          {/* Avatar */}
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red to-orange-400 flex items-center justify-center text-xs font-bold text-white">
            FK
          </div>
        </div>
      </div>

      {/* Goal row */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {/* Laptop icon */}
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="5" width="20" height="13" rx="2" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />
                <path d="M0 19h24" stroke="white" strokeWidth="1.5" strokeOpacity="0.4" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-white">Buy a New Laptop</span>
          </div>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest bg-red/15 text-red border border-red/30">
            LOCKED
          </span>
        </div>

        {/* Amount */}
        <div className="flex items-end justify-between mb-1.5">
          <div>
            <span className="text-2xl font-bold text-white tabular-nums">1,250.00</span>
            <span className="ml-1.5 text-sm font-medium text-white/50">USDC</span>
            <p className="text-xs text-white/30 mt-0.5">of 1,500.00 USDC</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">83%</div>
            <div className="text-xs text-white/40">Progress</div>
          </div>
        </div>

        {/* Progress bar */}
        <ProgressBar value={83} />

        {/* Stats row */}
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/5">
          <div>
            <p className="text-xs text-white/40">Remaining</p>
            <p className="text-sm font-semibold mt-0.5">
              <span className="text-red">• 250.00</span>
              <span className="text-white/60 text-xs ml-1">USDC</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-white/40">Until deadline</p>
            <p className="text-sm font-semibold text-white mt-0.5">42 days left</p>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="px-5 pb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">
            Recent Activity
          </span>
          <button className="text-xs text-red hover:text-red/80 transition-colors min-h-[44px] flex items-center">
            View all
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {activities.map((a, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    {i < 2 ? (
                      <path d="M12 2C9.24 2 7 4.24 7 7v1H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V7c0-2.76-2.24-5-5-5z" fill="rgba(224,52,42,0.6)" />
                    ) : (
                      <>
                        <circle cx="12" cy="12" r="9" stroke="rgba(224,52,42,0.6)" strokeWidth="1.5" />
                        <path d="M12 8v4l3 3" stroke="rgba(224,52,42,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                      </>
                    )}
                  </svg>
                </div>
                <span className="text-xs text-white/70">{a.type}</span>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-red">{a.amount}</p>
                <p className="text-[10px] text-white/30 mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ background: "radial-gradient(ellipse at top right, rgba(224,52,42,0.05) 0%, transparent 60%)" }}
      />
    </motion.div>
    </div>
  );
}
