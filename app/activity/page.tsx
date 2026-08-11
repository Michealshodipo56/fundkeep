"use client";

import { useState } from "react";
import Link from "next/link";

type TabType = "all" | "deposits" | "withdrawals" | "updates" | "system";

interface TransactionItem {
  id: string;
  type: "deposit" | "withdrawal" | "update" | "locked" | "created" | "system";
  title: string;
  description: string;
  time: string;
  dateGroup: string;
  status?: "Completed";
  amount?: string;
  balance?: string;
  isPositive?: boolean;
}

const transactionsData: TransactionItem[] = [
  {
    id: "1",
    type: "deposit",
    title: "Deposit",
    description: "Added to Buy a New Laptop",
    time: "10:24 AM",
    dateGroup: "Today – May 24, 2026",
    status: "Completed",
    amount: "+250.00 USDC",
    balance: "Balance: 1,250.00 USDC",
    isPositive: true,
  },
  {
    id: "2",
    type: "update",
    title: "Goal Progress Update",
    description: "Buy a New Laptop progress updated",
    time: "10:24 AM",
    dateGroup: "Today – May 24, 2026",
  },
  {
    id: "3",
    type: "deposit",
    title: "Deposit",
    description: "Added to New Camera Gear",
    time: "03:15 PM",
    dateGroup: "May 23, 2026",
    status: "Completed",
    amount: "+150.00 USDC",
    balance: "Balance: 1,000.00 USDC",
    isPositive: true,
  },
  {
    id: "4",
    type: "locked",
    title: "Goal Locked",
    description: "Buy a New Laptop has been locked",
    time: "03:15 PM",
    dateGroup: "May 23, 2026",
  },
  {
    id: "5",
    type: "withdrawal",
    title: "Withdrawal",
    description: "Withdrew from Trip to Japan",
    time: "11:42 AM",
    dateGroup: "May 22, 2026",
    status: "Completed",
    amount: "-200.00 USDC",
    balance: "Balance: 850.00 USDC",
    isPositive: false,
  },
  {
    id: "6",
    type: "deposit",
    title: "Deposit",
    description: "Added to Trip to Japan",
    time: "09:30 AM",
    dateGroup: "May 22, 2026",
    status: "Completed",
    amount: "+300.00 USDC",
    balance: "Balance: 1,050.00 USDC",
    isPositive: true,
  },
  {
    id: "7",
    type: "created",
    title: "Goal Created",
    description: "Created goal Trip to Japan",
    time: "09:29 AM",
    dateGroup: "May 22, 2026",
  },
  {
    id: "8",
    type: "system",
    title: "System Fee",
    description: "Network fee for deposit",
    time: "09:29 AM",
    dateGroup: "May 22, 2026",
    amount: "-0.0001 XLM",
    isPositive: false,
  },
];

