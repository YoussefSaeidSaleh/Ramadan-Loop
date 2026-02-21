import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";
interface ReflectionData {
  mood: number; // 0-3
  text: string;
}
interface RamadanContextType {
  completedSteps: string[];
  currentDay: number;
  streak: number;
  reflection: ReflectionData | null;
  completeStep: (id: string) => void;
  resetDay: () => void;
  saveReflection: (data: ReflectionData) => void;
  progress: number;
  isStepCompleted: (id: string) => boolean;
}
const RamadanContext = createContext<RamadanContextType | undefined>(undefined);
const STORAGE_KEY = "ramadan_loop_v2_data";
interface StoredData {
  completedSteps: string[];
  currentDay: number;
  streak: number;
  lastCompletedDate: string | null;
}
export function RamadanProvider({ children }: { children: ReactNode }) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [streak, setStreak] = useState(0);
  const [reflection, setReflection] = useState<ReflectionData | null>(null);
  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: StoredData = JSON.parse(saved);
        setCompletedSteps(parsed.completedSteps || []);
        setCurrentDay(parsed.currentDay || 1);
        setStreak(parsed.streak || 0);
        // Check if it's a new day (simple check)
        const today = new Date().toDateString();
        if (parsed.lastCompletedDate && parsed.lastCompletedDate !== today) {
          // Logic for new day could go here, but for this demo we'll keep state
          // In a real app, we might reset completedSteps if it's a new day
        }
      } catch (e) {
        console.error("Failed to parse ramadan data", e);
      }
    }
  }, []);
  // Save to local storage whenever state changes
  useEffect(() => {
    const data: StoredData = {
      completedSteps,
      currentDay,
      streak,
      lastCompletedDate: new Date().toDateString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [completedSteps, currentDay, streak]);
  const completeStep = React.useCallback((id: string) => {
    setCompletedSteps((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  }, []);

  const isStepCompleted = React.useCallback(
    (id: string) => completedSteps.includes(id),
    [completedSteps],
  );

  const saveReflection = React.useCallback(
    (data: ReflectionData) => {
      setReflection(data);
      completeStep("reflection");
    },
    [completeStep],
  );

  const resetDay = React.useCallback(() => {
    setCompletedSteps([]);
    setCurrentDay((prev) => prev + 1);
    setStreak((prev) => prev + 1);
    setReflection(null);
  }, []);

  const progress = Math.round((completedSteps.length / 5) * 100);

  return (
    <RamadanContext.Provider
      value={{
        completedSteps,
        currentDay,
        streak,
        reflection,
        completeStep,
        resetDay,
        saveReflection,
        progress,
        isStepCompleted,
      }}
    >
      {children}
    </RamadanContext.Provider>
  );
}

export function useRamadan() {
  const context = React.useContext(RamadanContext);
  if (context === undefined) {
    throw new Error("useRamadan must be used within a RamadanProvider");
  }
  return context;
}
