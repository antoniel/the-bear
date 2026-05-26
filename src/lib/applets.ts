export type Applet = {
    href: string;
    title: string;
    description: string;
    tag?: string;
};

export const APPLETS: Applet[] = [
    {
        href: '/tony-canvas',
        title: 'Teamweek Messenger',
        description:
            'Slack-style messaging UI with React95 chrome — bitcomplete Teamweek hackathon playground.',
        tag: 'React95'
    }
];
