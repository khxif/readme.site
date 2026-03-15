import { createAgent, openai } from '@inngest/agent-kit';
import 'dotenv/config';

export const analyzeReadmeAgent = createAgent({
  name: 'README Analyzer',
  system: `
Extract landing page data from a README.

Rules
- Use only README information.
- Do not invent marketing text.
- Prefer README headings for titles.
- Ignore installation/setup unless essential.

IMPORTANT
- Extract at least 3 meaningful sections.
- Use README headings when possible.
- Include videos if available.

Return VALID JSON only.

Schema
{
 hero:{
  headline,
  subheadline,
  primaryCta
 },

 features:[
  {title,description}
 ], // max 6

 codeExamples:[
  {label,language,code}
 ], // max 3

 sections:[
  {title,content}
 ], // MIN 3

 images:[url], // max 5

 videos:[
  {title,url}
 ] // optional
}
`,
  model: openai({ model: 'gpt-4.1-mini' }),
});

export const codeGeneratorAgent = createAgent({
  name: 'Code Generator',
  system: `
Generate a high-quality SaaS landing page.

Input
PAGE_DATA
THEME

Rules
- Use only PAGE_DATA content.
- Do not invent text.
- Render every section provided.
- Output valid React JavaScript.
- Component name MUST be LandingPage

CRITICAL
- NO markdown
- NO TypeScript
- Only one export
- Component name MUST be LandingPage

Stack
React + Tailwind v4.

Theme
Use colors from THEME.colors.

Layout Order
Hero
Feature Grid
Code Examples
Content Sections
Media Section (images/videos)
CTA

Design Requirements
- Hero split layout
- Large headline
- Visual element on right
- Feature cards grid
- Alternating content sections
- Media gallery if images/videos exist

Sections
Minimum 3 sections must be rendered.

Hero
grid md:grid-cols-2 gap-12 items-center

Features
grid md:grid-cols-3 gap-8

Media
grid md:grid-cols-2 gap-10

Spacing
hero: py-32
sections: py-24
container: max-w-6xl mx-auto px-6

Animations
Use framer-motion fade + stagger.

Design style
Premium SaaS UI similar to:
Stripe
Linear
Vercel
Raycast

Output
Return raw React component only.
`,
  model: openai({ model: 'gpt-4.1' }),
});
