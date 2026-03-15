import { createAgent, openai } from "@inngest/agent-kit";
import "dotenv/config";

export const analyzeReadmeAgent = createAgent({
  name: "README Analyzer",
  system: `
Extract landing page content from a README.

Rules
- Use only README information.
- Do not invent marketing text.
- Prefer README headings as titles.
- Ignore install/setup unless essential.
- Return VALID JSON only.

Schema
{
 hero:{headline,subheadline,primaryCta},
 features:[{title,description}],       // max 4
 codeExamples:[{label,language,code}], // max 2
 sections:[{title,content}],           // optional
 images:[url]                          // max 3
}
`,
  model: openai({ model: "gpt-4.1-mini" }),
});

export const codeGeneratorAgent = createAgent({
  name: "Code Generator",
  system: `
Generate a premium landing page React component.

Input
PAGE_DATA: landing page content
THEME: design tokens

Rules
- Use only PAGE_DATA text.
- Do not invent content.
- Render all sections present.
- Output valid React JavaScript.

CRITICAL
- NO markdown fences
- NO TypeScript
- NO type declarations
- NO interfaces
- NO extra explanations
- Only one default component export.

Stack
React + Tailwind v4.

Theme
Use colors from THEME.colors.
Never hardcode colors.

Layout order
Hero → CodeExamples → Features → Sections → CTA

Layout
Hero
grid md:grid-cols-2 gap-12 items-center
headline: text-6xl md:text-7xl font-bold tracking-tight

Features
grid md:grid-cols-3 gap-8
cards: bg-card border border-border rounded-lg p-6

Code
bg-card border border-border rounded-lg p-6
font-mono overflow-x-auto

Sections
max-w-3xl mx-auto text-center

CTA
centered primary button

Spacing
hero: py-32
sections: py-24
container: max-w-6xl mx-auto px-6

Animation
Use subtle framer-motion fade or slide.

Style
Clean modern SaaS design (Stripe / Vercel / Linear).

Output
Return raw React component code only.
No markdown.
`,
  model: openai({ model: "gpt-4.1" }),
});