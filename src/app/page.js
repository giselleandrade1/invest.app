'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {

  console.log("test giselle")

  const [getApi, setApi] = useState(null);

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

  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  // Removed the fetch call as it is now handled in useEffect

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[24px] row-start-2 w-full">
        {/* Responsive table for dailyEquityByPortfolioChartData */}
        <section className="w-full max-w-6xl bg-white/50 dark:bg-black/30 p-4 rounded mx-auto">
          {getApi === null ? (
            <p className="text-sm">Loading...</p>
          ) : (() => {
            const payload = getApi && getApi.data ? getApi.data : getApi;
            const data = (payload && payload.dailyEquityByPortfolioChartData) || [];

            if (!Array.isArray(data) || data.length === 0) {
              return <p className="text-sm">No data available</p>;
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
                <div className="hidden md:block overflow-x-auto">
                  <table className="min-w-full text-sm text-left border-collapse">
                    <thead>
                      <tr>
                        <th className="px-3 py-2 bg-gray-100 dark:bg-gray-800 font-medium border-b">Date</th>
                        <th className="px-3 py-2 bg-gray-100 dark:bg-gray-800 font-medium border-b">Product</th>
                        <th className="px-3 py-2 bg-gray-100 dark:bg-gray-800 font-medium border-b">Corrected Quota</th>
                        <th className="px-3 py-2 bg-gray-100 dark:bg-gray-800 font-medium border-b">Movement</th>
                        <th className="px-3 py-2 bg-gray-100 dark:bg-gray-800 font-medium border-b">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row) => (
                        <tr key={`${row.portfolioProductId}-${row.dailyReferenceDate}`} className="odd:bg-white even:bg-gray-50 dark:odd:bg-transparent dark:even:bg-gray-900">
                          <td className="px-3 py-2 align-top border-b">{formatDate(row.dailyReferenceDate)}</td>
                          <td className="px-3 py-2 align-top border-b">{row.productName}</td>
                          <td className="px-3 py-2 align-top border-b">{row.correctedQuota}</td>
                          <td className="px-3 py-2 align-top border-b">{movementLabel(row.movementTypeId)}</td>
                          <td className="px-3 py-2 align-top border-b">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden flex flex-col gap-3">
                  {data.map((row) => (
                    <div key={`${row.portfolioProductId}-${row.dailyReferenceDate}`} className="p-3 bg-white dark:bg-gray-900 rounded shadow-sm">
                      <div className="flex justify-between items-start mb-1">
                        <div className="text-sm font-medium">{row.productName}</div>
                        <div className="text-xs text-gray-500">{formatDate(row.dailyReferenceDate)}</div>
                      </div>
                      <div className="text-xs text-gray-700 dark:text-gray-300">
                        <div>Corrected Quota: <span className="font-mono">{row.correctedQuota}</span></div>
                        <div>Movement: <span className="font-mono">{movementLabel(row.movementTypeId)}</span></div>
                        <div>Value: <span className="font-mono">{row.value}</span></div>
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
