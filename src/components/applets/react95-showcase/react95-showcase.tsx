'use client';

import { useState } from 'react';

import {
    Button,
    Checkbox,
    Fieldset,
    Frame,
    Input,
    Modal,
    ProgressBar,
    RadioButton,
    Tab,
    Tabs,
    TextArea,
    TitleBar
} from '@/lib/react95';
import { Win95Window } from '@/components/win95/window';

export function React95Showcase() {
    const [showModal, setShowModal] = useState(false);
    const [progress, setProgress] = useState(42);
    const [agreed, setAgreed] = useState(false);
    const [plan, setPlan] = useState('home');

    return (
        <Frame padding='$6' style={{ minHeight: 'calc(100vh - 3rem)', boxSizing: 'border-box' }}>
            <Win95Window title='DesignSystem.exe' style={{ maxWidth: 720, margin: '0 auto' }}>
                <h1 style={{ margin: '0 0 8px', fontSize: '1.25rem' }}>React95 components</h1>
                <p style={{ margin: '0 0 16px' }}>
                    Windows 95 UI from{' '}
                    <a href='https://react95.io' target='_blank' rel='noreferrer'>
                        react95.io
                    </a>
                    . Browse more in{' '}
                    <a
                        href='https://react95.github.io/React95/'
                        target='_blank'
                        rel='noreferrer'>
                        Storybook
                    </a>
                    .
                </p>

                <Tabs defaultActiveTab='Controls' width='100%' style={{ marginBottom: 16 }}>
                    <Tab title='Controls'>
                        <p style={{ margin: '8px 0 0' }}>Inputs and toggles below.</p>
                    </Tab>
                    <Tab title='About'>
                        <p style={{ margin: '8px 0 0' }}>
                            Built with @react95/core v9. See the Storybook for every component.
                        </p>
                    </Tab>
                </Tabs>

                <Fieldset legend='Form controls'>
                    <Frame display='flex' flexDirection='column' gap='$4'>
                        <Input defaultValue='C:\the-bear' placeholder='Path' />
                        <TextArea defaultValue='Edit your page.tsx and save.' rows={3} />
                        <Checkbox
                            checked={agreed}
                            label='I agree to the license'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setAgreed(e.target.checked)
                            }
                        />
                        <RadioButton
                            checked={plan === 'home'}
                            name='plan'
                            value='home'
                            onChange={() => setPlan('home')}>
                            Home
                        </RadioButton>
                        <RadioButton
                            checked={plan === 'examples'}
                            name='plan'
                            value='examples'
                            onChange={() => setPlan('examples')}>
                            Examples
                        </RadioButton>
                    </Frame>
                </Fieldset>

                <Fieldset legend='Actions' style={{ marginTop: 16 }}>
                    <Frame display='flex' flexWrap='wrap' gap='$4'>
                        <Button onClick={() => setShowModal(true)}>Open modal</Button>
                        <Button onClick={() => setProgress((p) => (p >= 100 ? 0 : p + 10))}>
                            Bump progress
                        </Button>
                        <Button disabled>Disabled</Button>
                    </Frame>
                </Fieldset>

                <Fieldset legend='Progress' style={{ marginTop: 16 }}>
                    <ProgressBar percent={progress} />
                </Fieldset>

                {showModal && (
                    <Modal
                        title='the-bear'
                        dragOptions={{ defaultPosition: { x: 40, y: 80 } }}
                        titleBarOptions={[
                            <TitleBar.Close key='close' onClick={() => setShowModal(false)} />
                        ]}
                        buttons={[
                            {
                                value: 'OK',
                                onClick: () => setShowModal(false)
                            },
                            {
                                value: 'Cancel',
                                onClick: () => setShowModal(false)
                            }
                        ]}>
                        <Modal.Content width='280px' height='120px' bgColor='white' padding='$4'>
                            React95 is installed and ready to use in this Next.js app.
                        </Modal.Content>
                    </Modal>
                )}
            </Win95Window>
        </Frame>
    );
}
