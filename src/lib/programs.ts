import { APPLETS, type Applet } from '@/lib/applets';

export type Program = {
    id: string;
    href: string;
    title: string;
    exe: string;
    description?: string;
};

const SYSTEM_PROGRAMS: Program[] = [
    {
        id: 'home',
        href: '/',
        title: 'Home',
        exe: 'the-bear.exe',
        description: 'Desktop and welcome window'
    },
    {
        id: 'design-system',
        href: '/design-system',
        title: 'Design System',
        exe: 'DesignSystem.exe',
        description: 'React95 component catalog'
    }
];

function appletToProgram(applet: Applet): Program {
    return {
        id: applet.href.replace(/^\//, ''),
        href: applet.href,
        title: applet.title,
        exe: applet.exe ?? `${applet.title.replace(/\s+/g, '')}.exe`,
        description: applet.description
    };
}

export const PROGRAMS: Program[] = [...SYSTEM_PROGRAMS, ...APPLETS.map(appletToProgram)];

export function programForPath(pathname: string): Program | undefined {
    if (pathname === '/') return SYSTEM_PROGRAMS[0];

    return PROGRAMS.find(
        (p) => p.href !== '/' && (pathname === p.href || pathname.startsWith(`${p.href}/`))
    );
}
