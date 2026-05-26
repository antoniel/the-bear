import type { CSSProperties, ReactNode } from 'react';

import { DESKTOP_BG } from './constants';

export function Desktop({ children, style }: { children: ReactNode; style?: CSSProperties }) {
    return (
        <div
            style={{
                minHeight: '100vh',
                background: DESKTOP_BG,
                color: '#000',
                boxSizing: 'border-box',
                ...style
            }}>
            {children}
        </div>
    );
}
