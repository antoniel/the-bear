'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button, Frame } from '@/lib/react95';

const NAV_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/design-system', label: 'Design System' },
    { href: '/applets', label: 'Applets' }
];

export function Win95SiteNav() {
    const pathname = usePathname();

    return (
        <Frame
            display='flex'
            alignItems='center'
            flexWrap='wrap'
            gap='$2'
            padding='$2'
            style={{
                borderBottom: '2px solid #808080',
                background: '#c0c0c0'
            }}>
            <Frame padding='$2' style={{ fontWeight: 700, marginRight: 4 }}>
                bitcomplete · Teamweek
            </Frame>
            {NAV_LINKS.map((link) => {
                const active =
                    link.href === '/'
                        ? pathname === '/'
                        : pathname === link.href || pathname.startsWith(`${link.href}/`);

                return (
                    <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
                        <Button
                            style={
                                active
                                    ? {
                                          boxShadow:
                                              'inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey'
                                      }
                                    : undefined
                            }>
                            {link.label}
                        </Button>
                    </Link>
                );
            })}
        </Frame>
    );
}
