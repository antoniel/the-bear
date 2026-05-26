'use client';

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Button, Frame, List } from '@/lib/react95';
import { PROGRAMS, programForPath, type Program } from '@/lib/programs';

const TASKBAR_HEIGHT = 30;

function pressedButtonStyle(active: boolean) {
    if (!active) return undefined;

    return {
        boxShadow: 'inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey'
    };
}

function TaskbarProgramButton({ program, active }: { program: Program; active: boolean }) {
    return (
        <Link href={program.href} style={{ textDecoration: 'none' }}>
            <Button style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', ...pressedButtonStyle(active) }}>
                {program.exe}
            </Button>
        </Link>
    );
}

function StartMenu({
    open,
    onClose,
    onLaunch
}: {
    open: boolean;
    onClose: () => void;
    onLaunch: (program: Program) => void;
}) {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        function handleClick(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        document.addEventListener('mousedown', handleClick);

        return () => document.removeEventListener('mousedown', handleClick);
    }, [open, onClose]);

    if (!open) return null;

    const applets = PROGRAMS.filter((p) => p.href !== '/' && p.href !== '/design-system');

    return (
        <Frame
            ref={menuRef}
            bgColor='$material'
            style={{
                position: 'fixed',
                left: 0,
                bottom: TASKBAR_HEIGHT,
                width: 220,
                zIndex: 1000,
                boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf'
            }}>
            <Frame
                padding='$2'
                style={{
                    background: '#000080',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 13
                }}>
                Windows<span style={{ fontWeight: 400 }}>95</span>
            </Frame>
            <List style={{ margin: 0, padding: '4px 0' }}>
                {PROGRAMS.filter((p) => p.href === '/').map((program) => (
                    <List.Item
                        key={program.id}
                        onClick={() => onLaunch(program)}
                        style={{ padding: '6px 12px', cursor: 'pointer', listStyle: 'none' }}>
                        {program.title}
                    </List.Item>
                ))}
                <List.Divider />
                <Frame padding='$2' style={{ fontSize: 11, fontWeight: 700, color: '#808080' }}>
                    Programs
                </Frame>
                {PROGRAMS.filter((p) => p.href === '/design-system').map((program) => (
                    <List.Item
                        key={program.id}
                        onClick={() => onLaunch(program)}
                        style={{ padding: '6px 12px 6px 20px', cursor: 'pointer', listStyle: 'none' }}>
                        {program.title}
                    </List.Item>
                ))}
                {applets.map((program) => (
                    <List.Item
                        key={program.id}
                        onClick={() => onLaunch(program)}
                        style={{ padding: '6px 12px 6px 20px', cursor: 'pointer', listStyle: 'none' }}>
                        {program.title}
                    </List.Item>
                ))}
            </List>
        </Frame>
    );
}

function TaskbarClock() {
    const [time, setTime] = useState('');

    useEffect(() => {
        function tick() {
            setTime(
                new Date().toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit'
                })
            );
        }

        tick();
        const id = setInterval(tick, 30_000);

        return () => clearInterval(id);
    }, []);

    return (
        <Frame
            padding='$2'
            style={{
                minWidth: 72,
                textAlign: 'center',
                fontSize: 12,
                border: '1px solid #808080',
                boxShadow: 'inset 1px 1px #808080, inset -1px -1px #fff',
                background: '#c0c0c0'
            }}>
            {time}
        </Frame>
    );
}

export function Win95Taskbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [startOpen, setStartOpen] = useState(false);
    const activeProgram = programForPath(pathname);

    function launchProgram(program: Program) {
        setStartOpen(false);
        router.push(program.href);
    }

    return (
        <>
            <StartMenu open={startOpen} onClose={() => setStartOpen(false)} onLaunch={launchProgram} />
            <Frame
                display='flex'
                alignItems='center'
                gap='$2'
                padding='$1'
                style={{
                    height: TASKBAR_HEIGHT,
                    boxSizing: 'border-box',
                    borderTop: '2px solid #fff',
                    outline: '1px solid #808080',
                    background: '#c0c0c0',
                    flexShrink: 0
                }}>
                <Button
                    onClick={() => setStartOpen((open) => !open)}
                    style={{
                        fontWeight: 700,
                        minWidth: 54,
                        ...pressedButtonStyle(startOpen)
                    }}>
                    Start
                </Button>

                <Frame
                    style={{
                        width: 2,
                        alignSelf: 'stretch',
                        margin: '2px 0',
                        borderLeft: '1px solid #808080',
                        borderRight: '1px solid #fff'
                    }}
                />

                <Frame display='flex' alignItems='center' gap='$1' style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                    {activeProgram && <TaskbarProgramButton program={activeProgram} active />}
                </Frame>

                <Frame padding='$1' style={{ fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>
                    bitcomplete
                </Frame>

                <TaskbarClock />
            </Frame>
        </>
    );
}

export { TASKBAR_HEIGHT };
