"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* Official SVG marks for each ecosystem partner */

function StellarLogo() {
  return (
    <svg width="120" height="32" viewBox="0 0 120 32" fill="none" aria-label="Stellar" role="img">
      <title>Stellar</title>
      {/* Stellar icon — stylised star/diamond mark */}
      <path
        d="M4 16 L10 10 L16 16 L10 22 Z"
        fill="#fff"
        opacity="0.9"
      />
      <path
        d="M10 16 L16 10 L22 16 L16 22 Z"
        fill="#fff"
        opacity="0.5"
      />
      <text x="28" y="22" fontSize="16" fontWeight="700" fill="white" fontFamily="Inter, sans-serif" opacity="0.9">
        Stellar
      </text>
    </svg>
  );
}

function SorobanLogo() {
  return (
    <svg width="128" height="32" viewBox="0 0 128 32" fill="none" aria-label="Soroban" role="img">
      <title>Soroban</title>
      <rect x="2" y="8" width="18" height="16" rx="3" stroke="white" strokeWidth="1.5" opacity="0.8" />
      <path d="M7 16h8M7 12h4M7 20h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <text x="26" y="22" fontSize="16" fontWeight="700" fill="white" fontFamily="Inter, sans-serif" opacity="0.9">
        Soroban
      </text>
    </svg>
  );
}

function USDCLogo() {
  return (
    <svg width="88" height="32" viewBox="0 0 88 32" fill="none" aria-label="USDC" role="img">
      <title>USDC</title>
      <circle cx="16" cy="16" r="13" fill="#2775CA" />
      <path
        d="M16 6C10.48 6 6 10.48 6 16s4.48 10 10 10 10-4.48 10-10S21.52 6 16 6zm1 16.93V24h-2v-1.07C12.17 22.53 10 20.89 10 18h2c0 1.65 1.57 3 4 3s4-1.35 4-3c0-1.55-1.02-2.63-3-3.18l-3-.79C12.12 13.53 11 12 11 10c0-2.42 1.72-4.17 4-4.73V4h2v1.27C19.62 5.79 21 7.37 21 10h-2c0-1.65-1.34-3-3-3s-3 1.35-3 3c0 1.38.84 2.34 2.56 2.82l2.95.78C21.07 14.14 22 16 22 18c0 2.43-1.72 4.18-5 4.73z"
        fill="white"
      />
      <text x="36" y="22" fontSize="16" fontWeight="700" fill="white" fontFamily="Inter, sans-serif" opacity="0.9">
        USDC
      </text>
    </svg>
  );
}

function FreighterLogo() {
  return (
    <svg width="132" height="32" viewBox="0 0 132 32" fill="none" aria-label="Freighter" role="img">
      <title>Freighter</title>
      {/* Rocket/freighter simplified mark */}
      <path
        d="M16 4 C20 4 24 8 24 14 L24 20 L16 28 L8 20 L8 14 C8 8 12 4 16 4Z"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        opacity="0.85"
      />
      <path d="M13 20 L16 28 L19 20" stroke="white" strokeWidth="1.5" strokeLinejoin="round" opacity="0.6" />
      <circle cx="16" cy="14" r="3" fill="white" opacity="0.7" />
      <text x="30" y="22" fontSize="16" fontWeight="700" fill="white" fontFamily="Inter, sans-serif" opacity="0.9">
        Freighter
      </text>
    </svg>
  );
}

const partners = [
  { id: "stellar", Logo: StellarLogo },
  { id: "soroban", Logo: SorobanLogo },
  { id: "usdc", Logo: USDCLogo },
  { id: "freighter", Logo: FreighterLogo },
];

export default function EcosystemStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="ecosystem"
      ref={ref}
      className="py-16 border-t border-white/5"
      aria-label="Ecosystem partners"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-xs font-semibold tracking-widest text-white/30 uppercase mb-10"
        >
          Built on the Stellar Ecosystem
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
          {partners.map(({ id, Logo }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="opacity-50 hover:opacity-90 transition-opacity duration-200"
            >
              <Logo />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
