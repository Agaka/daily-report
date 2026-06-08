'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { BriefingMetadata } from '@/lib/markdown';
import styles from './BriefingList.module.css';

export default function BriefingList({ briefings }: { briefings: BriefingMetadata[] }) {
  const [query, setQuery] = useState('');

  const filtered = briefings.filter((b) => 
    b.title.toLowerCase().includes(query.toLowerCase()) || 
    b.date.includes(query)
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} size={20} />
        <input 
          type="text" 
          className={styles.searchInput}
          placeholder="Buscar relatórios..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className={styles.list}>
        {filtered.length === 0 ? (
          <p className={styles.empty}>Nenhum relatório encontrado.</p>
        ) : (
          filtered.map((briefing) => (
            <Link href={`/briefing/${briefing.slug}`} key={briefing.slug} className={styles.card}>
              <h2>{briefing.title}</h2>
              <div className={styles.meta}>
                <span>{new Date(briefing.date).toLocaleDateString('pt-BR')}</span>
                {briefing.sources_count && <span>• {briefing.sources_count} fontes analisadas</span>}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
