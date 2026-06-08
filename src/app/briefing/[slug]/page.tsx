import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getBriefingBySlug, getBriefingSlugs } from '@/lib/markdown';

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = getBriefingSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ''),
  }));
}

export default function BriefingPage({ params }: { params: { slug: string } }) {
  const briefing = getBriefingBySlug(params.slug);

  if (!briefing) {
    notFound();
  }

  // Fallback to avoid Date object issues during render if any slipped through
  const displayDate = new Date(briefing.date).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="container" style={{ marginTop: '40px', marginBottom: '80px' }}>
      <Link 
        href="/" 
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px',
          color: 'var(--text-muted)',
          marginBottom: '40px',
          fontWeight: 600,
          fontSize: '0.95rem'
        }}
      >
        <ArrowLeft size={18} /> Voltar para o Radar
      </Link>
      
      <article className="glass" style={{ padding: '48px 56px', marginBottom: '80px' }}>
        <header style={{ marginBottom: '48px', borderBottom: '1px solid var(--card-border)', paddingBottom: '32px' }}>
          <div style={{ display: 'flex', gap: '20px', color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.95rem', fontWeight: 500 }}>
            <span style={{ color: 'var(--primary)' }}>{displayDate}</span>
            {briefing.sources_count && <span>• Analisado em {briefing.sources_count} fontes globais</span>}
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--foreground)', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.03em', lineHeight: '1.1' }}>
            {briefing.title}
          </h1>
        </header>

        <div className="prose">
          <ReactMarkdown>{briefing.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
