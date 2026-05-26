'use client';

import Link from 'next/link';

import { Button, Fieldset, Frame, List } from '@/lib/react95';
import { APPLETS } from '@/lib/applets';

import { Win95Window } from './window';

export function Win95AppletsPage() {
    return (
        <Frame padding='$6' style={{ maxWidth: 720, margin: '0 auto' }}>
                <Win95Window title='Applets.exe'>
                    <Fieldset legend='Teamweek mini apps'>
                        <p style={{ margin: '0 0 12px', lineHeight: 1.5 }}>
                            Small apps built during Teamweek. Each one runs inside the React95 shell.
                        </p>
                        <List style={{ margin: 0, padding: 0 }}>
                            {APPLETS.map((applet) => (
                                <List.Item
                                    key={applet.href}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 8,
                                        padding: '8px 10px',
                                        marginBottom: 8,
                                        listStyle: 'none',
                                        background: '#fff',
                                        boxShadow: 'inset 1px 1px #808080, inset -1px -1px #fff'
                                    }}>
                                    <Frame display='flex' alignItems='center' gap='$2'>
                                        <strong>{applet.title}</strong>
                                        {applet.tag && (
                                            <span
                                                style={{
                                                    fontSize: 10,
                                                    padding: '1px 6px',
                                                    border: '1px solid #808080',
                                                    background: '#c0c0c0'
                                                }}>
                                                {applet.tag}
                                            </span>
                                        )}
                                    </Frame>
                                    <span style={{ fontSize: 12, lineHeight: 1.4 }}>{applet.description}</span>
                                    <Link href={applet.href} style={{ textDecoration: 'none', alignSelf: 'flex-start' }}>
                                        <Button>Launch</Button>
                                    </Link>
                                </List.Item>
                            ))}
                        </List>
                    </Fieldset>
                </Win95Window>
            </Frame>
    );
}
