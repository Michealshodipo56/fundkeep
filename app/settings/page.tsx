"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type TabType = "profile" | "security" | "preferences" | "notifications" | "billing" | "apikeys";

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copiedWallet, setCopiedWallet] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  // Form states
  const [currency, setCurrency] = useState("USDC");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [network, setNetwork] = useState("Stellar Testnet");
  const [animations, setAnimations] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  // Edit Profile modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");

  const handleCopyWallet = () => {
    navigator.clipboard?.writeText("GAB3X57J29PQR8LMVW7890STUVWX5Z3K");
    setCopiedWallet(true);
    setTimeout(() => setCopiedWallet(false), 2000);
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

            {/* Active Settings Item */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-red/15 text-white border border-red/30 shadow-[0_0_15px_rgba(224,52,42,0.15)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              Settings
            </div>
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
        {/* TOP HEADER */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Settings
            </h1>
            <p className="text-xs sm:text-sm text-white/50 mt-0.5 font-medium">
              Manage your account, preferences, and security.
            </p>
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

        {/* SUB-TABS BAR */}
        <div className="flex items-center gap-6 border-b border-white/10 overflow-x-auto scrollbar-none pb-2 text-xs font-semibold">
          {[
            { id: "profile", label: "Profile" },
            { id: "security", label: "Security" },
            { id: "preferences", label: "Preferences" },
            { id: "notifications", label: "Notifications" },
            { id: "billing", label: "Billing" },
            { id: "apikeys", label: "API Keys" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`pb-2 whitespace-nowrap transition-all relative ${
                activeTab === tab.id
                  ? "text-white font-bold"
                  : "text-white/40 hover:text-white/80"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-red rounded-full shadow-[0_0_8px_rgba(224,52,42,0.8)]" />
              )}
            </button>
          ))}
        </div>

        {/* TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT 8 COLUMNS: MAIN SETTINGS CARDS */}
          <section className="lg:col-span-8 flex flex-col gap-6">
            {/* CARD 1: PROFILE INFORMATION */}
            <div className="rounded-2xl bg-[#141414] border border-white/10 p-6 flex flex-col gap-6 shadow-xl relative">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight">Profile Information</h2>
                  <p className="text-xs text-white/40 mt-0.5">Update your account details and profile information.</p>
                </div>

                <button
                  onClick={() => setEditModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 hover:text-white text-xs font-semibold transition-all"
                >
                  <span>✏️</span> Edit Profile
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pt-2">
                {/* Avatar with Camera Icon Overlay */}
                <div className="relative group cursor-pointer shrink-0">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red/60 via-red to-[#5a120e] flex items-center justify-center text-white text-2xl font-extrabold shadow-[0_0_25px_rgba(224,52,42,0.4)]">
                    JD
                  </div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-black/80 border border-white/20 flex items-center justify-center text-[10px] text-white/80 group-hover:scale-110 transition-transform">
                    📷
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-center sm:text-left flex-1">
                  <div>
                    <h3 className="text-lg font-bold text-white">{fullName}</h3>
                    <p className="text-xs text-white/40 mt-0.5">{email}</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                    <span className="px-2.5 py-1 rounded-lg bg-black/50 border border-white/10 text-xs font-mono text-white/80 flex items-center gap-1.5">
                      GAB...5Z3K
                      <button onClick={handleCopyWallet} className="hover:text-white">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      </button>
                    </span>

                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                      Testnet
                    </span>
                  </div>
                </div>
              </div>

              {/* Sub-bar: Member Since & Account Type */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 text-xs">
                <div>
                  <p className="text-white/40 text-[11px]">Member Since</p>
                  <p className="font-semibold text-white mt-0.5">Jan 15, 2026</p>
                </div>
                <div>
                  <p className="text-white/40 text-[11px]">Account Type</p>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded text-[11px] font-bold bg-red/20 text-red border border-red/30">
                    Basic
                  </span>
                </div>
              </div>
            </div>

            {/* CARD 2: PREFERENCES */}
            <div className="rounded-2xl bg-[#141414] border border-white/10 p-6 flex flex-col gap-6 shadow-xl">
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">Preferences</h2>
                <p className="text-xs text-white/40 mt-0.5">Customize your experience on LockSave.</p>
              </div>

              <div className="flex flex-col gap-5 text-xs">
                {/* Setting 1: Currency */}
                <div className="flex items-center justify-between gap-4 py-2 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
                      ☺
                    </div>
                    <div>
                      <p className="font-bold text-white">Currency</p>
                      <p className="text-white/40 text-[11px]">Choose your preferred currency for displaying amounts.</p>
                    </div>
                  </div>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="bg-black/60 border border-white/10 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-red"
                  >
                    <option value="USDC">USDC</option>
                    <option value="XLM">XLM</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </div>

                {/* Setting 2: Theme */}
                <div className="flex items-center justify-between gap-4 py-2 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
                      ⚙
                    </div>
                    <div>
                      <p className="font-bold text-white">Theme</p>
                      <p className="text-white/40 text-[11px]">Select your preferred theme for the dashboard.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10">
                    <button
                      onClick={() => setTheme("dark")}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                        theme === "dark"
                          ? "bg-red/20 text-white border border-red/40"
                          : "text-white/40 hover:text-white"
                      }`}
                    >
                      🌙 Dark
                    </button>
                    <button
                      onClick={() => setTheme("light")}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                        theme === "light"
                          ? "bg-red/20 text-white border border-red/40"
                          : "text-white/40 hover:text-white"
                      }`}
                    >
                      ☀️ Light
                    </button>
                  </div>
                </div>

                {/* Setting 3: Default Network */}
                <div className="flex items-center justify-between gap-4 py-2 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
                      🕸
                    </div>
                    <div>
                      <p className="font-bold text-white">Default Network</p>
                      <p className="text-white/40 text-[11px]">Choose the default blockchain network.</p>
                    </div>
                  </div>
                  <select
                    value={network}
                    onChange={(e) => setNetwork(e.target.value)}
                    className="bg-black/60 border border-white/10 text-xs text-white rounded-xl px-3.5 py-2 focus:outline-none focus:border-red"
                  >
                    <option value="Stellar Testnet">Stellar Testnet</option>
                    <option value="Stellar Mainnet">Stellar Mainnet</option>
                  </select>
                </div>

                {/* Setting 4: Animations Switch */}
                <div className="flex items-center justify-between gap-4 py-2 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
                      ⚡
                    </div>
                    <div>
                      <p className="font-bold text-white">Animations</p>
                      <p className="text-white/40 text-[11px]">Enable interface animations and transitions.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setAnimations(!animations)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                      animations ? "bg-red" : "bg-white/10"
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                        animations ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Setting 5: Compact Mode Switch */}
                <div className="flex items-center justify-between gap-4 py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
                      🖥
                    </div>
                    <div>
                      <p className="font-bold text-white">Compact Mode</p>
                      <p className="text-white/40 text-[11px]">Use a more compact layout for more content.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCompactMode(!compactMode)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                      compactMode ? "bg-red" : "bg-white/10"
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                        compactMode ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 3: DANGER ZONE */}
            <div className="rounded-2xl bg-[#141414] border border-white/10 p-6 flex flex-col gap-4 shadow-xl">
              <div>
                <h2 className="text-base font-bold text-red tracking-tight">Danger Zone</h2>
                <p className="text-xs text-white/40 mt-0.5">Irreversible and sensitive actions.</p>
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">
                <div>
                  <p className="text-xs font-bold text-red">Delete Account</p>
                  <p className="text-white/40 text-[11px]">Permanently delete your account and all associated data.</p>
                </div>

                <button className="px-4 py-2 rounded-xl border border-red/40 bg-red/10 hover:bg-red/20 text-red text-xs font-bold transition-all flex items-center gap-1.5">
                  🗑 Delete Account
                </button>
              </div>
            </div>
          </section>

          {/* RIGHT 4 COLUMNS: WIDGETS */}
          <section className="lg:col-span-4 flex flex-col gap-6">
            {/* WIDGET 1: ACCOUNT SUMMARY */}
            <div className="rounded-2xl bg-[#141414] border border-white/10 p-5 flex flex-col gap-4 shadow-xl">
              <div className="flex items-center gap-2 text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                </svg>
                <h3 className="text-base font-bold tracking-tight">Account Summary</h3>
              </div>

              <div className="flex flex-col gap-2.5 text-xs pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-white/40">Total Goals</span>
                  <span className="font-bold text-white">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40">Completed Goals</span>
                  <span className="font-bold text-white">7</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40">Total Saved</span>
                  <span className="font-bold text-white">1,250.00 USDC</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40">Total Locked</span>
                  <span className="font-bold text-white">1,125.00 USDC</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-white/40">Member Since</span>
                  <span className="font-semibold text-white/80">Jan 15, 2026</span>
                </div>
              </div>
            </div>

            {/* WIDGET 2: SECURITY */}
            <div className="rounded-2xl bg-[#141414] border border-white/10 p-5 flex flex-col gap-4 shadow-xl">
              <div>
                <div className="flex items-center gap-2 text-white">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <h3 className="text-base font-bold tracking-tight">Security</h3>
                </div>
                <p className="text-[11px] text-white/40 mt-0.5">Keep your account safe and secure.</p>
              </div>

              <div className="flex flex-col gap-3 text-xs">
                {/* 2FA */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/5 hover:border-white/15 transition-all cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/70">
                      ⏱
                    </div>
                    <div>
                      <p className="font-bold text-white">Two-Factor Authentication</p>
                      <p className="text-[10px] text-white/40">Add an extra layer of security.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-red/20 text-red border border-red/30">
                      Not Enabled
                    </span>
                    <span className="text-white/40 text-xs">›</span>
                  </div>
                </div>

                {/* Change Password */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/5 hover:border-white/15 transition-all cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/70">
                      🔒
                    </div>
                    <div>
                      <p className="font-bold text-white">Change Password</p>
                      <p className="text-[10px] text-white/40">Update your account password.</p>
                    </div>
                  </div>
                  <span className="text-white/40 text-xs">›</span>
                </div>

                {/* Active Sessions */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/5 hover:border-white/15 transition-all cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/70">
                      💻
                    </div>
                    <div>
                      <p className="font-bold text-white">Active Sessions</p>
                      <p className="text-[10px] text-white/40">Manage your active sessions.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      2 Active
                    </span>
                    <span className="text-white/40 text-xs">›</span>
                  </div>
                </div>
              </div>
            </div>

            {/* WIDGET 3: CONNECTED WALLET */}
            <div className="rounded-2xl bg-[#141414] border border-white/10 p-5 flex flex-col gap-4 shadow-xl">
              <div>
                <div className="flex items-center gap-2 text-white">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M16 12h2" />
                  </svg>
                  <h3 className="text-base font-bold tracking-tight">Connected Wallet</h3>
                </div>
                <p className="text-[11px] text-white/40 mt-0.5">Manage your connected wallet.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                    S
                  </div>
                  <div>
                    <p className="text-xs font-mono font-bold text-white">GAB...5Z3K</p>
                    <p className="text-[10px] text-emerald-400 font-medium">● Stellar Testnet</p>
                  </div>
                </div>
                <button onClick={handleCopyWallet} className="text-white/40 hover:text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
              </div>
            </div>

            {/* WIDGET 4: INTEGRATIONS */}
            <div className="rounded-2xl bg-[#141414] border border-white/10 p-5 flex flex-col gap-4 shadow-xl">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Integrations</h3>
                <p className="text-[11px] text-white/40 mt-0.5">Manage third-party integrations.</p>
              </div>

              <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-black/40 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/70">
                    🔌
                  </div>
                  <div>
                    <p className="font-bold text-white">Ledger</p>
                    <p className="text-[10px] text-white/40">Connect your Ledger hardware wallet.</p>
                  </div>
                </div>
                <button className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold">
                  Connect
                </button>
              </div>
            </div>

            {/* WIDGET 5: HELP & SUPPORT */}
            <div className="rounded-2xl bg-[#141414] border border-white/10 p-5 flex flex-col gap-4 shadow-xl">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Help & Support</h3>
                <p className="text-[11px] text-white/40 mt-0.5">Need help? We&apos;re here for you.</p>
              </div>

              <div className="flex flex-col gap-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/5 hover:border-white/15 transition-all cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <span className="text-white/60">📄</span>
                    <div>
                      <p className="font-bold text-white">Documentation</p>
                      <p className="text-[10px] text-white/40">Browse our guides and FAQs.</p>
                    </div>
                  </div>
                  <span className="text-white/40 text-xs">›</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/5 hover:border-white/15 transition-all cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <span className="text-white/60">💬</span>
                    <div>
                      <p className="font-bold text-white">Contact Support</p>
                      <p className="text-[10px] text-white/40">Get help from our support team.</p>
                    </div>
                  </div>
                  <span className="text-white/40 text-xs">›</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <footer className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/40">
          <p>FundKeep © 2026. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </footer>
      </main>

      {/* EDIT PROFILE MODAL */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setEditModalOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-md bg-[#141414] border border-white/10 rounded-2xl p-6 shadow-2xl z-10"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Edit Profile</h2>
              <button
                onClick={() => setEditModalOpen(false)}
                className="text-white/40 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4 text-xs">
              <div>
                <label className="block text-white/70 mb-1 font-semibold">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-red"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-semibold">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-red"
                />
              </div>

              <button
                onClick={() => setEditModalOpen(false)}
                className="w-full py-3 rounded-xl bg-red text-white font-bold hover:opacity-90 transition-all mt-2"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
