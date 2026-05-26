export type Message = {
    id: string;
    sender?: string;
    text: string;
    sentAt: string;
    outgoing: boolean;
};

export type ConversationSection = 'starred' | 'channels' | 'dms';

export type Conversation = {
    id: string;
    section: ConversationSection;
    kind: 'channel' | 'dm';
    name: string;
    initials: string;
    preview: string;
    time: string;
    unread: boolean;
    badge?: number;
    private?: boolean;
    online?: boolean;
    messages: Message[];
};

export const WORKSPACE_NAME = 'bitcomplete · Teamweek';

export const CONVERSATIONS: Conversation[] = [
    {
        id: 'teamweek-2026',
        section: 'starred',
        kind: 'channel',
        name: 'teamweek-2026',
        initials: '#',
        preview: 'Tony: React95 demo — trust the process',
        time: '2:41 PM',
        unread: true,
        badge: 4,
        messages: [
            {
                id: 'm1',
                sender: 'Felix',
                text: 'Teamweek kickoff 🚀 Reminder: ship > slide deck. Questions? Ping the channel.',
                sentAt: 'Today at 9:00 AM',
                outgoing: false
            },
            {
                id: 'm2',
                sender: 'Dylan',
                text: 'I want something working by end of day. Ugly is fine. Fake is not.',
                sentAt: 'Today at 9:04 AM',
                outgoing: false
            },
            {
                id: 'm3',
                sender: 'Tony',
                text: 'Shipped /tony-canvas with Windows 95 vibes. Real software, just nostalgic.',
                sentAt: 'Today at 2:35 PM',
                outgoing: false
            },
            {
                id: 'm4',
                sender: 'Corey',
                text: 'Approved. Finally a hackathon that respects `inset 1px 1px #808080`.',
                sentAt: 'Today at 2:38 PM',
                outgoing: false
            },
            {
                id: 'm5',
                text: 'Demo deploy in 10 min. If it breaks, blame Turbopack.',
                sentAt: 'Today at 2:41 PM',
                outgoing: true
            }
        ]
    },
    {
        id: 'tony-canvas',
        section: 'starred',
        kind: 'channel',
        name: 'tony-canvas',
        initials: '#',
        preview: 'Wil: is this Slack or nostalgia for 1995?',
        time: '1:55 PM',
        unread: false,
        private: true,
        messages: [
            {
                id: 'm1',
                sender: 'Tony',
                text: 'Hackathon playground here: messaging app + React95. Feedback welcome.',
                sentAt: 'Today at 1:40 PM',
                outgoing: false
            },
            {
                id: 'm2',
                sender: 'Wil',
                text: 'Is this Slack or nostalgia for 1995? (answer: yes)',
                sentAt: 'Today at 1:44 PM',
                outgoing: false
            },
            {
                id: 'm3',
                sender: 'Jake',
                text: 'The TitleBar close button that does not close anything is *chef’s kiss*.',
                sentAt: 'Today at 1:50 PM',
                outgoing: false
            },
            {
                id: 'm4',
                text: 'Feature, not bug. Same as prod sometimes.',
                sentAt: 'Today at 1:55 PM',
                outgoing: true
            }
        ]
    },
    {
        id: 'bitcomplete-general',
        section: 'channels',
        kind: 'channel',
        name: 'bitcomplete-general',
        initials: '#',
        preview: 'Megan: Teamweek pizza arrives at 6pm',
        time: '12:10 PM',
        unread: true,
        messages: [
            {
                id: 'm1',
                sender: 'Megan',
                text: 'Teamweek pizza arrives at 6pm. Vegetarians, react 🌱 on this message.',
                sentAt: 'Today at 12:05 PM',
                outgoing: false
            },
            {
                id: 'm2',
                sender: 'Victor',
                text: '🌱 also accepting bug fixes as emotional currency',
                sentAt: 'Today at 12:08 PM',
                outgoing: false
            },
            {
                id: 'm3',
                sender: 'Guilherme M.',
                text: 'Anyone see the staging cron? It woke up early today.',
                sentAt: 'Today at 12:10 PM',
                outgoing: false
            }
        ]
    },
    {
        id: 'eng-random',
        section: 'channels',
        kind: 'channel',
        name: 'eng-random',
        initials: '#',
        preview: 'Mikaël: `npm install` is not architecture',
        time: '11:22 AM',
        unread: false,
        messages: [
            {
                id: 'm1',
                sender: 'Mikaël',
                text: 'Hot take: `npm install` is not architecture. But I have seen PRs that size.',
                sentAt: 'Today at 11:15 AM',
                outgoing: false
            },
            {
                id: 'm2',
                sender: 'Nicolle',
                text: 'I just wanted to rename a variable and left 47 files later. Classic.',
                sentAt: 'Today at 11:18 AM',
                outgoing: false
            },
            {
                id: 'm3',
                sender: 'Ariel',
                text: '"Works on my machine" is the backend version of "thoughts and prayers".',
                sentAt: 'Today at 11:22 AM',
                outgoing: false
            }
        ]
    },
    {
        id: 'incident-retro',
        section: 'channels',
        kind: 'channel',
        name: 'incident-but-make-it-retro',
        initials: '#',
        preview: 'Wai: postmortem at 4pm, trauma optional',
        time: 'Yesterday',
        unread: false,
        private: true,
        messages: [
            {
                id: 'm1',
                sender: 'Wai',
                text: 'Postmortem for yesterday’s incident at 4pm. Root cause: confidence. Trauma optional.',
                sentAt: 'Yesterday at 3:00 PM',
                outgoing: false
            },
            {
                id: 'm2',
                sender: 'Corey',
                text: 'Action item: fewer Friday deploys. Action item 2: know that action item 1 will not happen.',
                sentAt: 'Yesterday at 3:05 PM',
                outgoing: false
            },
            {
                id: 'm3',
                sender: 'Matheus',
                text: 'Add "monitor the monitor" to the list. Meta.',
                sentAt: 'Yesterday at 3:08 PM',
                outgoing: false
            }
        ]
    },
    {
        id: 'people-ops',
        section: 'channels',
        kind: 'channel',
        name: 'people-ops',
        initials: '#',
        preview: 'Tara: reminder — expense reports',
        time: 'Mon',
        unread: false,
        messages: [
            {
                id: 'm1',
                sender: 'Megan',
                text: 'Teamweek swag at the desk. Size "runs large", like an optimistic estimate.',
                sentAt: 'Mon at 10:00 AM',
                outgoing: false
            },
            {
                id: 'm2',
                sender: 'Tara',
                text: 'Friendly reminder: expense reports due Friday. "I\'ll do it later" is not a workflow.',
                sentAt: 'Mon at 10:12 AM',
                outgoing: false
            }
        ]
    },
    {
        id: 'felix-dm',
        section: 'dms',
        kind: 'dm',
        name: 'Felix Li',
        initials: 'FL',
        preview: 'Still on for the 5pm demo?',
        time: '2:20 PM',
        unread: true,
        online: true,
        messages: [
            {
                id: 'm1',
                sender: 'Felix',
                text: 'Hey — Teamweek demo at 5pm still happening?',
                sentAt: 'Today at 2:15 PM',
                outgoing: false
            },
            {
                id: 'm2',
                sender: 'Felix',
                text: 'Does not need to be pretty. Needs to be honest about what works 😄',
                sentAt: 'Today at 2:18 PM',
                outgoing: false
            },
            {
                id: 'm3',
                text: 'Still on. Windows 95 pretty, 2026 code.',
                sentAt: 'Today at 2:20 PM',
                outgoing: true
            }
        ]
    },
    {
        id: 'corey-dm',
        section: 'dms',
        kind: 'dm',
        name: 'Corey Baker',
        initials: 'CB',
        preview: 'Staff review: approved with caveats',
        time: '1:30 PM',
        unread: false,
        online: true,
        messages: [
            {
                id: 'm1',
                sender: 'Corey',
                text: 'Saw the canvas. Staff review: approved with caveats.',
                sentAt: 'Today at 1:22 PM',
                outgoing: false
            },
            {
                id: 'm2',
                sender: 'Corey',
                text: 'Caveat: do not reexport Range on Turbopack or the demo becomes performance art.',
                sentAt: 'Today at 1:25 PM',
                outgoing: false
            },
            {
                id: 'm3',
                text: 'Noted. Range stays out, sanity stays in.',
                sentAt: 'Today at 1:30 PM',
                outgoing: true
            }
        ]
    },
    {
        id: 'wil-dm',
        section: 'dms',
        kind: 'dm',
        name: 'Wil Moura',
        initials: 'WM',
        preview: 'Does this run locally or is it a screenshot?',
        time: '12:48 PM',
        unread: false,
        online: true,
        messages: [
            {
                id: 'm1',
                sender: 'Wil',
                text: 'Does this run locally or is it a screenshot? Engineer question, not hater question.',
                sentAt: 'Today at 12:40 PM',
                outgoing: false
            },
            {
                id: 'm2',
                text: 'Runs locally. `/tony-canvas` — jump in and send a msg in fake #teamweek-2026.',
                sentAt: 'Today at 12:45 PM',
                outgoing: true
            },
            {
                id: 'm3',
                sender: 'Wil',
                text: 'Respect. I will break it after lunch, as tradition demands.',
                sentAt: 'Today at 12:48 PM',
                outgoing: false
            }
        ]
    },
    {
        id: 'wai-dm',
        section: 'dms',
        kind: 'dm',
        name: 'Wai Chung Hon',
        initials: 'WH',
        preview: 'Status update in 3 bullets?',
        time: '11:50 AM',
        unread: false,
        online: true,
        messages: [
            {
                id: 'm1',
                sender: 'Wai',
                text: 'Hackathon status update in 3 bullets? (yes, I know it is spiritually Saturday)',
                sentAt: 'Today at 11:42 AM',
                outgoing: false
            },
            {
                id: 'm2',
                text: '1) React95 UI ok 2) messaging mock ok 3) real integration = stretch goal',
                sentAt: 'Today at 11:47 AM',
                outgoing: true
            },
            {
                id: 'm3',
                sender: 'Wai',
                text: 'Perfect. Stretch goal is optional; clear communication is not 👍',
                sentAt: 'Today at 11:50 AM',
                outgoing: false
            }
        ]
    },
    {
        id: 'nicolle-dm',
        section: 'dms',
        kind: 'dm',
        name: 'Nicolle Coelho',
        initials: 'NC',
        preview: 'Can I copy the layout for my project?',
        time: 'Yesterday',
        unread: true,
        online: false,
        messages: [
            {
                id: 'm1',
                sender: 'Nicolle',
                text: 'This sidebar layout is great. Can I copy it for my Teamweek project?',
                sentAt: 'Yesterday at 6:10 PM',
                outgoing: false
            },
            {
                id: 'm2',
                text: 'Go for it — it is a hackathon, not patent warfare.',
                sentAt: 'Yesterday at 6:12 PM',
                outgoing: true
            },
            {
                id: 'm3',
                sender: 'Nicolle',
                text: 'I will swap the jokes. Maybe the teal. But the teal is identity now.',
                sentAt: 'Yesterday at 6:15 PM',
                outgoing: false
            }
        ]
    },
    {
        id: 'megan-dm',
        section: 'dms',
        kind: 'dm',
        name: 'Megan Z Campbell',
        initials: 'MC',
        preview: 'Team name for the board?',
        time: 'Yesterday',
        unread: false,
        online: false,
        messages: [
            {
                id: 'm1',
                sender: 'Megan',
                text: 'Need the team name for the Teamweek board. Something professional… or at least pronounceable.',
                sentAt: 'Yesterday at 4:00 PM',
                outgoing: false
            },
            {
                id: 'm2',
                text: '"bitcomplete retrograde" — retro in the UI, grade in the code.',
                sentAt: 'Yesterday at 4:05 PM',
                outgoing: true
            },
            {
                id: 'm3',
                sender: 'Megan',
                text: 'Registering it. If we win, Win95 laptop stickers for everyone.',
                sentAt: 'Yesterday at 4:08 PM',
                outgoing: false
            }
        ]
    },
    {
        id: 'dylan-dm',
        section: 'dms',
        kind: 'dm',
        name: 'Dylan Trotter',
        initials: 'DT',
        preview: 'Show business impact in the demo',
        time: 'Mon',
        unread: false,
        online: false,
        messages: [
            {
                id: 'm1',
                sender: 'Dylan',
                text: 'In the demo, 30 seconds of "why it matters" before "how it works". Customer > component.',
                sentAt: 'Mon at 2:00 PM',
                outgoing: false
            },
            {
                id: 'm2',
                text: 'Got it. Problem: chaotic internal comms. Solution: funny but usable fake channel.',
                sentAt: 'Mon at 2:08 PM',
                outgoing: true
            },
            {
                id: 'm3',
                sender: 'Dylan',
                text: 'Exactly. And if there is time, show what stays out of the hackathon (auth, real backend).',
                sentAt: 'Mon at 2:12 PM',
                outgoing: false
            }
        ]
    }
];

export const SECTION_LABELS: Record<ConversationSection, string> = {
    starred: 'Starred',
    channels: 'Channels',
    dms: 'Direct messages'
};
