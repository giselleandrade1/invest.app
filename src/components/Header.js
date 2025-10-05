"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// Header component: responsive nav with logo, search, filter and theme toggle
export default function Header({ githubUsername = 'giselleandrade1' }) {
    const [theme, setTheme] = useState('light');
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        // initialize theme from localStorage or prefers-color-scheme
        const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
        if (saved) {
            setTheme(saved);
            document.documentElement.setAttribute('data-theme', saved);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, []);

    const toggleTheme = () => {
        const next = theme === 'light' ? 'dark' : 'light';
        setTheme(next);
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    };

    return (
        <header className="site-header">
            <div className="header-inner">
                <a className="logo" href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer">
                    <Image src={`https://github.com/${githubUsername}.png`} alt="GitHub avatar" width={44} height={44} />
                </a>

                <nav className={`nav ${mobileOpen ? 'open' : ''}`}>
                    <div className="search-filter">
                        <div className="search">
                            <svg className="icon" viewBox="0 0 24 24" aria-hidden>
                                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM10 14a4 4 0 110-8 4 4 0 010 8z" />
                            </svg>
                            <input
                                id="global-search"
                                type="search"
                                placeholder="Buscar..."
                                aria-label="Buscar"
                                onChange={(e) => {
                                    const val = e.target.value;
                                    // simple debounce
                                    if (typeof window !== 'undefined') {
                                        if (window.__globalSearchTimeout) clearTimeout(window.__globalSearchTimeout);
                                        window.__globalSearchTimeout = setTimeout(() => {
                                            window.dispatchEvent(new CustomEvent('globalSearch', { detail: val }));
                                        }, 250);
                                    }
                                }}
                            />
                        </div>

                        <button className="filter" aria-label="Filtrar">
                            <svg className="icon" viewBox="0 0 24 24" aria-hidden>
                                <path d="M10 18h4v-2h-4v2zm-7-8v2h18v-2H3zm3-6v2h12V4H6z" />
                            </svg>
                            <span className="visually-hidden">Filtro</span>
                        </button>
                    </div>
                </nav>

                <div className="actions">
                    <button className="theme-toggle" onClick={toggleTheme} aria-label="Alternar tema">
                        {theme === 'light' ? (
                            // Sun with clouds for light mode icon
                            <svg className="icon theme-icon" viewBox="0 0 24 24" aria-hidden>
                                <path d="M6.76 4.84l-1.8-1.79L3.17 5.84l1.79 1.79 1.8-2.79zM1 13h3v-2H1v2zm10-9h2V1h-2v3zm7.03 2.05l1.79-1.79-1.79-1.79-1.79 1.79 1.79 1.79zM17 13a5 5 0 00-9.9-1.02A4 4 0 007 18h10a4 4 0 000-8h-1z" />
                            </svg>
                        ) : (
                            // Cloud with crescent for dark mode icon
                            <svg className="icon theme-icon" viewBox="0 0 24 24" aria-hidden>
                                <path d="M20 17.17A4 4 0 0016 12h-1.26A6 6 0 109 19h7a4 4 0 004-1.83zM12 3a9 9 0 000 18c.34 0 .67-.02 1-.06A7 7 0 0112 3z" />
                            </svg>
                        )}
                    </button>

                    <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Abrir menu">
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </div>
        </header>
    );
}
