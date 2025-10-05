'use client';

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Home() {

  console.log("test giselle")

  const [getApi, setApi] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [columns, setColumns] = useState([
    { key: 'date', label: 'Data', visible: true },
    { key: 'product', label: 'Produto', visible: true },
    { key: 'quota', label: 'Cota Corrigida', visible: true },
    { key: 'movement', label: 'Movimentação', visible: true },
    { key: 'value', label: 'Valor', visible: true },
  ]);
  const dragIndex = useRef(null);

  useEffect(() => {
    const url = 'https://6270328d6a36d4d62c16327c.mockapi.io/getFixedIncomeClassData';
    let cancelled = false;

    async function fetchData() {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          console.error('Fetch error, status:', res.status);
          return;
        }
        const data = await res.json();
        console.log('fetched data raw:', data);
        if (!cancelled) setApi(data);
      } catch (err) {
        if (!cancelled) console.error('Fetch failed:', err);
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    console.log('getApi', getApi);
  }, [getApi]);

  useEffect(() => {
    // listen for global search events from Header
    const handler = (e) => {
      setSearchTerm(String(e.detail || '').toLowerCase());
    };
    window.addEventListener('globalSearch', handler);
    return () => window.removeEventListener('globalSearch', handler);
  }, []);

  const toggleColumn = (key) => {
    setColumns((cols) => cols.map(c => c.key === key ? { ...c, visible: !c.visible } : c));
  };

  const onDragStart = (index) => {
    dragIndex.current = index;
  };

  const onDrop = (toIndex) => {
    const from = dragIndex.current;
    if (from == null || from === toIndex) return;
    setColumns((cols) => {
      const copy = [...cols];
      const [moved] = copy.splice(from, 1);
      copy.splice(toIndex, 0, moved);
      return copy;
    });
    dragIndex.current = null;
  };

  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  // Removed the fetch call as it is now handled in useEffect

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[24px] row-start-2 w-full">
        <section className="w-full max-w-6xl mx-auto text-center">
          <h1 className="text-lg font-semibold">Demo do Header</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Use a barra de busca, filtros e o botão de tema no topo para testar o componente responsivo.</p>
        </section>
        {/* Responsive table for dailyEquityByPortfolioChartData */}
        <section className="w-full max-w-6xl p-4 rounded mx-auto card">
          {getApi === null ? (
            <p className="text-sm">Carregando...</p>
          ) : (() => {
            const payload = getApi && getApi.data ? getApi.data : getApi;
            const rawData = (payload && payload.dailyEquityByPortfolioChartData) || [];

            // apply search filter
            const data = rawData.filter((row) => {
              if (!searchTerm) return true;
              const values = [
                row.productName,
                String(row.correctedQuota),
                String(row.value),
                String(row.dailyReferenceDate),
              ].join(' ').toLowerCase();
              return values.includes(searchTerm);
            });

            if (!Array.isArray(data) || data.length === 0) {
              return <p className="text-sm">Nenhum dado disponível</p>;
            }

            const movementLabel = (id) => {
              const map = { 0: 'No movement', 1: 'Movement' };
              return map[id] ?? `Type ${id}`;
            };

            const formatDate = (unix) => {
              try {
                return new Date(unix * 1000).toLocaleDateString();
              } catch {
                return String(unix);
              }
            };

            return (
              <>
                {/* Desktop table */}
                <div className="controls-row">
                  <div className="group">
                    <label className="muted-text">Colunas:</label>
                    {columns.map((c, idx) => (
                      <button key={c.key} className="btn-small" onClick={() => toggleColumn(c.key)}>
                        {c.visible ? `👁 ${c.label}` : `🚫 ${c.label}`}
                      </button>
                    ))}
                  </div>
                  <div className="group">
                    <label className="muted-text">Arrastar para reordenar colunas</label>
                  </div>
                </div>

                <div className="hidden md:block overflow-x-auto">
                  <table className="min-w-full text-sm text-left border-collapse table-excel table-small">
                    <thead>
                      <tr>
                        {columns.map((col, idx) => col.visible ? (
                          <th key={col.key}
                            className="px-3 py-2 font-medium"
                            draggable
                            onDragStart={() => onDragStart(idx)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => onDrop(idx)}
                          >
                            {col.label}
                          </th>
                        ) : null)}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row) => (
                        <tr key={`${row.portfolioProductId}-${row.dailyReferenceDate}`}>
                          {columns.map((col) => {
                            if (!col.visible) return null;
                            switch (col.key) {
                              case 'date': return <td key={col.key} className="px-3 py-2 align-top">{formatDate(row.dailyReferenceDate)}</td>;
                              case 'product': return <td key={col.key} className="px-3 py-2 align-top">{row.productName}</td>;
                              case 'quota': return <td key={col.key} className="px-3 py-2 align-top">{row.correctedQuota}</td>;
                              case 'movement': return <td key={col.key} className="px-3 py-2 align-top">{movementLabel(row.movementTypeId)}</td>;
                              case 'value': return <td key={col.key} className="px-3 py-2 align-top">{row.value}</td>;
                              default: return null;
                            }
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden flex flex-col gap-3">
                  {data.map((row) => (
                    <div key={`${row.portfolioProductId}-${row.dailyReferenceDate}`} className="p-3 rounded shadow-sm card">
                      <div className="flex justify-between items-start mb-1">
                        <div className="text-sm font-medium">{row.productName}</div>
                        <div className="text-xs muted-text">{formatDate(row.dailyReferenceDate)}</div>
                      </div>
                      <div className="text-xs muted-text">
                        <div>Cota Corrigida: <span className="font-mono">{row.correctedQuota}</span></div>
                        <div>Movimentação: <span className="font-mono">{movementLabel(row.movementTypeId)}</span></div>
                        <div>Valor: <span className="font-mono">{row.value}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
        </section>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/giselleandrades2/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/linkedin.svg"
            alt="LinkedIn icon"
            width={16}
            height={16}
          />
          LinkedIn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/giselleandrade1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/github.svg"
            alt="GitHub icon"
            width={16}
            height={16}
          />
          GitHub→
        </a>
      </footer>
    </div>
  );
}