export default function ActivityPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copiedWallet, setCopiedWallet] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleCopyWallet = () => {
    navigator.clipboard?.writeText("GAB3X57J29PQR8LMVW7890STUVWX5Z3K");
    setCopiedWallet(true);
    setTimeout(() => setCopiedWallet(false), 2000);
  };

  // Group transactions by dateGroup
  const dateGroups = Array.from(new Set(transactionsData.map((t) => t.dateGroup)));

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
              href="/dashboard"
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
              href="/goals/create"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              <div className="w-5 h-5 rounded-full bg-white/10 text-white/70 flex items-center justify-center text-xs font-bold shrink-0">
                +
              </div>
              Create Goal
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

            {/* Active Activity Item */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-red/15 text-white border border-red/30 shadow-[0_0_15px_rgba(224,52,42,0.15)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" />
              </svg>
              Activity
            </div>

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
              Activity
            </h1>
            <p className="text-xs sm:text-sm text-white/50 mt-0.5 font-medium">
              Track all your transactions and account activity.
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

            {/* Export CSV Button */}
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs sm:text-sm font-semibold transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export CSV
            </button>
          </div>
        </header>

        {/* TWO-COLUMN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT 8 COLUMNS: TIMELINE & TRANSACTIONS */}
          <section className="lg:col-span-8 rounded-2xl bg-[#141414] border border-white/10 p-5 sm:p-6 flex flex-col gap-6 shadow-xl">
            {/* Filter Tabs Bar */}
            <div className="flex items-center gap-6 border-b border-white/10 overflow-x-auto scrollbar-none pb-2 text-xs font-semibold">
              {[
                { id: "all", label: "All Transactions" },
                { id: "deposits", label: "Deposits" },
                { id: "withdrawals", label: "Withdrawals" },
                { id: "updates", label: "Goal Updates" },
                { id: "system", label: "System" },
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

            {/* Search Input & Time Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search transactions..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-red transition-all"
                />
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>

              <select className="w-full sm:w-auto bg-black/50 border border-white/10 text-xs text-white/70 rounded-xl px-3 py-2.5 focus:outline-none focus:border-red">
                <option>All Time</option>
                <option>Past 7 Days</option>
                <option>Past 30 Days</option>
                <option>This Year</option>
              </select>
            </div>

            {/* Grouped Transactions Timeline */}
            <div className="flex flex-col gap-6">
              {dateGroups.map((dateGroup) => {
                const groupItems = transactionsData.filter((t) => t.dateGroup === dateGroup);

                return (
                  <div key={dateGroup} className="flex flex-col gap-2">
                    <p className="text-[11px] font-semibold text-white/40 mb-1">{dateGroup}</p>

                    <div className="flex flex-col gap-2">
                      {groupItems.map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-xl bg-black/40 border border-white/5 hover:border-white/15 transition-all flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            {/* Icon mapping */}
                            <div className="w-9 h-9 rounded-xl bg-red/10 border border-red/30 flex items-center justify-center text-red shrink-0">
                              {item.type === "deposit" && (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M12 5v14M19 12l-7 7-7-7" />
                                </svg>
                              )}
                              {item.type === "withdrawal" && (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M12 19V5M5 12l7-7 7 7" />
                                </svg>
                              )}
                              {(item.type === "update" || item.type === "created") && (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <circle cx="12" cy="12" r="9" />
                                  <circle cx="12" cy="12" r="4" />
                                </svg>
                              )}
                              {item.type === "locked" && (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <rect x="3" y="11" width="18" height="11" rx="2" />
                                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                              )}
                              {item.type === "system" && (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <circle cx="12" cy="12" r="3" />
                                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                </svg>
                              )}
                            </div>

                            <div>
                              <p className="text-xs font-bold text-white">{item.title}</p>
                              <p className="text-[11px] text-white/40">{item.description}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-right">
                            <span className="text-[10px] text-white/30">{item.time}</span>

                            {item.status && (
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-semibold hidden sm:inline-block ${
                                  item.isPositive
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : "bg-red/10 text-red border border-red/20"
                                }`}
                              >
                                {item.status} ✓
                              </span>
                            )}

                            {item.amount && (
                              <div>
                                <p
                                  className={`text-xs font-bold ${
                                    item.isPositive ? "text-emerald-400" : "text-red"
                                  }`}
                                >
                                  {item.amount}
                                </p>
                                {item.balance && (
                                  <p className="text-[10px] text-white/40">{item.balance}</p>
                                )}
                              </div>
                            )}

                            {!item.amount && (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/30">
                                <path d="M9 18l6-6-6-6" />
                              </svg>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs text-white/40">
              <span>Showing 1 to 10 of 42 transactions</span>

              <div className="flex items-center gap-1.5">
                <button className="w-8 h-8 rounded-lg bg-black/50 border border-white/10 hover:border-white/20 flex items-center justify-center text-white/60 hover:text-white">
                  ←
                </button>
                <button
                  onClick={() => setCurrentPage(1)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                    currentPage === 1 ? "bg-red text-white" : "bg-black/50 text-white/60"
                  }`}
                >
                  1
                </button>
                <button
                  onClick={() => setCurrentPage(2)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                    currentPage === 2 ? "bg-red text-white" : "bg-black/50 text-white/60"
                  }`}
                >
                  2
                </button>
                <button
                  onClick={() => setCurrentPage(3)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                    currentPage === 3 ? "bg-red text-white" : "bg-black/50 text-white/60"
                  }`}
                >
                  3
                </button>
                <span className="px-1 text-white/30">...</span>
                <button className="w-8 h-8 rounded-lg bg-black/50 text-white/60 flex items-center justify-center font-bold text-xs">
                  5
                </button>
                <button className="w-8 h-8 rounded-lg bg-black/50 border border-white/10 hover:border-white/20 flex items-center justify-center text-white/60 hover:text-white">
                  →
                </button>
              </div>
            </div>
          </section>

          {/* RIGHT 4 COLUMNS: ACTIVITY OVERVIEW & FILTER TRANSACTIONS */}
          <section className="lg:col-span-4 flex flex-col gap-6">
            {/* WIDGET 1: ACTIVITY OVERVIEW */}
            <div className="rounded-2xl bg-[#141414] border border-white/10 p-5 flex flex-col gap-4 shadow-xl">
              <div className="flex items-center gap-2 text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e0342a" strokeWidth="2">
                  <path d="M2 12h4l3-9 6 17 3-8h4" />
                </svg>
                <h3 className="text-base font-bold tracking-tight">Activity Overview</h3>
              </div>

              <div className="flex flex-col gap-2.5 text-xs pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-white/40">Total Transactions</span>
                  <span className="font-bold text-white">42</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/40">Total Deposits</span>
                  <span className="font-bold text-emerald-400">+2,450.00 USDC</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/40">Total Withdrawals</span>
                  <span className="font-bold text-red">-600.00 USDC</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/40">Network Fees</span>
                  <span className="font-mono text-white/70">-0.0012 XLM</span>
                </div>
              </div>

              {/* Weekly Bar Chart */}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">Activity This Week</span>
                  <span className="font-bold text-emerald-400">+850.00 USDC</span>
                </div>

                <div className="h-20 flex items-end justify-between gap-1.5 pt-2">
                  {[
                    { day: "Mon", height: "40%" },
                    { day: "Tue", height: "70%" },
                    { day: "Wed", height: "50%" },
                    { day: "Thu", height: "30%" },
                    { day: "Fri", height: "90%" },
                    { day: "Sat", height: "45%" },
                    { day: "Sun", height: "60%" },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div
                        style={{ height: bar.height }}
                        className="w-full bg-red rounded-t-sm opacity-90 shadow-[0_0_8px_rgba(224,52,42,0.6)]"
                      />
                      <span className="text-[9px] text-white/30">{bar.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* WIDGET 2: FILTER TRANSACTIONS PANEL */}
            <div className="rounded-2xl bg-[#141414] border border-white/10 p-5 flex flex-col gap-4 shadow-xl">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                  <h3 className="text-base font-bold tracking-tight">Filter Transactions</h3>
                </div>
                <button className="text-xs text-red font-semibold hover:underline">Reset</button>
              </div>

              <div className="flex flex-col gap-3 text-xs">
                <div>
                  <label className="block text-white/50 mb-1 font-medium">Type</label>
                  <select className="w-full bg-black/50 border border-white/10 text-xs text-white/80 rounded-xl px-3 py-2.5 focus:outline-none focus:border-red">
                    <option>All Types</option>
                    <option>Deposits</option>
                    <option>Withdrawals</option>
                    <option>Updates</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/50 mb-1 font-medium">Goal</label>
                  <select className="w-full bg-black/50 border border-white/10 text-xs text-white/80 rounded-xl px-3 py-2.5 focus:outline-none focus:border-red">
                    <option>All Goals</option>
                    <option>Buy a New Laptop</option>
                    <option>New Camera Gear</option>
                    <option>Trip to Japan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/50 mb-1 font-medium">Status</label>
                  <select className="w-full bg-black/50 border border-white/10 text-xs text-white/80 rounded-xl px-3 py-2.5 focus:outline-none focus:border-red">
                    <option>All Status</option>
                    <option>Completed</option>
                    <option>Pending</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/50 mb-1 font-medium">Date Range</label>
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      value="May 1, 2026 – May 24, 2026"
                      className="w-full bg-black/50 border border-white/10 text-xs text-white/80 rounded-xl px-3 py-2.5 focus:outline-none pr-8 cursor-pointer"
                    />
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                    </svg>
                  </div>
                </div>

                <button className="w-full py-3 rounded-xl border border-red/40 bg-red/10 hover:bg-red/20 text-red text-xs font-bold transition-all mt-1 flex items-center justify-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Export Filtered
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
