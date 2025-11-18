'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AgentChat({ params }: { params: { id: string } }) {
  const { id } = params;
  const [agent, setAgent] = useState<any>(null);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch agent + conversation history
  useEffect(() => {
    async function fetchAgentAndHistory() {
      const agentRes = await fetch(`/api/agents/${id}`);
      const agentJson = await agentRes.json();
      setAgent(agentJson.data);

      const convRes = await fetch(`/api/conversations?agentId=${id}`);
      const convJson = await convRes.json();
      setMessages(convJson.data || []);
    }
    fetchAgentAndHistory();
  }, [id]);

  async function sendMessage() {
    if (!input.trim()) return;
    const userMsg = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        body: JSON.stringify({ agentId: id, message: userMsg.content })
      });
      const json = await res.json();
      const aiMsg = { role: 'assistant' as const, content: json.reply || '' };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const aiMsg = { role: 'assistant' as const, content: 'Error: could not get AI response.' };
      setMessages(prev => [...prev, aiMsg]);
    } finally {
      setLoading(false);
    }
  }

  if (!agent) return <div className="p-8">Loading agent...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Chat with {agent.name}</h1>

      <div className="border rounded p-4 h-[400px] overflow-y-auto space-y-3 bg-white">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <span
              className={`inline-block px-3 py-2 rounded-lg ${
                m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {m.content}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <Button onClick={sendMessage} disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </div>
  );
}
