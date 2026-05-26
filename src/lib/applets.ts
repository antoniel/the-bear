export type Applet = {
    href: string;
    title: string;
    exe?: string;
    description: string;
    tag?: string;
};

export const APPLETS: Applet[] = [
    {
        href: '/tony-canvas',
        title: 'Teamweek Messenger',
        exe: 'Messenger.exe',
        description:
            'Slack-style messaging UI with React95 chrome — bitcomplete Teamweek hackathon playground.',
        tag: 'React95'
    }
];
