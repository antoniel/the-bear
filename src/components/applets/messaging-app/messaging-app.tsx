'use client';

import { useMemo, useState } from 'react';

import { Avatar, Button, Frame, Input, List, TextArea, TitleBar } from '@/lib/react95';
import { TASKBAR_HEIGHT } from '@/components/win95/app-shell';

import {
    CONVERSATIONS,
    type Conversation,
    type ConversationSection,
    type Message,
    SECTION_LABELS,
    WORKSPACE_NAME
} from './messaging-app.data';

const SELECTED_BG = '#000080';

const SECTIONS: ConversationSection[] = ['starred', 'channels', 'dms'];

function channelLabel(conversation: Conversation) {
    const prefix = conversation.private ? '🔒' : '#';

    return `${prefix} ${conversation.name}`;
}

function ConversationRow({
    conversation,
    selected,
    onSelect
}: {
    conversation: Conversation;
    selected: boolean;
    onSelect: () => void;
}) {
    const label = conversation.kind === 'channel' ? channelLabel(conversation) : conversation.name;

    return (
        <List.Item
            onClick={onSelect}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 8px 4px 12px',
                cursor: 'pointer',
                background: selected ? SELECTED_BG : 'transparent',
                color: selected ? '#fff' : '#000',
                listStyle: 'none',
                fontWeight: conversation.unread && !selected ? 700 : 400
            }}>
            {conversation.kind === 'dm' ? (
                <Frame display='flex' alignItems='center' gap='$2' style={{ minWidth: 0, flex: 1 }}>
                    <Frame style={{ position: 'relative', flexShrink: 0 }}>
                        <Avatar circle size='24px'>
                            {conversation.initials}
                        </Avatar>
                        {conversation.online !== undefined && (
                            <Frame
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    background: conversation.online ? '#008000' : '#808080',
                                    border: '1px solid #c0c0c0'
                                }}
                            />
                        )}
                    </Frame>
                    <span
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}>
                        {label}
                    </span>
                </Frame>
            ) : (
                <span
                    style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        flex: 1
                    }}>
                    {label}
                </span>
            )}
            {conversation.badge !== undefined && conversation.badge > 0 && !selected && (
                <Frame
                    style={{
                        minWidth: 18,
                        height: 18,
                        padding: '0 4px',
                        borderRadius: 9,
                        background: '#ff00ff',
                        color: '#fff',
                        fontSize: 10,
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                    }}>
                    {conversation.badge}
                </Frame>
            )}
        </List.Item>
    );
}

function SectionHeader({ label }: { label: string }) {
    return (
        <Frame
            padding='$2'
            style={{
                paddingLeft: 12,
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                color: '#000',
                borderTop: '1px solid #808080'
            }}>
            {label}
        </Frame>
    );
}

function MessageBubble({ message }: { message: Message }) {
    return (
        <Frame
            display='flex'
            flexDirection='column'
            alignItems={message.outgoing ? 'flex-end' : 'flex-start'}
            style={{ marginBottom: 10 }}>
            {message.sender && !message.outgoing && (
                <span style={{ fontSize: 11, fontWeight: 700, marginBottom: 2, color: '#000' }}>{message.sender}</span>
            )}
            <Frame
                padding='$2'
                bgColor={message.outgoing ? SELECTED_BG : 'white'}
                style={{
                    maxWidth: '78%',
                    color: message.outgoing ? '#fff' : '#000',
                    boxShadow: message.outgoing
                        ? 'inset -1px -1px #000, inset 1px 1px #808080'
                        : 'inset 1px 1px #808080, inset -1px -1px #fff'
                }}>
                {message.text}
            </Frame>
        </Frame>
    );
}

function activeHeaderLabel(conversation: Conversation) {
    return conversation.kind === 'channel' ? channelLabel(conversation) : conversation.name;
}

