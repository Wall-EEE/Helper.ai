'use client';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Prompt = {
  id: string;
  title: string;
  content: string;
  model: string;
  reasoning: any;
};

export default function CreateAgent({ searchParams }: { searchParams?: { promptId?: string } }) {
  const [name, setName] = useState('');
  const [basePrompt, setBasePrompt] = useState('');
  const [model, setModel] = useState('gpt-5.1');
  const [reasoning, setReasoning] = useState('{}');
  const [loading, setLoading] = useState(false);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  // Fetch user's prompts
  useEffect(() => {
    async function fetchPrompts() {
      const res = await fetch('/api/prompts', { cache: 'no-store' });
      const json = await res.json();
      setPrompts(json.data || []);
    }
    fetchPrompts();
  }, []);

  // Prefill from promptId query param
  useEffect(() => {
    if (searchParams?.promptId && prompts.length > 0) {
      const p = prompts.find(pr => pr.id === searchParams.promptId);
      if (p) {
        setSelectedPrompt(p);
        setBasePrompt(p.content);
        setModel(p.model);
        setReasoning(JSON.stringify(p.reasoning, null, 2));
      }
    }
  }, [searchParams, prompts]);

  async function handleCreate() {
    setLoading(true);
    try {
      await fetch('/api/agents', {
        method: 'POST',
        body: JSON.stringify({
          name,
          base_prompt: basePrompt,
          model,
          reasoning: JSON.parse(reasoning)
        })
      });
      window.location.href = '/agents';
    } catch (err) {
      console.error(err);
      alert('Error creating agent');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 flex justify-center">
      <Card className="max-w-xl w-full space-y-4">
        <CardHeader>
          <CardTitle>Create Agent</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Agent Name" value={name} onChange={e => setName(e.target.value)} />

          <select
            className="w-full p-2 border rounded"
            value={selectedPrompt?.id || ''}
            onChange={e => {
              const p = prompts.find(pr => pr.id === e.target.value);
              if (p) {
                setSelectedPrompt(p);
                setBasePrompt(p.content);
                setModel(p.model);
                setReasoning(JSON.stringify(p.reasoning, null, 2));
              }
            }}
          >
            <option value="">-- Select Prompt --</option>
            {prompts.map(p => (
              <option key={p.id} value={p.id}>{p.title || 'Untitled'}</option>
            ))}
          </select>

          <Textarea
            placeholder="Base Prompt"
            value={basePrompt}
            onChange={e => setBasePrompt(e.target.value)}
          />

          <Input
            placeholder="Model"
            value={model}
            onChange={e => setModel(e.target.value)}
          />

          <Textarea
            placeholder='Reasoning JSON, e.g. {"effort":"none"}'
            value={reasoning}
            onChange={e => setReasoning(e.target.value)}
          />

          <Button onClick={handleCreate} className="w-full" disabled={loading}>
            {loading ? 'Creating...' : 'Create Agent'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
