"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { connectFreighter, checkFreighterInstalled } from "./freighter";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SavingsGoal {
  id: string;
  title: string;
  category: "laptop" | "camera" | "travel" | "other";
  deadline: string; // ISO date string "YYYY-MM-DD"
  saved: number;    // USDC amount
  target: number;   // USDC amount
  status: "LOCKED" | "UNLOCKED" | "WITHDRAWN";
  createdAt: string; // ISO timestamp
}

export interface ActivityEntry {
  id: string;
  type: "deposit" | "unlock" | "withdraw" | "create";
  goalId: string;
  goalTitle: string;
  amount?: number;
  timestamp: string; // ISO timestamp
}

export interface WalletContextValue {
  // Wallet
  walletAddress: string | null;
  network: "TESTNET" | "PUBLIC";
  isConnecting: boolean;
  connect: () => Promise<{ success: boolean; error?: string }>;
  disconnect: () => void;
  setNetwork: (n: "TESTNET" | "PUBLIC") => void;

  // Goals
  goals: SavingsGoal[];
  createGoal: (params: {
    title: string;
    category: SavingsGoal["category"];
    target: number;
    deadline: string;
  }) => SavingsGoal;
  depositToGoal: (goalId: string, amount: number) => void;
  withdrawGoal: (goalId: string) => void;
  checkDeadlines: () => void;

  // Activity
  activity: ActivityEntry[];

  // Derived stats
  stats: {
    totalSaved: number;
    activeGoals: number;
    lockedFunds: number;
    completedGoals: number;
    overallPercent: number;
    totalTarget: number;
  };
}

// ─── Default / seed data ──────────────────────────────────────────────────────

