import React from 'react';

export default function EyeOff({ size = 16, className = '' }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
            <path d="M2 2l20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17.94 17.94A10.94 10.94 0 0112 19c-7 0-11-7-11-7 1.4-2.31 3.47-4.18 5.88-5.44" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.88 9.88A3 3 0 0014.12 14.12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
