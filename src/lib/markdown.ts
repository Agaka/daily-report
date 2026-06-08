import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export type BriefingMetadata = {
  title: string;
  date: string;
  slug: string;
  model?: string;
  sources_count?: number;
};

export type Briefing = BriefingMetadata & {
  content: string;
};

export function getBriefingSlugs() {
  if (!fs.existsSync(contentDirectory)) return [];
  return fs.readdirSync(contentDirectory).filter(file => file.endsWith('.md'));
}

export function getBriefingBySlug(slug: string): Briefing | null {
  try {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(contentDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    const { data, content } = matter(fileContents);
    
    // We assume the date is in the frontmatter or filename
    let title = `Briefing — ${data.date || realSlug}`;
    
    // Attempt to extract real title from the first # line if possible
    const titleMatch = content.match(/^#\s+(.*)/m);
    if (titleMatch) {
      title = titleMatch[1];
    }

    // Ensure date is always a string to prevent Next.js serialization errors
    let dateStr = data.date || realSlug.replace('geo_', '');
    if (data.date instanceof Date) {
      dateStr = data.date.toISOString();
    }

    return {
      slug: realSlug,
      title,
      date: dateStr,
      model: data.model,
      sources_count: data.sources_count,
      content,
    };
  } catch (e) {
    console.error('ERROR IN getBriefingBySlug for slug:', slug, e);
    return null;
  }
}

export function getAllBriefings(): BriefingMetadata[] {
  const slugs = getBriefingSlugs();
  const briefings = slugs
    .map((slug) => getBriefingBySlug(slug))
    .filter((b): b is Briefing => b !== null)
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .map(({ content, ...meta }) => meta); // Remove content for listing
    
  return briefings;
}
