"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type UnlockType = "deadline" | "target";

export default function CreateGoalPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copiedWallet, setCopiedWallet] = useState(false);

  // Form State
  const [goalName, setGoalName] = useState("Buy a New Laptop");
  const [goalDescription, setGoalDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState("1500.00");
  const [unlockCondition, setUnlockCondition] = useState<UnlockType>("deadline");
  const [deadlineDate, setDeadlineDate] = useState("2026-05-30");
  const [deadlineTime, setDeadlineTime] = useState("12:00");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdSuccess, setCreatedSuccess] = useState(false);

  const handleCopyWallet = () => {
    navigator.clipboard?.writeText("GAB3X57J29PQR8LMVW7890STUVWX5Z3K");
    setCopiedWallet(true);
    setTimeout(() => setCopiedWallet(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCreatedSuccess(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col md:flex-row selection:bg-red selection:text-white font-sans">
      {/* ---------------------------------------------------- */}
      {/* MOBILE HEADER */}
      {/* ---------------------------------------------------- */}
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

      {/* ---------------------------------------------------- */}
      {/* LEFT SIDEBAR NAVIGATION */}
      {/* ---------------------------------------------------- */}
      <aside
        className={`fixed md:sticky top-0 inset-y-0 left-0 z-50 w-64 bg-[#111111] border-r border-white/10 flex flex-col justify-between p-5 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } h-screen`}
      >
        <div className="flex flex-col gap-8">
          {/* Logo Brand */}
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

          {/* Nav Items */}
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

            <Link
              href="/deposit"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M16 12h2" strokeLinecap="round" />
              </svg>
              Deposit
            </Link>

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
              href="/dashboard"
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

      {/* Overlay background for mobile sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* ---------------------------------------------------- */}
      {/* MAIN CONTENT AREA */}
      {/* ---------------------------------------------------- */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full flex flex-col gap-6">
        {/* TOP HEADER */}
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
                Create New Goal
              </h1>
              <p className="text-xs sm:text-sm text-white/50 mt-0.5 font-medium">
                Set your savings goal and lock your funds on Stellar.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            {/* Notification Bell */}
            <button className="relative w-10 h-10 rounded-xl bg-[#161616] border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red ring-2 ring-[#161616]" />
            </button>

            {/* View Docs Button */}
            <a
              href="#docs"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs sm:text-sm font-semibold transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              View Docs
            </a>
          </div>
        </header>

        {/* ---------------------------------------------------- */}
        {/* TWO-COLUMN LAYOUT: FORM vs PREVIEW */}
        {/* ---------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT 7 COLUMNS: STEP-BY-STEP FORM */}
          <section className="lg:col-span-7 rounded-2xl bg-[#141414] border border-white/10 p-6 sm:p-8 flex flex-col gap-8 shadow-xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* STEP 1: GOAL DETAILS */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-red text-white flex items-center justify-center text-xs font-extrabold shrink-0">
                    1
                  </span>
                  <div>
                    <h2 className="text-base font-bold text-white tracking-tight">Goal Details</h2>
                    <p className="text-xs text-white/40">What are you saving for?</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 pl-10">
                  {/* Goal Name Input */}
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-2">Goal Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={goalName}
                        onChange={(e) => setGoalName(e.target.value)}
                        placeholder="e.g., Buy a New Laptop"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all pr-10"
                      />
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="4" width="20" height="12" rx="2" />
                          <path d="M2 20h20" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Goal Description (Optional) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-semibold text-white/70">
                        Goal Description <span className="text-white/30 font-normal">(Optional)</span>
                      </label>
                    </div>
                    <div className="relative">
                      <textarea
                        rows={3}
                        maxLength={120}
                        value={goalDescription}
                        onChange={(e) => setGoalDescription(e.target.value)}
                        placeholder="Add a short description about your goal..."
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all resize-none"
                      />
                      <span className="absolute right-3 bottom-3 text-[10px] text-white/30 font-mono">
                        {goalDescription.length}/120
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/5" />

              {/* STEP 2: TARGET AMOUNT */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-red text-white flex items-center justify-center text-xs font-extrabold shrink-0">
                    2
                  </span>
                  <div>
                    <h2 className="text-base font-bold text-white tracking-tight">Target Amount</h2>
                    <p className="text-xs text-white/40">How much do you want to save?</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pl-10">
                  <label className="block text-xs font-semibold text-white/70 mb-1">Amount</label>
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
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={targetAmount}
                      onChange={(e) => setTargetAmount(e.target.value)}
                      placeholder="0.00"
                      className="flex-1 px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all font-mono font-bold"
                    />
                  </div>
                  <p className="text-[11px] text-white/40 mt-1">You can only deposit USDC on Stellar.</p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/5" />

              {/* STEP 3: UNLOCK CONDITION */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-red text-white flex items-center justify-center text-xs font-extrabold shrink-0">
                    3
                  </span>
                  <div>
                    <h2 className="text-base font-bold text-white tracking-tight">Unlock Condition</h2>
                    <p className="text-xs text-white/40">When should your goal unlock?</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 pl-10">
                  {/* Selectable Condition Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Card A: Set a Deadline */}
                    <button
                      type="button"
                      onClick={() => setUnlockCondition("deadline")}
                      className={`p-4 rounded-xl border text-left flex items-start justify-between gap-3 transition-all relative overflow-hidden ${
                        unlockCondition === "deadline"
                          ? "bg-red/10 border-red text-white shadow-[0_0_15px_rgba(224,52,42,0.15)]"
                          : "bg-black/40 border-white/10 text-white/60 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Radio circle */}
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 shrink-0 ${
                          unlockCondition === "deadline" ? "border-red bg-red" : "border-white/30"
                        }`}>
                          {unlockCondition === "deadline" && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Set a Deadline</p>
                          <p className="text-[11px] text-white/40 mt-0.5 leading-snug">
                            Goal unlocks when the deadline has passed.
                          </p>
                        </div>
                      </div>
                      {/* Calendar Icon */}
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={unlockCondition === "deadline" ? "#e0342a" : "currentColor"} strokeWidth="2" className="shrink-0 opacity-70">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </button>

                    {/* Card B: Target Only */}
                    <button
                      type="button"
                      onClick={() => setUnlockCondition("target")}
                      className={`p-4 rounded-xl border text-left flex items-start justify-between gap-3 transition-all relative overflow-hidden ${
                        unlockCondition === "target"
                          ? "bg-red/10 border-red text-white shadow-[0_0_15px_rgba(224,52,42,0.15)]"
                          : "bg-black/40 border-white/10 text-white/60 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 shrink-0 ${
                          unlockCondition === "target" ? "border-red bg-red" : "border-white/30"
                        }`}>
                          {unlockCondition === "target" && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Target Only</p>
                          <p className="text-[11px] text-white/40 mt-0.5 leading-snug">
                            Goal unlocks only when the target amount is reached.
                          </p>
                        </div>
                      </div>
                      {/* Target Icon */}
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={unlockCondition === "target" ? "#e0342a" : "currentColor"} strokeWidth="2" className="shrink-0 opacity-70">
                        <circle cx="12" cy="12" r="9" />
                        <circle cx="12" cy="12" r="4" />
                      </svg>
                    </button>
                  </div>

                  {/* Deadline Date & Time Pickers */}
                  {unlockCondition === "deadline" && (
                    <div className="flex flex-col gap-2 mt-2">
                      <label className="block text-xs font-semibold text-white/70">Deadline Date</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* Date Field */}
                        <div className="sm:col-span-2 relative">
                          <input
                            type="date"
                            value={deadlineDate}
                            onChange={(e) => setDeadlineDate(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all"
                          />
                        </div>

                        {/* Time Field */}
                        <div className="relative">
                          <input
                            type="time"
                            value={deadlineTime}
                            onChange={(e) => setDeadlineTime(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-all"
                          />
                        </div>
                      </div>
                      <p className="text-[11px] text-white/40">Timezone: UTC</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-red text-white text-sm font-bold transition-all hover:opacity-95 hover:shadow-[0_0_30px_rgba(224,52,42,0.6)] glow-red flex items-center justify-center gap-2 group min-h-[54px]"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Locking Funds on Stellar...</span>
                  </>
                ) : (
                  <>
                    <span>Review Goal Details</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>

              {createdSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center text-xs text-emerald-400 font-semibold"
                >
                  ✓ Goal created and locked on Soroban smart contract! Redirecting...
                </motion.div>
              )}
            </form>
          </section>

          {/* RIGHT 5 COLUMNS: LIVE GOAL PREVIEW & CONTRACT SUMMARY */}
          <section className="lg:col-span-5 flex flex-col gap-6">
            {/* GOAL PREVIEW CARD */}
            <div className="rounded-2xl bg-[#141414] border border-white/10 p-6 flex flex-col gap-5 relative overflow-hidden shadow-xl">
              {/* Concentric Futuristic Orbit Graphic Header */}
              <div className="w-full h-36 rounded-xl bg-gradient-to-b from-red/20 via-black/80 to-[#141414] relative flex items-center justify-center overflow-hidden border border-white/5">
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "radial-gradient(ellipse at center, rgba(224,52,42,0.6) 0%, rgba(224,52,42,0.1) 45%, transparent 70%)",
                  }}
                />

                {/* Animated Radial SVG Orbit Rings */}
                <svg width="300" height="120" viewBox="0 0 300 120" className="absolute">
                  <ellipse cx="150" cy="60" rx="120" ry="35" fill="none" stroke="#e0342a" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
                  <ellipse cx="150" cy="60" rx="90" ry="25" fill="none" stroke="#e0342a" strokeWidth="1" opacity="0.6" />
                  <ellipse cx="150" cy="60" rx="60" ry="15" fill="none" stroke="#e0342a" strokeWidth="1.5" opacity="0.8" />
                  <circle cx="150" cy="60" r="4" fill="#e0342a" className="animate-ping" />
                </svg>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Goal Preview</h3>
                <p className="text-xs text-white/40 mt-0.5">Review how your goal will look.</p>
              </div>

              {/* Preview Details Container */}
              <div className="flex flex-col gap-3 p-4 rounded-xl bg-black/50 border border-white/5 text-xs">
                {/* Detail 1 */}
                <div className="flex items-center gap-3 py-2 border-b border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-red/10 border border-red/30 flex items-center justify-center text-red shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="12" rx="2" />
                      <path d="M2 20h20" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 font-medium">Goal Name</p>
                    <p className="text-xs font-bold text-white">{goalName || "Buy a New Laptop"}</p>
                  </div>
                </div>

                {/* Detail 2 */}
                <div className="flex items-center gap-3 py-2 border-b border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-red/10 border border-red/30 flex items-center justify-center text-red shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" />
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 font-medium">Target Amount</p>
                    <p className="text-xs font-bold text-white">
                      {parseFloat(targetAmount || "0").toLocaleString("en-US", { minimumFractionDigits: 2 })} USDC
                    </p>
                  </div>
                </div>

                {/* Detail 3 */}
                <div className="flex items-center gap-3 py-2 border-b border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-red/10 border border-red/30 flex items-center justify-center text-red shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 font-medium">Unlock Condition</p>
                    <p className="text-xs font-bold text-white">
                      {unlockCondition === "deadline"
                        ? `Deadline: ${deadlineDate} at ${deadlineTime} UTC`
                        : "Target Amount Reached"}
                    </p>
                  </div>
                </div>

                {/* Detail 4 */}
                <div className="flex items-center gap-3 py-2">
                  <div className="w-8 h-8 rounded-lg bg-red/10 border border-red/30 flex items-center justify-center text-red shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 font-medium">Network</p>
                    <p className="text-xs font-bold text-white">Stellar Testnet</p>
                  </div>
                </div>
              </div>

              {/* SMART CONTRACT WARNING BANNER */}
              <div className="p-4 rounded-xl bg-red/10 border border-red/30 flex items-start gap-3 text-xs text-white/80">
                <div className="w-5 h-5 rounded-full bg-red/20 text-red flex items-center justify-center shrink-0 font-bold mt-0.5">
                  ⓘ
                </div>
                <p className="text-[11px] leading-relaxed text-white/70">
                  Once created, this goal is locked by a smart contract. You can only withdraw funds when the goal is unlocked.
                </p>
              </div>

              {/* NETWORK FEE FOOTER */}
              <div className="pt-2 flex flex-col gap-1 text-xs">
                <div className="flex items-center justify-between text-white/70">
                  <span className="flex items-center gap-1">
                    Network Fee (Est.)
                    <span className="text-white/40 cursor-pointer" title="Estimated gas fee on Stellar network">
                      ⓘ
                    </span>
                  </span>
                  <span className="font-mono font-bold text-white">~0.0001 XLM</span>
                </div>
                <p className="text-[10px] text-white/40">Very small network fee to create your goal.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
