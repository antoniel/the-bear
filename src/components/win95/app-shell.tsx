'use client';

import type { ReactNode } from 'react';

import { Frame } from '@/lib/react95';

import { Desktop } from './desktop';
import { TASKBAR_HEIGHT, Win95Taskbar } from './taskbar';

export function Win95AppShell({ children }: { children: ReactNode }) {
    return (
        <Desktop style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Frame style={{ flex: 1, minHeight: 0, overflow: 'auto', paddingBottom: 0 }}>
                {children}
            </Frame>
            <Win95Taskbar />
        </Desktop>
    );
}

export { TASKBAR_HEIGHT };
