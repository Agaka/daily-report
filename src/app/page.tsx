import { getAllBriefings } from '@/lib/markdown';
import BriefingList from '@/components/BriefingList';

export default function Home() {
  const briefings = getAllBriefings();

  return (
    <div className="container" style={{ marginTop: '40px' }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px' }}>
          Inteligência Geopolítica
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>
          Resumos diários focados em macroeconomia e política global, sem viés.
        </p>
      </header>
      
      <BriefingList briefings={briefings} />
    </div>
  );
}