export function MessagingApp() {
    const [query, setQuery] = useState('');
    const [draft, setDraft] = useState('');
    const [activeId, setActiveId] = useState(CONVERSATIONS[0].id);
    const [threads, setThreads] = useState(CONVERSATIONS);

    const active = threads.find((c) => c.id === activeId) ?? threads[0];

    const filteredBySection = useMemo(() => {
        const q = query.trim().toLowerCase();

        return SECTIONS.reduce(
            (acc, section) => {
                const items = threads.filter((c) => {
                    if (c.section !== section) return false;
                    if (!q) return true;

                    return c.name.toLowerCase().includes(q) || c.preview.toLowerCase().includes(q);
                });

                if (items.length > 0) acc[section] = items;

                return acc;
            },
            {} as Partial<Record<ConversationSection, Conversation[]>>
        );
    }, [query, threads]);

    function sendMessage() {
        const text = draft.trim();
        if (!text || !active) return;

        const newMessage: Message = {
            id: `m-${Date.now()}`,
            text,
            sentAt: 'Just now',
            outgoing: true
        };

        setThreads((prev) =>
            prev.map((c) =>
                c.id === active.id
                    ? {
                          ...c,
                          preview: text,
                          time: 'Now',
                          unread: false,
                          badge: undefined,
                          messages: [...c.messages, newMessage]
                      }
                    : c
            )
        );
        setDraft('');
    }

    return (
        <Frame
            padding='$6'
            style={{
                minHeight: `calc(100vh - ${TASKBAR_HEIGHT}px)`,
                boxSizing: 'border-box'
            }}>
            <Frame
                bgColor='$material'
                style={{
                    maxWidth: 980,
                    height: `min(720px, calc(100vh - ${TASKBAR_HEIGHT}px - 3rem))`,
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow:
                        'inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf'
                }}>
                <TitleBar active title='Messenger.exe' style={{ padding: '2px 2px 3px' }}>
                    <TitleBar.OptionsBox>
                        <TitleBar.Minimize aria-label='Minimize' />
                        <TitleBar.Maximize aria-label='Maximize' />
                        <TitleBar.Close aria-label='Close' />
                    </TitleBar.OptionsBox>
                </TitleBar>

                <Frame display='flex' style={{ flex: 1, minHeight: 0 }}>
                    <Frame
                        style={{
                            width: 260,
                            borderRight: '2px solid #808080',
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: 0
                        }}>
                        <Frame
                            padding='$2'
                            style={{
                                borderBottom: '1px solid #808080',
                                fontWeight: 700,
                                fontSize: 13
                            }}>
                            {WORKSPACE_NAME}
                        </Frame>
                        <Frame padding='$2'>
                            <Input
                                placeholder='Jump to...'
                                value={query}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                                style={{ width: '100%', boxSizing: 'border-box' }}
                            />
                        </Frame>
                        <Frame style={{ flex: 1, overflowY: 'auto' }}>
                            {SECTIONS.map((section) => {
                                const items = filteredBySection[section];
                                if (!items?.length) return null;

                                return (
                                    <Frame key={section}>
                                        <SectionHeader label={SECTION_LABELS[section]} />
                                        <List style={{ margin: 0, padding: 0 }}>
                                            {items.map((conversation) => (
                                                <ConversationRow
                                                    key={conversation.id}
                                                    conversation={conversation}
                                                    selected={conversation.id === activeId}
                                                    onSelect={() => setActiveId(conversation.id)}
                                                />
                                            ))}
                                        </List>
                                    </Frame>
                                );
                            })}
                        </Frame>
                    </Frame>

                    <Frame display='flex' flexDirection='column' style={{ flex: 1, minWidth: 0, minHeight: 0 }}>
                        <Frame
                            padding='$2'
                            display='flex'
                            alignItems='center'
                            justifyContent='space-between'
                            style={{
                                borderBottom: '1px solid #808080',
                                fontWeight: 700
                            }}>
                            <span>{activeHeaderLabel(active)}</span>
                            <Button style={{ minWidth: 24, padding: '0 6px' }} aria-label='Info'>
                                i
                            </Button>
                        </Frame>

                        <Frame
                            padding='$4'
                            style={{
                                flex: 1,
                                overflowY: 'auto',
                                background: '#c0c0c0'
                            }}>
                            <Frame
                                style={{
                                    textAlign: 'center',
                                    fontSize: 11,
                                    marginBottom: 12,
                                    color: '#000'
                                }}>
                                {active.kind === 'channel' ? 'Channel' : 'Direct message'} ·{' '}
                                {active.messages[active.messages.length - 1]?.sentAt}
                            </Frame>
                            {active.messages.map((message) => (
                                <MessageBubble key={message.id} message={message} />
                            ))}
                        </Frame>

                        <Frame
                            padding='$2'
                            display='flex'
                            alignItems='flex-end'
                            gap='$2'
                            style={{ borderTop: '2px solid #808080' }}>
                            <Button aria-label='Attach'>+</Button>
                            <TextArea
                                rows={2}
                                value={draft}
                                placeholder={`Message ${activeHeaderLabel(active)}`}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDraft(e.target.value)}
                                onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        sendMessage();
                                    }
                                }}
                                style={{ flex: 1, resize: 'none', boxSizing: 'border-box' }}
                            />
                            <Button onClick={sendMessage} disabled={!draft.trim()}>
                                Send
                            </Button>
                        </Frame>
                    </Frame>
                </Frame>
            </Frame>
        </Frame>
    );
}
