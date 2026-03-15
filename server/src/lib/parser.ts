import * as esbuild from 'esbuild';

export function parseGithubUrl(url: string) {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) throw new Error('Invalid GitHub URL');

  return {
    owner: match[1],
    repo: match[2].replace('.git', ''),
  };
}

type ExtractedContent = {
  images: string[];
  videos: string[];
  links: string[];
  headings: string[];
  codeBlocks: string[];
  badges: string[];
  paragraphs: string[];
  tables: string[];
};

export function extractItems(markdown: string): ExtractedContent {
  const images = new Set<string>();
  const videos = new Set<string>();
  const links = new Set<string>();
  const headings = new Set<string>();
  const codeBlocks = new Set<string>();
  const badges = new Set<string>();
  const paragraphs = new Set<string>();
  const tables = new Set<string>();

  // ---------------- TABLES ----------------
  // Markdown tables
  (markdown.match(/\|(.+)\|\n\|([-|\s]+)\|\n([\s\S]*?)(\n\n|$)/g) || []).forEach(t =>
    tables.add(t.trim()),
  );

  // ---------------- IMAGES ----------------
  // Markdown images ![alt](url)
  (markdown.match(/!\[.*?\]\((.*?)\)/g) || []).forEach(match => {
    const url = match.match(/\((.*?)\)/)?.[1];
    if (url) images.add(url);
  });

  // HTML <img>
  (markdown.match(/<img[^>]+src="([^"]+)"/gi) || []).forEach(tag => {
    const url = tag.match(/src="([^"]+)"/i)?.[1];
    if (url) images.add(url);
  });

  // ---------------- VIDEOS ----------------
  (markdown.match(/<video[^>]+src="([^"]+)"/gi) || []).forEach(tag => {
    const url = tag.match(/src="([^"]+)"/i)?.[1];
    if (url) videos.add(url);
  });

  // YouTube / iframe embeds
  (markdown.match(/<iframe[^>]+src="([^"]+)"/gi) || []).forEach(tag => {
    const url = tag.match(/src="([^"]+)"/i)?.[1];
    if (url) videos.add(url);
  });

  // ---------------- LINKS ----------------
  (markdown.match(/\[.*?\]\((.*?)\)/g) || []).forEach(match => {
    const url = match.match(/\((.*?)\)/)?.[1];
    if (url) links.add(url);
  });

  // ---------------- HEADINGS ----------------
  (markdown.match(/^#{1,6}\s+(.*)/gm) || []).forEach(h => {
    const text = h.replace(/^#{1,6}\s+/, '').trim();
    if (text) headings.add(text);
  });

  // ---------------- CODE BLOCKS ----------------
  (markdown.match(/```[\s\S]*?```/g) || []).forEach(block => {
    codeBlocks.add(block.replace(/```/g, '').trim());
  });

  // ---------------- BADGES ----------------
  // Shields.io or common badge patterns
  (markdown.match(/!\[.*?\]\((https?:\/\/.*?badge.*?\.svg.*?)\)/gi) || []).forEach(match => {
    const url = match.match(/\((.*?)\)/)?.[1];
    if (url) badges.add(url);
  });

  // ---------------- PARAGRAPHS ----------------
  markdown
    .split('\n')
    .map(l => l.trim())
    .filter(
      l =>
        l &&
        !l.startsWith('#') &&
        !l.startsWith('!') &&
        !l.startsWith('[') &&
        !l.startsWith('```') &&
        l.length > 40,
    )
    .forEach(p => paragraphs.add(p));

  return {
    images: [...images],
    videos: [...videos],
    links: [...links],
    headings: [...headings],
    codeBlocks: [...codeBlocks],
    badges: [...badges],
    paragraphs: [...paragraphs],
    tables: [...tables],
  };
}

export function cleanReadme(markdown: string) {
  let cleaned = markdown;

  // Remove badges
  cleaned = cleaned.replace(/!\[.*?badge.*?\]\(.*?\)/gi, '');
  cleaned = cleaned.replace(/shields\.io/gi, '');

  // Remove images
  cleaned = cleaned.replace(/!\[.*?\]\(.*?\)/g, '');

  // Remove HTML media
  cleaned = cleaned.replace(/<img[^>]*>/gi, '');
  cleaned = cleaned.replace(/<video[^>]*>[\s\S]*?<\/video>/gi, '');

  // Remove code blocks (already extracted)
  cleaned = cleaned.replace(/```[\s\S]*?```/g, '');

  // Remove installation/setup sections
  cleaned = cleaned.replace(
    /##?\s*(installation|setup|getting started)[\s\S]*?(?=\n##|\n#|$)/gi,
    '',
  );

  // Remove contributors/license
  cleaned = cleaned.replace(/##?\s*(contributors|license|author)[\s\S]*?(?=\n##|\n#|$)/gi, '');

  // Convert links → text
  cleaned = cleaned.replace(/\[([^\]]+)\]\((.*?)\)/g, '$1');

  // Remove HTML tags
  cleaned = cleaned.replace(/<\/?[^>]+(>|$)/g, '');

  // Remove blockquotes
  cleaned = cleaned.replace(/^>.*$/gm, '');

  // Cleanup spacing
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  return cleaned.trim();
}

export async function compileToJs(code: string) {
  const result = await esbuild.transform(code, {
    loader: 'tsx',
    format: 'esm',
    jsx: 'transform',
    target: 'es2020',
  });

  return result.code;
}

export function createRuntimeHtml(compiledCode: string) {
  const sanitized = compiledCode
    .replace(/import\s+.*?from\s+["'][^"']+["'];?/g, '')
    .replace(/export\s+default\s+/g, '')
    .replace(/export\s+\{[^}]+\};?/g, '');

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />

<script src="https://cdn.tailwindcss.com"></script>

<style>
html,body{
  margin:0;
  padding:0;
  font-family:Inter,system-ui,sans-serif;
}
</style>

</head>

<body>
<div id="root"></div>

<script type="module">

import React from "https://esm.sh/react@18"
import ReactDOM from "https://esm.sh/react-dom@18/client"
import { motion } from "https://esm.sh/framer-motion@10?deps=react@18"

${sanitized}

const root = document.getElementById("root")

ReactDOM.createRoot(root).render(
  React.createElement(LandingPage)
)

</script>

</body>
</html>
`;
}
