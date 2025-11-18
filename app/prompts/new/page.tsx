'use client';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CreatePrompt() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [model, setModel] = useState('gpt-5.1');
  const [reasoning, setReasoning] = useState('{}');
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    setLoading(true);
    try {
      await fetch('/api/prompts', {
        method: 'POST',
        body: JSON.stringify({
          title,
          content,
          model,
          reasoning: JSON.parse(reasoning)
        })
      });
      window.location.href = '/prompts';
    } catch (err) {
      console.error(err);
      alert('Error creating prompt');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 flex justify-center">
      <Card className="max-w-xl w-full">
        <CardHeader>
          <CardTitle>Create Prompt</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea placeholder="Prompt content" value={content} onChange={(e) => setContent(e.target.value)} />
          
          <Input placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} />
          <Textarea 
            placeholder='Reasoning JSON, e.g. {"effort":"none"}' 
            value={reasoning} 
            onChange={(e) => setReasoning(e.target.value)} 
          />
          
          <Button onClick={handleCreate} className="w-full" disabled={loading}>
            {loading ? 'Creating...' : 'Create Prompt'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
