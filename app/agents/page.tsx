import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


async function getAgents() {
const res = await fetch("/api/agents", { cache: "no-store" });
const json = await res.json();
return json.data || [];
}


export default async function AgentsPage() {
const agents = await getAgents();


return (
<div className="p-8 space-y-4">
<div className="flex justify-between items-center">
<h1 className="text-2xl font-semibold">Your Agents</h1>
<Button asChild>
<Link href="/agents/new">Create Agent</Link>
</Button>
</div>


<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
{agents.map((agent: any) => (
<Card key={agent.id}>
<CardHeader>
<CardTitle>{agent.name}</CardTitle>
</CardHeader>
<CardContent>
<p className="text-sm text-muted-foreground line-clamp-2">{agent.base_prompt}</p>
<div className="mt-4 flex gap-2">
<Button asChild size="sm">
<Link href={`/agents/${agent.id}`}>Edit</Link>
</Button>
<Button variant="outline" asChild size="sm">
<Link href={`/agents/chat/${agent.id}`}>Chat</Link>
</Button>
</div>
</CardContent>
</Card>
))}
</div>
</div>
);
}