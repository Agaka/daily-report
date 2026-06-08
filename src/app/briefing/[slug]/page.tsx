import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getBriefingBySlug, getBriefingSlugs } from '@/lib/markdown';

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

  return (
    <div className="container" style={{ marginTop: '40px' }}>
      <Link 
        href="/" 
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px',
          color: 'var(--text-muted)',
          marginBottom: '32px',
          fontWeight: 500
        }}
      >
        <ArrowLeft size={16} /> Voltar para lista
      </Link>
      
      <article className="glass" style={{ padding: '40px', marginBottom: '80px' }}>
        <header style={{ marginBottom: '40px', borderBottom: '1px solid var(--card-border)', paddingBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)', marginBottom: '16px', fontSize: '0.875rem' }}>
            <span>{new Date(briefing.date).toLocaleDateString('pt-BR')}</span>
            {briefing.model && <span>• IA: {briefing.model}</span>}
            {briefing.sources_count && <span>• Fontes: {briefing.sources_count}</span>}
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--foreground)', fontFamily: 'Inter, sans-serif' }}>
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
