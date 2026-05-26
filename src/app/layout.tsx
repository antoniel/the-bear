import type { ReactNode } from 'react';

import type { Metadata } from 'next';

import '@/app/react95-styles';
import { Win95AppShell } from '@/components/win95/app-shell';

export const metadata: Metadata = {
    title: 'the-bear | bitcomplete Teamweek',
    description: 'Hackathon workspace — React95 design system and applets'
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <html lang='en'>
            <body style={{ margin: 0 }}>
                <Win95AppShell>{children}</Win95AppShell>
            </body>
        </html>
    );
};

export default Layout;
