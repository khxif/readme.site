import { parseGithubUrl } from './parser.js';

export async function fetchReadme(githubUrl: string) {
  const { owner, repo } = parseGithubUrl(githubUrl);

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
  });
  const data = await res.json();

  return data;
}
