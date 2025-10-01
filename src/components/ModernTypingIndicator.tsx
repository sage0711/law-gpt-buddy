import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";

const ModernTypingIndicator = () => {
  return (
    <div className="flex w-full mb-8 animate-in fade-in slide-in-from-bottom-3 duration-700">
      {/* Avatar */}
      <div className="flex-shrink-0 mr-4 mt-2">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 border-2 border-emerald-200 shadow-lg flex items-center justify-center">
          <Bot className="h-5 w-5 text-white" />
        </div>
      </div>

      {/* Typing Bubble */}
      <div className="max-w-[85%]">
        <div className="relative rounded-3xl rounded-bl-lg px-6 py-4 shadow-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-gray-200/50 dark:shadow-gray-700/50">
          {/* Typing Animation */}
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium ml-2">
              AI is thinking...
            </span>
          </div>

          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/5 to-blue-500/5 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ModernTypingIndicator;
