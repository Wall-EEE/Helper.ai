"use client";


import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export default function AgentChat({ params }: any) {
const { id } = params;
const [agent, setAgent] = useState<any>(null);
const [messages, setMessages] = useState<any[]>([]);
const [input, setInput] = useState("");


useEffect(() => {
fetch(`/api/agents/${id}`)
.then((r) => r.json())
.then((json) => setAgent(json.data));
}, [id]);


async function sendMessage() {
const userMsg = { role: "user", content: input };
setMessages((prev) => [...prev, userMsg]);


const res = await fetch("/api/ai", {
method: "POST",
body: JSON.stringify({ agentId: id, message: input }),
});


const json = await res.json();
const aiMsg = { role: "assistant", content: json.reply };


setMessages((prev) => [...prev, aiMsg]);
setInput("");
}


if (!agent) return <div className="p-8">Loading...</div>;


return (
<div className="p-8 max-w-3xl mx-auto space-y-4">
<h1 className="text-2xl font-semibold">Chat with {agent.name}</h1>


<div className="border rounded p-4 h-[400px] overflow-y-auto space-y-3">
{messages.map((m, i) => (
<div key={i} className={m.role === "user" ? "text-right" : "text-left"}></div>