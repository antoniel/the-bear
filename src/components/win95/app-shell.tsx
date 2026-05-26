'use client';

import type { ReactNode } from 'react';

import { Desktop } from './desktop';
import { Win95SiteNav } from './site-nav';

export function Win95AppShell({ children }: { children: ReactNode }) {
    return (
        <Desktop>
            <Win95SiteNav />
            {children}
        </Desktop>
    );
}
