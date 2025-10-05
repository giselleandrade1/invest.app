import React from 'react';

export default function Eye({ size = 16, className = '' }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
            <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7z" fill="currentColor" />
            <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        </svg>
    );
}
