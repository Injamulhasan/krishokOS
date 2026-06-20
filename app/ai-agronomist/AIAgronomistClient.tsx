"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bot,
  Send,
  Sprout,
  Leaf,
  Droplet,
  Bug,
  DollarSign,
  Loader2,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
}

const mockResponses: Record<string, string> = {
  yellow:
    "Yellow leaves on banana plants can indicate several issues:\n\n**1. Nitrogen Deficiency (Most Common)**\n• Confidence: 72%\n• Apply urea (46-0-0) at 50g per plant\n• Repeat every 3 weeks during growing season\n\n**2. Panama Disease (Fusarium Wilt)**\n• Confidence: 18%\n• Check for brown discoloration inside the stem\n• No chemical cure — remove and destroy infected plants\n\n**3. Overwatering / Root Rot**\n• Confidence: 10%\n• Reduce irrigation frequency\n• Ensure proper drainage\n\n**Recommended Action:** First, apply nitrogen fertilizer and monitor for 7 days. If no improvement, check for Fusarium. Upload a photo to Disease Detection for a more accurate diagnosis.",
  pest: "For pest management using residue-free methods:\n\n**Biological Controls (Safe for Export)**\n• Neem oil spray (5ml/L water) — effective against aphids, whiteflies\n• Trichoderma-based biopesticides for soil pests\n• Release of beneficial insects (ladybugs, predatory mites)\n\n**Physical Controls**\n• Yellow sticky traps for flying insects\n• Pheromone traps for fruit flies\n• Hand-picking for caterpillars\n\n**Monitoring Schedule**\n• Inspect every 3 days during flowering\n• Check undersides of leaves weekly\n\n⚠️ Avoid synthetic pesticides — they will fail export residue tests.",
  fertilizer:
    "**Banana Fertilizer Schedule (Residue-Free)**\n\nWeek 1-4 (Establishment):\n• Compost: 10 kg/plant\n• TSP (18% P): 100g/plant\n\nWeek 5-8 (Vegetative Growth):\n• Urea (46% N): 75g/plant every 3 weeks\n• MoP (60% K): 50g/plant\n\nWeek 9-16 (Flowering):\n• Potassium emphasis: MoP 100g/plant\n• Micronutrients: Boron (borax) 5g/plant\n\n**Organic Alternatives:**\n• Fish meal for nitrogen\n• Bone meal for phosphorus\n• Wood ash for potassium\n\n💡 Always maintain 21-day safety interval before harvest for any input applied.",
  irrigation:
    "**Banana Irrigation Requirements:**\n\n• Water Requirement: 1,800-2,000 mm/year\n• Critical Stages: Flowering and bunch filling\n\n**Drip Irrigation (Recommended for Export Quality):**\n• Daily: 15-20 liters/plant during dry season\n• Reduce by 30% during monsoon\n• Never allow water stress during bunch development\n\n**Weather-Based Adjustment:**\n• Temperature >35°C: Increase by 25%\n• Cloudy days: Reduce by 20%\n• After heavy rain (>30mm): Skip 1-2 days\n\n**Signs of Water Stress:**\n• Leaf rolling (need more water)\n• Yellowing lower leaves (check drainage)",
  default:
    "I'm your AI Agronomist for KrishokOS Bangladesh. I can help you with:\n\n• **Crop Management** — Banana and Papaya cultivation guidance\n• **Disease & Pest Diagnosis** — Identify and treat problems early\n• **Fertilizer Planning** — Optimize nutrient applications\n• **Irrigation Scheduling** — Water management for your crop\n• **Export Compliance** — Residue-free production advice\n\nPlease describe your farming issue or ask a specific question. For visual diagnosis, use the **Disease Detection** tool with a photo.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("yellow") || lower.includes("leaves"))
    return mockResponses.yellow;
  if (
    lower.includes("pest") ||
    lower.includes("insect") ||
    lower.includes("bug")
  )
    return mockResponses.pest;
  if (
    lower.includes("fertilizer") ||
    lower.includes("nutrient") ||
    lower.includes("feed")
  )
    return mockResponses.fertilizer;
  if (lower.includes("water") || lower.includes("irrigat"))
    return mockResponses.irrigation;
  return mockResponses.default;
}

