import { getAllBriefings } from '@/lib/markdown';
import BriefingList from '@/components/BriefingList';

export default function Home() {
  const briefings = getAllBriefings();

  return (
    <div className="container" style={{ marginTop: '80px', marginBottom: '80px' }}>
      <header style={{ marginBottom: '60px', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: 800, 
          letterSpacing: '-0.04em',
          marginBottom: '16px',
          background: 'linear-gradient(to right, var(--foreground), var(--text-muted))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Inteligência Geopolítica
        </h1>
        <p style={{ 
          color: 'var(--text-muted)', 
          fontSize: '1.25rem',
          maxWidth: '500px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Resumos diários focados em macroeconomia, conflitos e tendências globais.
        </p>
      </header>
      
      <BriefingList briefings={briefings} />
    </div>
  );
}
