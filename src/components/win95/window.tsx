import type { CSSProperties, ReactNode } from 'react';

import { Frame, TitleBar } from '@/lib/react95';

import { WINDOW_SHADOW } from './constants';

export function Win95Window({
    title,
    children,
    style
}: {
    title: string;
    children: ReactNode;
    style?: CSSProperties;
}) {
    return (
        <Frame
            bgColor='$material'
            style={{
                boxShadow: WINDOW_SHADOW,
                ...style
            }}>
            <TitleBar active title={title} style={{ padding: '2px 2px 3px' }} />
            <Frame padding='$4'>{children}</Frame>
        </Frame>
    );
}
