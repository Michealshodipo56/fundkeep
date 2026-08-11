"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface GoalOption {
  id: string;
  name: string;
  saved: number;
  target: number;
  status: "LOCKED" | "UNLOCKED";
  deadline: string;
}

const goalsList: GoalOption[] = [
  {
    id: "1",
    name: "Buy a New Laptop",
    saved: 1250.0,
    target: 1500.0,
    status: "LOCKED",
    deadline: "Dec 30, 2026",
  },
  {
    id: "2",
    name: "New Camera Gear",
    saved: 450.0,
    target: 800.0,
    status: "LOCKED",
    deadline: "Sep 15, 2026",
  },
  {
    id: "3",
    name: "Trip to Japan",
    saved: 1800.0,
    target: 1800.0,
    status: "UNLOCKED",
    deadline: "May 10, 2026",
  },
];

export default function DepositPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copiedWallet, setCopiedWallet] = useState(false);

  // Form state
  const [selectedGoalId, setSelectedGoalId] = useState("1");
  const [depositAmount, setDepositAmount] = useState("250.00");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [depositSuccess, setDepositSuccess] = useState(false);

  const selectedGoal = goalsList.find((g) => g.id === selectedGoalId) || goalsList[0];
  const availableBalance = 2345.67;

  const currentPercent = Math.min(100, Math.round((selectedGoal.saved / selectedGoal.target) * 100));
  const amountNum = parseFloat(depositAmount || "0");
  const newSaved = selectedGoal.saved + amountNum;
  const newPercent = Math.min(100, Math.round((newSaved / selectedGoal.target) * 100));

  const handleCopyWallet = () => {
    navigator.clipboard?.writeText("GAB3X57J29PQR8LMVW7890STUVWX5Z3K");
    setCopiedWallet(true);
    setTimeout(() => setCopiedWallet(false), 2000);
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amountNum || amountNum <= 0) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setDepositSuccess(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col md:flex-row selection:bg-red selection:text-white font-sans">
      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center justify-between px-4 h-16 bg-[#111] border-b border-white/10 sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#181818] border border-red/40 flex items-center justify-center glow-red-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C9.24 2 7 4.24 7 7v1H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V7c0-2.76-2.24-5-5-5zm0 2a3 3 0 0 1 3 3v1H9V7a3 3 0 0 1 3-3zm0 9a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
                fill="#e0342a"
              />
            </svg>
          </div>
          <span className="text-lg font-bold">
            Fund<span className="text-red">Keep</span>
          </span>
        </Link>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg border border-white/10 text-white/70 hover:text-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {sidebarOpen ? (
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* LEFT SIDEBAR NAVIGATION */}
      <aside
        className={`fixed md:sticky top-0 inset-y-0 left-0 z-50 w-64 bg-[#111111] border-r border-white/10 flex flex-col justify-between p-5 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } h-screen`}
      >
        <div className="flex flex-col gap-8">
          <Link href="/" className="flex items-center gap-2.5 px-2">
            <div className="w-9 h-9 rounded-xl bg-[#181818] border border-red/40 flex items-center justify-center glow-red-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C9.24 2 7 4.24 7 7v1H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V7c0-2.76-2.24-5-5-5zm0 2a3 3 0 0 1 3 3v1H9V7a3 3 0 0 1 3-3zm0 9a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
                  fill="#e0342a"
                />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">
              Fund<span className="text-red">Keep</span>
            </span>
          </Link>

          <nav className="flex flex-col gap-1.5" aria-label="Sidebar navigation">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1.5" strokeLinecap="round" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" strokeLinecap="round" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" strokeLinecap="round" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" strokeLinecap="round" />
              </svg>
              Dashboard
            </Link>

            <Link
              href="/goals"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              </svg>
              My Goals
            </Link>

            {/* Active Deposit Item */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-red/15 text-white border border-red/30 shadow-[0_0_15px_rgba(224,52,42,0.15)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M16 12h2" strokeLinecap="round" />
              </svg>
              Deposit
            </div>

            <Link
              href="/activity"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" />
              </svg>
              Activity
            </Link>

            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Analytics
            </Link>

            <Link
              href="/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              Settings
            </Link>
          </nav>
        </div>

        {/* Bottom Sidebar Widgets */}
        <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
          <div className="p-3.5 rounded-2xl bg-[#161616] border border-white/10">
            <p className="text-[11px] font-semibold text-white/50 mb-1">Connected Wallet</p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white tracking-wide">
                GAB...5Z3K
              </span>
              <button
                onClick={handleCopyWallet}
                className="p-1 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                title="Copy Address"
              >
                {copiedWallet ? (
                  <span className="text-[10px] text-emerald-400 font-sans">Copied!</span>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" strokeLinecap="round" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeLinecap="round" />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-[10px] text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Testnet
            </div>
          </div>

          <Link
            href="/auth"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl border border-red/30 bg-red/10 hover:bg-red/20 text-red text-xs font-semibold transition-colors"
          >
            <span>Disconnect</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" />
              <polyline points="16 17 21 12 16 7" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round" />
            </svg>
          </Link>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full flex flex-col gap-6">
        {/* HEADER */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="w-10 h-10 rounded-xl bg-[#161616] border border-white/10 hover:border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              title="Back to Dashboard"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Deposit to Goal
              </h1>
              <p className="text-xs sm:text-sm text-white/50 mt-0.5 font-medium">
                Add USDC to your savings goal. Your funds will remain locked until the goal is unlocked.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button className="relative w-10 h-10 rounded-xl bg-[#161616] border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red ring-2 ring-[#161616]" />
            </button>

            <a
              href="#docs"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs sm:text-sm font-semibold transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              View Docs
            </a>
          </div>
        </header>

        {/* TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT 7 COLUMNS: DEPOSIT FORM */}
          <section className="lg:col-span-7 rounded-2xl bg-[#141414] border border-white/10 p-6 sm:p-8 flex flex-col gap-8 shadow-xl">
            <form onSubmit={handleDepositSubmit} className="flex flex-col gap-8">
              {/* STEP 1: SELECT GOAL */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-red text-white flex items-center justify-center text-xs font-extrabold shrink-0">
                    1
                  </span>
                  <div>
                    <h2 className="text-base font-bold text-white tracking-tight">Select Goal</h2>
                    <p className="text-xs text-white/40">Choose the goal you want to deposit to.</p>
                  </div>
                </div>

                <div className="pl-10">
                  <select
                    value={selectedGoalId}
                    onChange={(e) => setSelectedGoalId(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all cursor-pointer"
                  >
                    {goalsList.map((g) => (
                      <option key={g.id} value={g.id} className="bg-[#141414] text-white">
                        {g.name} ({g.status}) — {g.saved.toLocaleString("en-US")} / {g.target.toLocaleString("en-US")} USDC
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/5" />

              {/* STEP 2: DEPOSIT AMOUNT */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-red text-white flex items-center justify-center text-xs font-extrabold shrink-0">
                    2
                  </span>
                  <div>
                    <h2 className="text-base font-bold text-white tracking-tight">Deposit Amount</h2>
                    <p className="text-xs text-white/40">Enter the amount of USDC you want to deposit.</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pl-10">
                  <div className="flex items-center gap-2">
                    {/* Token Pill Badge */}
                    <div className="flex items-center gap-2 px-3.5 py-3 rounded-xl bg-black/60 border border-white/10 text-sm font-bold text-white shrink-0">
                      <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">
                        $
                      </span>
                      <span>USDC</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>

                    {/* Amount Input */}
                    <div className="relative flex-1">
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all font-mono font-bold pr-14"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-white/30 pointer-events-none">
                        USDC
                      </span>
                    </div>
                  </div>

                  {/* Balance Line & Quick Preset Buttons */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-white/40">
                      Available Balance: <strong className="text-white font-mono">{availableBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })} USDC</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setDepositAmount(availableBalance.toString())}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 hover:border-red/40 hover:bg-red/10 text-red font-bold text-[11px] transition-all"
                    >
                      Max
                    </button>
                  </div>

                  {/* Preset Pills Row */}
                  <div className="grid grid-cols-5 gap-2 mt-1">
                    {["50", "100", "250", "500"].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setDepositAmount(val)}
                        className={`py-2 rounded-xl border text-xs font-semibold transition-all ${
                          depositAmount === val
                            ? "bg-red/20 border-red text-white shadow-[0_0_12px_rgba(224,52,42,0.2)]"
                            : "bg-black/40 border-white/10 text-white/60 hover:border-white/20"
                        }`}
                      >
                        + {val} USDC
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setDepositAmount((selectedGoal.target - selectedGoal.saved).toString())}
                      className="py-2 rounded-xl border border-white/10 bg-black/40 text-white/60 hover:border-white/20 text-xs font-semibold"
                    >
                      Max Goal
                    </button>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/5" />

              {/* STEP 3: REVIEW DEPOSIT */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-red text-white flex items-center justify-center text-xs font-extrabold shrink-0">
                    3
                  </span>
                  <div>
                    <h2 className="text-base font-bold text-white tracking-tight">Review Deposit</h2>
                    <p className="text-xs text-white/40">Review the details before confirming your deposit.</p>
                  </div>
                </div>

                <div className="pl-10 flex flex-col gap-3">
                  <div className="p-4 rounded-xl bg-black/60 border border-white/5 flex flex-col gap-2.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-white/40">Goal</span>
                      <span className="font-bold text-white">{selectedGoal.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Current Progress</span>
                      <span className="font-mono text-white/80">
                        {selectedGoal.saved.toLocaleString("en-US", { minimumFractionDigits: 2 })} / {selectedGoal.target.toLocaleString("en-US", { minimumFractionDigits: 2 })} USDC ({currentPercent}%)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Deposit Amount</span>
                      <span className="font-bold text-white">{amountNum.toLocaleString("en-US", { minimumFractionDigits: 2 })} USDC</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-white/5">
                      <span className="text-white/40">New Progress</span>
                      <span className="font-bold font-mono text-emerald-400">
                        {newSaved.toLocaleString("en-US", { minimumFractionDigits: 2 })} / {selectedGoal.target.toLocaleString("en-US", { minimumFractionDigits: 2 })} USDC ({newPercent}%)
                      </span>
                    </div>
                    <div className="flex justify-between pt-1 text-white/40">
                      <span className="flex items-center gap-1">Network Fee (Est.) ⓘ</span>
                      <span className="font-mono">~0.0001 XLM</span>
                    </div>
                  </div>

                  {/* Submit Action Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-red text-white text-sm font-bold transition-all hover:opacity-95 hover:shadow-[0_0_30px_rgba(224,52,42,0.6)] glow-red flex items-center justify-center gap-2 group min-h-[54px] mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>Processing Deposit...</span>
                      </>
                    ) : (
                      <>
                        <span>Deposit {depositAmount ? `${parseFloat(depositAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })} USDC` : "0.00 USDC"}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-white/40 text-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e0342a" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>Your funds are secured by a Soroban smart contract on Stellar.</span>
                  </div>

                  {depositSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center text-xs text-emerald-400 font-semibold"
                    >
                      ✓ Deposit of {depositAmount} USDC successful! Smart contract state updated.
                    </motion.div>
                  )}
                </div>
              </div>
            </form>
          </section>

          {/* RIGHT 5 COLUMNS: GOAL OVERVIEW & EXPLANATION WIDGETS */}
          <section className="lg:col-span-5 flex flex-col gap-6">
            {/* GOAL OVERVIEW CARD */}
            <div className="rounded-2xl bg-[#141414] border border-white/10 p-6 flex flex-col gap-4 shadow-xl">
              <h3 className="text-base font-bold text-white tracking-tight">Goal Overview</h3>

              <div className="flex items-center justify-between gap-4 py-2">
                {/* Circular Donut Ring Chart */}
                <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                  <svg width="144" height="144" viewBox="0 0 144 144" className="-rotate-90">
                    <circle cx="72" cy="72" r="56" stroke="rgba(255,255,255,0.06)" strokeWidth="12" fill="none" />
                    <motion.circle
                      cx="72"
                      cy="72"
                      r="56"
                      stroke="#e0342a"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={351}
                      initial={{ strokeDashoffset: 351 }}
                      animate={{ strokeDashoffset: 351 * (1 - currentPercent / 100) }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-extrabold text-white">{currentPercent}%</span>
                    <span className="text-[10px] text-white/40 font-medium">Progress</span>
                  </div>
                </div>

                {/* Right Details */}
                <div className="flex flex-col gap-2 flex-1 text-xs">
                  <div>
                    <p className="text-sm font-bold text-white">
                      {selectedGoal.saved.toLocaleString("en-US", { minimumFractionDigits: 2 })} USDC
                    </p>
                    <p className="text-[10px] text-white/40">Saved</p>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white">
                      {selectedGoal.target.toLocaleString("en-US", { minimumFractionDigits: 2 })} USDC
                    </p>
                    <p className="text-[10px] text-white/40">Target</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white/80">{selectedGoal.deadline}</p>
                    <p className="text-[10px] text-white/40">Deadline</p>
                  </div>

                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red/20 text-red border border-red/30 inline-flex items-center gap-1">
                      🔒 {selectedGoal.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* HOW IT WORKS WIDGET */}
            <div className="rounded-2xl bg-[#141414] border border-white/10 p-6 flex flex-col gap-4 shadow-xl">
              <h3 className="text-base font-bold text-white tracking-tight">How It Works</h3>

              <div className="flex flex-col gap-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red/10 border border-red/30 flex items-center justify-center text-red shrink-0 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M19 12l-7 7-7-7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-white">You Deposit</p>
                    <p className="text-white/40 text-[11px] leading-relaxed">
                      Deposit USDC to your goal whenever you want.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red/10 border border-red/30 flex items-center justify-center text-red shrink-0 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-white">Funds Are Locked</p>
                    <p className="text-white/40 text-[11px] leading-relaxed">
                      The smart contract holds your funds safely until the goal is unlocked.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red/10 border border-red/30 flex items-center justify-center text-red shrink-0 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-white">Goal Unlocks</p>
                    <p className="text-white/40 text-[11px] leading-relaxed">
                      Once the target is reached or the deadline passes, you can withdraw.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* NEED USDC FAUCET CARD */}
            <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">
                  $
                </div>
                <div>
                  <p className="font-bold text-white">Need USDC?</p>
                  <a
                    href="https://faucet.circle.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red hover:underline text-[11px] flex items-center gap-1 font-medium"
                  >
                    Get testnet USDC from Circle Faucet ↗
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
