import { useState, useEffect, useRef } from 'react';
import { sendMessageAPI, getChatHistoryAPI } from '../../api/chatApi';
import { HiOutlinePaperAirplane } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const ChatPanel = ({ projectId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    getChatHistoryAPI(projectId)
      .then((data) => {
        const formatted = [];
        for (const chat of data.data || []) {
          formatted.push({ role: 'user', content: chat.userMessage, time: chat.createdAt });
          formatted.push({ role: 'assistant', content: chat.assistantMessage, time: chat.createdAt });
        }
        setMessages(formatted);
      })
      .catch(() => {});
  }, [projectId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || sending) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setSending(true);

    try {
      const data = await sendMessageAPI(projectId, userMsg);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.data.assistantMessage },
      ]);
    } catch {
      toast.error('Failed to send message');
      setMessages((prev) => prev.slice(0, -1)); // Remove optimistic user msg
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '500px',
      border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)',
      overflow: 'hidden', background: 'var(--color-surface)',
    }}>
      {/* Messages */}
      <div style={{
        flex: 1, overflow: 'auto', padding: '1rem',
        display: 'flex', flexDirection: 'column', gap: '0.75rem',
      }}>
        {messages.length === 0 && (
          <div style={{
            textAlign: 'center', color: 'var(--color-text-muted)',
            fontSize: '0.85rem', marginTop: '3rem',
          }}>
            Ask anything about your project or generated tests.
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
              padding: '8px 12px',
              borderRadius: msg.role === 'user'
                ? 'var(--radius-md) var(--radius-md) 2px var(--radius-md)'
                : 'var(--radius-md) var(--radius-md) var(--radius-md) 2px',
              background: msg.role === 'user' ? 'var(--color-accent)' : 'var(--color-bg-subtle)',
              color: msg.role === 'user' ? 'var(--color-accent-text)' : 'var(--color-text)',
              fontSize: '0.85rem',
              lineHeight: 1.5,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {msg.content}
          </div>
        ))}
        {sending && (
          <div style={{
            alignSelf: 'flex-start', padding: '8px 12px',
            background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)',
            fontSize: '0.85rem', color: 'var(--color-text-muted)',
          }}>
            Thinking…
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} style={{
        display: 'flex', gap: '8px', padding: '10px 12px',
        borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)',
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your tests…"
          disabled={sending}
          style={{
            flex: 1, padding: '8px 12px', fontSize: '0.85rem',
            border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)',
            background: 'var(--color-bg)', color: 'var(--color-text)', outline: 'none',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--color-text-muted)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
        />
        <button
          type="submit"
          disabled={sending || !input.trim()}
          style={{
            padding: '8px 12px', borderRadius: 'var(--radius-md)',
            background: 'var(--color-accent)', color: 'var(--color-accent-text)',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center',
            opacity: sending || !input.trim() ? 0.5 : 1,
          }}
        >
          <HiOutlinePaperAirplane size={16} />
        </button>
      </form>
    </div>
  );
};

export default ChatPanel;
