import { useEffect, useMemo, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Send, Loader2 } from "lucide-react";

interface ChatWindowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialQuery?: string;
}

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWindow({ open, onOpenChange, initialQuery }: ChatWindowProps) {
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const hasSentInitial = useRef(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Ensure we only auto-ask once per open
  useEffect(() => {
    if (open) {
      if (initialQuery && !hasSentInitial.current) {
        hasSentInitial.current = true;
        setInput("");
        void sendMessage(initialQuery);
      }
    } else {
      // Reset when closed
      setInput("");
      setMessages([]);
      hasSentInitial.current = false;
    }
  }, [open, initialQuery]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim();
    if (!content) return;

    const newMessages: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("ask-gemini", {
        body: { messages: newMessages },
      });

      if (error) throw error;

      const assistantText = (data as any)?.text ?? "";
      setMessages((prev) => [...prev, { role: "assistant", content: assistantText }]);
    } catch (e: any) {
      console.error("ask-gemini error:", e);
      toast({ title: "Chat error", description: e?.message || "Failed to get response", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="border-b border-border px-4 py-3">
          <DialogTitle className="text-lg">AI Chat</DialogTitle>
        </DialogHeader>
        <div className="h-[65vh] flex flex-col bg-background">
          <ScrollArea className="flex-1 px-4 py-4">
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground text-sm">
                  Ask your startup question to get step-by-step guidance.
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`w-full flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed border border-border shadow-sm ${
                      m.role === "user" ? "bg-primary/10" : "bg-muted"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="w-full flex justify-start">
                  <div className="max-w-[85%] rounded-lg px-3 py-2 text-sm border border-border bg-muted flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>
          <div className="border-t border-border p-3 flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="resize-none"
              rows={2}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (canSend) void sendMessage();
                }
              }}
            />
            <Button onClick={() => sendMessage()} disabled={!canSend}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