const quickQuestions = [
  { icon: Leaf, text: "My banana leaves are turning yellow" },
  { icon: Bug, text: "How to control pests without chemicals?" },
  { icon: Sprout, text: "Fertilizer schedule for banana" },
  { icon: Droplet, text: "How much water does banana need?" },
  { icon: DollarSign, text: "How to increase my profit per acre?" },
];

interface AIAgronomistClientProps {
  userName: string;
}

export default function AIAgronomistClient({
  userName,
}: AIAgronomistClientProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Assalamu Alaikum! I'm your AI Agronomist. I'm here to help you grow residue-free, export-quality crops. What's on your mind today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const responseText = getResponse(text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: responseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsLoading(false);
    }, 1200);
  };

  // Get user initial for the avatar
  const userInitial = userName ? userName.charAt(0).toUpperCase() : "F";

  const formatText = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p
            key={i}
            className="font-bold text-gray-900 dark:text-gray-100 mt-2"
          >
            {line.slice(2, -2)}
          </p>
        );
      }
      if (line.startsWith("•")) {
        return (
          <p key={i} className="text-gray-700 dark:text-gray-300 ml-3">
            {line}
          </p>
        );
      }
      if (line.startsWith("⚠️") || line.startsWith("💡")) {
        return (
          <p
            key={i}
            className="text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/30 rounded px-2 py-1 mt-1 text-sm"
          >
            {line}
          </p>
        );
      }
      if (line === "") return <div key={i} className="h-1" />;
      return (
        <p key={i} className="text-gray-700 dark:text-gray-300">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#081009] flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-[#121c15] shadow-sm border-b border-gray-200 dark:border-emerald-900/40 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="p-2 hover:bg-gray-100 dark:hover:bg-emerald-900/30 rounded-lg transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 dark:text-white">
              AI Agronomist
            </h1>
            <p className="text-xs text-green-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 dark:bg-emerald-400 rounded-full inline-block"></span>
              Online — Expert farming advice
            </p>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-4 flex flex-col gap-4 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                msg.role === "assistant"
                  ? "bg-gradient-to-br from-violet-500 to-purple-600"
                  : "bg-green-600 dark:bg-emerald-600"
              }`}
            >
              {msg.role === "assistant" ? (
                <Bot className="w-5 h-5 text-white" />
              ) : (
                <span className="text-white text-sm font-bold">
                  {userInitial}
                </span>
              )}
            </div>
            <div
              className={`max-w-xl rounded-2xl px-4 py-3 text-sm space-y-0.5 ${
                msg.role === "assistant"
                  ? "bg-white dark:bg-[#121c15] shadow-sm border border-gray-100 dark:border-emerald-900/40"
                  : "bg-green-600 dark:bg-emerald-600 text-white"
              }`}
            >
              {msg.role === "assistant" ? (
                formatText(msg.text)
              ) : (
                <p>{msg.text}</p>
              )}
              <p
                className={`text-xs mt-2 ${
                  msg.role === "assistant"
                    ? "text-gray-400 dark:text-gray-500"
                    : "text-green-200 dark:text-emerald-200"
                }`}
              >
                {msg.timestamp.toLocaleTimeString("en-BD", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white dark:bg-[#121c15] shadow-sm border border-gray-100 dark:border-emerald-900/40 rounded-2xl px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-purple-500 dark:text-purple-400 animate-spin" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Analyzing your question...
              </span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 pb-4">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 text-center">
            Quick Questions
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {quickQuestions.map((q) => (
              <button
                key={q.text}
                onClick={() => sendMessage(q.text)}
                className="flex items-center gap-2 bg-white dark:bg-[#121c15] border border-gray-200 dark:border-emerald-900/40 text-gray-700 dark:text-gray-300 text-sm px-3 py-2 rounded-full hover:border-green-400 dark:hover:border-emerald-500 hover:text-green-700 dark:hover:text-emerald-400 transition cursor-pointer"
              >
                <q.icon className="w-3.5 h-3.5" />
                {q.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white dark:bg-[#121c15] border-t border-gray-200 dark:border-emerald-900/40 px-4 py-4 transition-colors duration-300">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Ask about your crops, diseases, fertilizers..."
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-emerald-900/40 bg-white dark:bg-[#081009] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent outline-none text-sm transition-colors duration-300"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-xl hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-2">
          AI responses are advisory — consult a local agronomist for critical
          decisions
        </p>
      </div>
    </div>
  );
}
