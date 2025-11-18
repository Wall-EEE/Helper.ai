"use client";


import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function CreateAgent() {
const [name, setName] = useState("");
const [texts, setTexts] = useState([]);
const [selectedText, setSelectedText] = useState("");
const [customPrompt, setCustomPrompt] = useState("");


useEffect(() => {
fetch("/api/texts")
.then((r) => r.json())
.then((json) => setTexts(json.data || []));
}, []);


async function createAgent() {
const base_prompt = selectedText || customPrompt;


await fetch("/api/agents", {
method: "POST",
body: JSON.stringify({ name, base_prompt }),
});


window.location.href = "/agents";
}


return (
<div className="p-8 flex justify-center">
<Card className="max-w-xl w-full">
<CardHeader>
<CardTitle>Create New Agent</CardTitle>
</CardHeader>
<CardContent className="space-y-4">
<Input
placeholder="Agent name"
value={name}
onChange={(e) => setName(e.target.value)}
/>


<p className="text-sm font-medium">Choose a Saved Prompt</p>
<select
className="w-full border rounded p-2"
onChange={(e) => setSelectedText(e.target.value)}
>
<option value="">None</option>
{texts.map((t: any) => (
<option key={t.id} value={t.content}>
{t.title || "Untitled"}
</option>
))}
</select>


<p className="text-sm text-muted-foreground text-center">— OR —</p>


<Textarea
placeholder="Write a custom base prompt"
value={customPrompt}
onChange={(e) => setCustomPrompt(e.target.value)}
/>


<Button onClick={createAgent} className="w-full">Create Agent</Button>
</CardContent>
</Card>
</div>
);
}