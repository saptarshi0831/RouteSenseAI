import { useEffect, useRef, useState } from "react";

import Card from "../ui/Card";

import { askAI } from "../../api/ai.api";

import {
  SendHorizontal,
  Hospital,
  HeartPulse,
  Car,
  Share2,
  Bot,
  User,
} from "lucide-react";

import "../../styles/ai-chat.css";

// Initial welcome message
const initialMessages = [
  {
    role: "ai",
    text:
      "👋 Hello! I'm RouteSense AI.\n\nI can help you with:\n\n• Nearby Hospitals\n• First Aid\n• Road Accidents\n• SOS Guidance\n• Live Location\n\nHow can I help you today?",
  },
];

function AIChatCard({
  routeSafety,
  destination,
  hospitals,
  warning,
}) {
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] =
    useState(initialMessages);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const suggestions = [
    {
      icon: Hospital,
      label: "Nearby Hospital",
      prompt:
        "Find the nearest hospital to my current location.",
    },
    {
      icon: HeartPulse,
      label: "First Aid",
      prompt:
        "Give first aid instructions for an injured person.",
    },
    {
      icon: Car,
      label: "Road Accident",
      prompt:
        "What should I do after a road accident?",
    },
    {
      icon: Share2,
      label: "Share Location",
      prompt:
        "How can I share my live location?",
    },
  ];

  const sendMessage = async (prompt = message) => {
    if (!prompt.trim()) return;

    const userMessage = {
      role: "user",
      text: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);

    setMessage("");

    setLoading(true);

    try {
      const response = await askAI(prompt, {
        routeStatus: routeSafety?.safe
          ? "Safe"
          : "Affected",

        destination:
          destination?.name ||
          destination?.display_name ||
          "Not Selected",

        hospitalCount:
          hospitals?.length || 0,

        warning:
          warning?.title ||
          warning?.message ||
          "None",
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: response.data,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            error.response?.data?.message ||
            "Unable to contact RouteSense AI.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages(initialMessages);
    setMessage("");
  };

  return (
    <Card
      title="AI Emergency Assistant"
      subtitle="Powered by Gemini AI"
    >
      <div className="ai-card">

        <div className="flex justify-between items-center mb-2">
          <p className="ai-heading">
            Quick Actions
          </p>

          <button
            onClick={clearChat}
            className="text-sm text-red-500 hover:text-red-700 cursor-pointer"
          >
            🗑 Clear Chat
          </button>
        </div>

        <div className="ai-suggestions">
          {suggestions.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className="suggestion-btn"
                onClick={() =>
                  sendMessage(item.prompt)
                }
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="chat-box">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${msg.role}`}
            >
              <div className="chat-avatar">
                {msg.role === "ai" ? (
                  <Bot size={18} />
                ) : (
                  <User size={18} />
                )}
              </div>

              <div className="chat-bubble">
                {msg.text
                  .replace(/\*\*/g, "")
                  .replace(/\*/g, "•")}
              </div>
            </div>
          ))}

          {loading && (
            <div className="chat-message ai">
              <div className="chat-avatar">
                <Bot size={18} />
              </div>

              <div className="chat-bubble thinking">
                RouteSense AI is thinking...
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="ai-input">
          <input
            type="text"
            maxLength={500}
            placeholder="Ask RouteSense AI anything..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !loading
              ) {
                sendMessage();
              }
            }}
          />

          <div className="ai-footer">
            <span>
              {message.length} / 500
            </span>

            <button
              onClick={() =>
                sendMessage()
              }
              disabled={
                loading ||
                !message.trim()
              }
            >
              <SendHorizontal size={18} />

              {loading
                ? "Thinking..."
                : "Send"}
            </button>
          </div>

          <p className="ai-disclaimer">
            AI responses are for guidance only.
            In life-threatening emergencies,
            contact emergency services
            immediately.
          </p>
        </div>
      </div>
    </Card>
  );
}

export default AIChatCard;