'use client';

import Link from 'next/link';

import { Button, Fieldset, Frame, Input, List, ProgressBar, TextArea } from '@/lib/react95';

import { Win95Window } from './window';

function PreviewLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            {children}
        </Link>
    );
}

export function Win95HomePage() {
    return (
        <Frame padding='$6' style={{ maxWidth: 920, margin: '0 auto' }}>
            <Win95Window title='the-bear.exe' style={{ marginBottom: 16 }}>
                <Fieldset legend='Welcome'>
                    <Frame display='flex' flexDirection='column' gap='$4'>
                        <p style={{ margin: 0, lineHeight: 1.5 }}>
                            Hackathon workspace for bitcomplete&apos;s Teamweek. Modern Next.js underneath, Windows 95
                            on the surface — a design system plus small applets you can open, break, and ship fast.
                        </p>
                        <p style={{ margin: 0, lineHeight: 1.5 }}>
                            Pick a preview below or open a program from the <strong>Start</strong> menu on
                            the taskbar.
                        </p>
                    </Frame>
                </Fieldset>
            </Win95Window>

            <Frame display='flex' flexWrap='wrap' gap='$4' justifyContent='center'>
                <PreviewLink href='/design-system'>
                    <Win95Window title='Design System — preview' style={{ width: 300 }}>
                        <Fieldset legend='Components'>
                            <Frame display='flex' flexDirection='column' gap='$4'>
                                <Frame display='flex' gap='$2' flexWrap='wrap'>
                                    <Button>OK</Button>
                                    <Button>Cancel</Button>
                                </Frame>
                                <Input defaultValue='C:\bitcomplete\components' readOnly />
                                <ProgressBar percent={72} />
                                <TextArea
                                    rows={2}
                                    defaultValue='Buttons, inputs, modals, tabs…'
                                    readOnly
                                    style={{ width: '100%', boxSizing: 'border-box' }}
                                />
                                <Button style={{ width: '100%' }}>Open full catalog</Button>
                            </Frame>
                        </Fieldset>
                    </Win95Window>
                </PreviewLink>

                <PreviewLink href='/tony-canvas'>
                    <Win95Window title='Applets — preview' style={{ width: 300 }}>
                        <Fieldset legend='Installed'>
                            <Frame display='flex' flexDirection='column' gap='$4'>
                                <List style={{ margin: 0, padding: 0 }}>
                                    <List.Item
                                        style={{
                                            padding: '4px 8px',
                                            fontWeight: 700,
                                            background: '#000080',
                                            color: '#fff'
                                        }}>
                                        # teamweek-messenger
                                    </List.Item>
                                    <List.Item style={{ padding: '4px 8px', opacity: 0.7 }}># more-soon.exe</List.Item>
                                </List>
                                <Frame
                                    padding='$2'
                                    bgColor='white'
                                    style={{
                                        fontSize: 12,
                                        boxShadow: 'inset 1px 1px #808080, inset -1px -1px #fff'
                                    }}>
                                    Wil: does this run locally or is it a screenshot?
                                </Frame>
                                <Button style={{ width: '100%' }}>Launch Messenger</Button>
                            </Frame>
                        </Fieldset>
                    </Win95Window>
                </PreviewLink>
            </Frame>
        </Frame>
    );
}
