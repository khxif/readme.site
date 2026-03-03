import { cleanReadme, extractItems } from '../lib/parser.js';
import { analyzeReadmeAgent, codeGeneratorAgent } from './agents.js';
import { inngest } from './client.js';

export const analyzeReadmeFlow = inngest.createFunction(
  { id: 'analyze-readme' },
  { event: 'readme/analyze' },
  async ({ event, step }) => {
    const { cleaned, items } = await step.run('clean-readme', () => {
      const rawReadme = event.data.readme as string;

      const items = extractItems(rawReadme);
      const cleaned = cleanReadme(rawReadme);

      return { cleaned, items };
    });

    const prompt = `README:
${cleaned}

CODE (real usage only, skip install/setup):
${items.codeBlocks?.slice(0, 3).join('\n---\n') || 'none'}

IMAGES: ${items.images.slice(0, 3).join(', ') || 'none'}

Extract hero, features (max 3), codeExamples (max 2). Infer designSystem from domain. JSON only.`;
    const { output } = await analyzeReadmeAgent.run(prompt);

    const lastMessage = output[output.length - 1];
    const content = 'content' in lastMessage ? lastMessage.content : null;

    if (typeof content !== 'string') throw new Error('Invalid response from agent');

    const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || content.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? jsonMatch[1] || jsonMatch[0] : content;

    const uiPrompt = `JSON:
${jsonStr}

IMAGES: ${items.images.slice(0, 3).join(', ') || 'none'}

Render all sections present in JSON (Hero → CodeExamples → Features → CTA). Use designSystem.colors for all styling. Raw TSX only.`;
    const { output: codeOutput } = await codeGeneratorAgent.run(uiPrompt);

    const lastCodeMessage = codeOutput[codeOutput.length - 1];
    const codeContent = 'content' in lastCodeMessage ? lastCodeMessage.content : null;

    if (typeof codeContent !== 'string') throw new Error('Invalid code response');

    console.log(codeContent);

    return { json: JSON.parse(jsonStr), codeContent };
  },
);
