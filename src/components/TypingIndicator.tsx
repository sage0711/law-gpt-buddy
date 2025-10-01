const TypingIndicator = () => {
  return (
    <div className="flex w-full mb-4 justify-start animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="max-w-[80%] rounded-2xl rounded-bl-md px-4 py-3 bg-card border border-border shadow-sm">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
