'use client';

import { useState } from 'react';

import { Button, Fieldset, Frame, Input, Tab, Tabs, TextArea, TitleBar } from '@/lib/react95';

const DESKTOP_BG = '#008080';

export function TonyCanvas() {
    const [notes, setNotes] = useState('');
    const [projectName, setProjectName] = useState('hackathon-demo');

    return (
        <Frame
            padding='$6'
            style={{
                minHeight: 'calc(100vh - 6rem)',
                background: DESKTOP_BG,
                boxSizing: 'border-box'
            }}>
            <Frame
                bgColor='$material'
                style={{
                    maxWidth: 960,
                    margin: '0 auto',
                    boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf'
                }}>
                <TitleBar
                    active
                    title={`${projectName}.exe`}
                    style={{ padding: '2px 2px 3px' }}>
                    <TitleBar.OptionsBox>
                        <TitleBar.Minimize aria-label='Minimize' />
                        <TitleBar.Maximize aria-label='Maximize' />
                        <TitleBar.Close aria-label='Close' />
                    </TitleBar.OptionsBox>
                </TitleBar>

                <Frame padding='$4' display='flex' flexDirection='column' gap='$4'>
                    <Frame display='flex' flexWrap='wrap' gap='$4' alignItems='center'>
                        <Input
                            value={projectName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setProjectName(e.target.value)
                            }
                            style={{ width: 180 }}
                        />
                        <Button>Run</Button>
                        <Button disabled>Save</Button>
                    </Frame>

                    <Tabs defaultActiveTab='Canvas' width='100%'>
                        <Tab title='Canvas'>
                            <Fieldset legend='Playground' style={{ marginTop: 8 }}>
                                <Frame
                                    bgColor='white'
                                    padding='$4'
                                    style={{
                                        minHeight: 360,
                                        border: '1px solid #808080',
                                        boxSizing: 'border-box'
                                    }}>
                                    <p style={{ margin: 0, color: '#000' }}>
                                        Build your hackathon experiments here. Edit{' '}
                                        <code>src/components/tony-canvas.tsx</code>.
                                    </p>
                                </Frame>
                            </Fieldset>
                        </Tab>
                        <Tab title='Notes'>
                            <Fieldset legend='Scratchpad' style={{ marginTop: 8 }}>
                                <TextArea
                                    rows={12}
                                    value={notes}
                                    placeholder='Ideas, todos, API keys (don’t commit secrets)...'
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                        setNotes(e.target.value)
                                    }
                                    style={{ width: '100%', boxSizing: 'border-box' }}
                                />
                            </Fieldset>
                        </Tab>
                    </Tabs>

                    <Frame
                        padding='$2'
                        style={{
                            borderTop: '1px solid #808080',
                            fontSize: 12,
                            color: '#000'
                        }}>
                        Ready · React95 playground · /tony-canvas
                    </Frame>
                </Frame>
            </Frame>
        </Frame>
    );
}
