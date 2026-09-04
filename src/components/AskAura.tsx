import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, ArrowUpRight, ShieldCheck, X } from 'lucide-react';
import { SUGGESTED_PROMPTS, INITIAL_CHAT } from '../lib/aiCompanion';
import { getAuraAIResponse, isAuraAIEnabled } from '../lib/geminiService';
import { ChatMessage } from '../types/database.types';

interface AskAuraProps {
  isDrawer?: boolean;
  onClose?: () => void;
}

export const AskAura: React.FC<AskAuraProps> = ({ isDrawer = false, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendQuery = async (query: string) => {
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      time: 'Now',
    };

    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInputText('');
    setIsTyping(true);

    try {
      const reply = await getAuraAIResponse(nextHistory);
      const aiMsg: ChatMessage = {
        id: `aura-${Date.now()}`,
        sender: 'aura',
        text: reply,
        time: 'Now',
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`content-feed fade-in ${isDrawer ? 'drawer-feed' : ''}`} style={{ maxWidth: 620 }}>
      {isDrawer && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
          <button onClick={onClose} style={{ padding: 6, color: 'var(--text-secondary)' }}>
            <X size={20} />
          </button>
        </div>
      )}

      <div className="section-label" style={{ color: 'var(--accent-terracotta)' }}>YOUR AI COMPANION</div>
      <h1 className="hero-title">Ask Aura<br />anything.</h1>
      <p className="hero-subtitle">
        A thoughtful starting point for training, food, recovery, and the days when your motivation needs a softer voice.
      </p>

      {/* Aura Status Card */}
      <div className="card-elevated" style={{ backgroundColor: '#FCFAF6', border: '1px solid #ECE7DF' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #D75A30, #E5A83B)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF'
          }}>
            <Sparkles size={18} />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>Aura is listening</div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
              {isAuraAIEnabled ? 'AI-POWERED PRACTICE GUIDE' : 'PERSONAL PRACTICE GUIDE'}
            </div>
          </div>
        </div>

        {/* Message Stream */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: '20px 0' }}>
          {messages.map((m) => (
            <div
              key={m.id}
              style={{
                display: 'flex',
                justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '84%',
                  padding: '12px 18px',
                  borderRadius: '18px',
                  fontSize: 14,
                  lineHeight: 1.55,
                  backgroundColor: m.sender === 'user' ? '#FEECE6' : '#FFFFFF',
                  color: m.sender === 'user' ? 'var(--accent-terracotta)' : 'var(--text-primary)',
                  border: m.sender === 'user' ? '1px solid rgba(215,90,48,0.2)' : '1px solid var(--border-card)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                  fontFamily: m.sender === 'user' ? 'var(--font-sans)' : 'var(--font-sans)',
                }}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                padding: '10px 16px',
                borderRadius: '18px',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-card)',
                fontSize: 13,
                color: 'var(--text-muted)'
              }}>
                Aura is considering...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendQuery(inputText);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-full)',
            padding: '6px 8px 6px 18px',
            border: '1px solid var(--border-card)',
            marginTop: 10
          }}
        >
          <input
            type="text"
            placeholder="Tell Aura what's up..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: 14,
              color: 'var(--text-primary)'
            }}
          />
          <button
            type="submit"
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              backgroundColor: inputText.trim() ? 'var(--accent-terracotta)' : 'var(--bg-card-subtle)',
              color: inputText.trim() ? '#FFFFFF' : '#A8A29E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
          >
            <Send size={15} />
          </button>
        </form>
      </div>

      {/* Suggested Prompts ("TRY ASKING") */}
      <div style={{ marginTop: 28 }}>
        <div className="section-label">TRY ASKING</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {SUGGESTED_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendQuery(prompt)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-card)',
                fontSize: 14,
                color: 'var(--text-primary)',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{prompt}</span>
              <ArrowUpRight size={16} color="var(--accent-terracotta)" />
            </button>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 12,
        color: 'var(--text-muted)',
        marginTop: 24,
        padding: '0 4px'
      }}>
        <ShieldCheck size={16} color="#A8A29E" />
        <span>Aura offers guidance, not medical advice. Your care team always comes first.</span>
      </div>
    </div>
  );
};