const SEED_GOALS: SavingsGoal[] = [
  {
    id: "goal-1",
    title: "Buy a New Laptop",
    category: "laptop",
    deadline: "2026-12-30",
    saved: 1250.0,
    target: 1500.0,
    status: "LOCKED",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "goal-2",
    title: "New Camera Gear",
    category: "camera",
    deadline: "2026-09-15",
    saved: 450.0,
    target: 800.0,
    status: "LOCKED",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "goal-3",
    title: "Trip to Japan",
    category: "travel",
    deadline: "2026-05-10",
    saved: 1800.0,
    target: 1800.0,
    status: "UNLOCKED",
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const SEED_ACTIVITY: ActivityEntry[] = [
  {
    id: "act-1",
    type: "deposit",
    goalId: "goal-1",
    goalTitle: "Buy a New Laptop",
    amount: 200.0,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "act-2",
    type: "deposit",
    goalId: "goal-2",
    goalTitle: "New Camera Gear",
    amount: 150.0,
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "act-3",
    type: "unlock",
    goalId: "goal-3",
    goalTitle: "Trip to Japan",
    amount: 1800.0,
    timestamp: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// ─── Storage helpers ──────────────────────────────────────────────────────────

const STORAGE_KEY_WALLET = "fk_wallet_address";
const STORAGE_KEY_NETWORK = "fk_network";
const STORAGE_KEY_GOALS = "fk_goals";
const STORAGE_KEY_ACTIVITY = "fk_activity";

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

// ─── Context ──────────────────────────────────────────────────────────────────

const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [network, setNetworkState] = useState<"TESTNET" | "PUBLIC">("TESTNET");
  const [isConnecting, setIsConnecting] = useState(false);
  const [goals, setGoals] = useState<SavingsGoal[]>(SEED_GOALS);
  const [activity, setActivity] = useState<ActivityEntry[]>(SEED_ACTIVITY);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const storedWallet = loadFromStorage<string | null>(STORAGE_KEY_WALLET, null);
    const storedNetwork = loadFromStorage<"TESTNET" | "PUBLIC">(STORAGE_KEY_NETWORK, "TESTNET");
    const storedGoals = loadFromStorage<SavingsGoal[]>(STORAGE_KEY_GOALS, SEED_GOALS);
    const storedActivity = loadFromStorage<ActivityEntry[]>(STORAGE_KEY_ACTIVITY, SEED_ACTIVITY);

    setWalletAddress(storedWallet);
    setNetworkState(storedNetwork);
    setGoals(storedGoals);
    setActivity(storedActivity);
    setHydrated(true);
  }, []);

  // Persist goals
  useEffect(() => {
    if (hydrated) saveToStorage(STORAGE_KEY_GOALS, goals);
  }, [goals, hydrated]);

  // Persist activity
  useEffect(() => {
    if (hydrated) saveToStorage(STORAGE_KEY_ACTIVITY, activity);
  }, [activity, hydrated]);

  // ── Wallet actions ────────────────────────────────────────────────────────

  const connect = useCallback(async () => {
    setIsConnecting(true);
    const result = await connectFreighter();

    if (result.success && result.address) {
      setWalletAddress(result.address);
      saveToStorage(STORAGE_KEY_WALLET, result.address);
      setIsConnecting(false);
      return { success: true };
    }

    // Fallback demo mode when Freighter isn't installed
    const isInstalled = await checkFreighterInstalled();
    if (!isInstalled) {
      const demoAddress = "GAK3X57J29PQR8LMVW7890STUVWXNEON789";
      await new Promise((r) => setTimeout(r, 700));
      setWalletAddress(demoAddress);
      saveToStorage(STORAGE_KEY_WALLET, demoAddress);
      setIsConnecting(false);
      return { success: true };
    }

    setIsConnecting(false);
    return { success: false, error: result.error };
  }, []);

  const disconnect = useCallback(() => {
    setWalletAddress(null);
    localStorage.removeItem(STORAGE_KEY_WALLET);
  }, []);

  const setNetwork = useCallback((n: "TESTNET" | "PUBLIC") => {
    setNetworkState(n);
    saveToStorage(STORAGE_KEY_NETWORK, n);
  }, []);

  // ── Goal actions ──────────────────────────────────────────────────────────

  const addActivity = (entry: Omit<ActivityEntry, "id">) => {
    const newEntry: ActivityEntry = { ...entry, id: `act-${Date.now()}` };
    setActivity((prev) => [newEntry, ...prev]);
  };

  const createGoal = useCallback(
    (params: {
      title: string;
      category: SavingsGoal["category"];
      target: number;
      deadline: string;
    }): SavingsGoal => {
      const newGoal: SavingsGoal = {
        id: `goal-${Date.now()}`,
        title: params.title,
        category: params.category,
        deadline: params.deadline,
        saved: 0,
        target: params.target,
        status: "LOCKED",
        createdAt: new Date().toISOString(),
      };

      setGoals((prev) => [newGoal, ...prev]);
      addActivity({
        type: "create",
        goalId: newGoal.id,
        goalTitle: newGoal.title,
        timestamp: new Date().toISOString(),
      });

      return newGoal;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const depositToGoal = useCallback((goalId: string, amount: number) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== goalId) return g;
        const newSaved = Math.min(g.saved + amount, g.target);
        const unlocked = newSaved >= g.target;
        return { ...g, saved: newSaved, status: unlocked ? "UNLOCKED" : g.status };
      })
    );

    const goal = goals.find((g) => g.id === goalId);
    if (goal) {
      addActivity({
        type: "deposit",
        goalId,
        goalTitle: goal.title,
        amount,
        timestamp: new Date().toISOString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goals]);

  const withdrawGoal = useCallback((goalId: string) => {
    const goal = goals.find((g) => g.id === goalId);
    if (!goal || goal.status !== "UNLOCKED") return;

    setGoals((prev) =>
      prev.map((g) =>
        g.id === goalId ? { ...g, status: "WITHDRAWN", saved: 0 } : g
      )
    );

    addActivity({
      type: "withdraw",
      goalId,
      goalTitle: goal.title,
      amount: goal.saved,
      timestamp: new Date().toISOString(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goals]);

  const checkDeadlines = useCallback(() => {
    const now = new Date();
    setGoals((prev) =>
      prev.map((g) => {
        if (g.status !== "LOCKED") return g;
        const deadline = new Date(g.deadline);
        if (deadline <= now) {
          return { ...g, status: "UNLOCKED" };
        }
        return g;
      })
    );
  }, []);

  // ── Derived stats ─────────────────────────────────────────────────────────

  const totalSaved = goals.reduce((sum, g) => sum + g.saved, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.target, 0);
  const activeGoals = goals.filter(
    (g) => g.status === "LOCKED" || g.status === "UNLOCKED"
  ).length;
  const lockedFunds = goals
    .filter((g) => g.status === "LOCKED")
    .reduce((sum, g) => sum + g.saved, 0);
  const completedGoals = goals.filter((g) => g.status === "WITHDRAWN").length;
  const overallPercent = totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0;

  const stats = {
    totalSaved,
    activeGoals,
    lockedFunds,
    completedGoals,
    overallPercent,
    totalTarget,
  };

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        network,
        isConnecting,
        connect,
        disconnect,
        setNetwork,
        goals,
        createGoal,
        depositToGoal,
        withdrawGoal,
        checkDeadlines,
        activity,
        stats,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet(): WalletContextValue {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error("useWallet must be used inside <WalletProvider>");
  }
  return ctx;
}
