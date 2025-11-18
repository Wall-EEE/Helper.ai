import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

async function getPrompts() {
  // Use absolute URL for server-side fetch
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/prompts`, { cache: "no-store" });
  const json = await res.json();
  return json.data || [];
}

export default async function PromptsPage() {
  const prompts = await getPrompts();

  return (
    <div className="p-8 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Your Prompts</h1>
        <Button asChild>
          <Link href="/prompts/new">Create Prompt</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prompts.map((prompt: any) => (
          <Card key={prompt.id}>
            <CardHeader>
              <CardTitle>{prompt.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {prompt.start_prompt}
              </p>
              <div className="mt-4 flex gap-2">
                <Button asChild size="sm">
                  <Link href={`/prompts/${prompt.id}`}>Edit</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
