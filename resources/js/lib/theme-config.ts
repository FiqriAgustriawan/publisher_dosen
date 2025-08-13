type ThemeConfig = {
    primary: string;
    background: string;
    header: string;
    headerText: string;
    card: string;
    border: string;
    button: {
        primary: string;
        secondary: string;
    };
    text: {
        primary: string;
        secondary: string;
        muted: string;
        light:string;
    };
};

export const themeConfig: Record<'light' | 'dark', ThemeConfig> = {
    light: {
        primary: 'text-green-800',
        background: 'bg-white',
        header: 'bg-green-800',
        headerText: 'text-white',
        card: 'bg-white',
        border: 'border-green-100',
        button: {
            primary: 'bg-green-800 text-white hover:bg-green-700',
            secondary: 'border-2 border-green-800 text-green-800 hover:bg-green-50'
        },
        text: {
            primary: 'text-gray-900',
            secondary: 'text-gray-600',
            muted: 'text-gray-500',
            light: 'text-gray-200'
        }
    },
    dark: {
        primary: 'text-white',
        background: 'bg-zinc-950',
        header: 'bg-zinc-900',
        headerText: 'text-white',
        card: 'bg-zinc-900',
        border: 'border-zinc-800',
        button: {
            primary: 'bg-white text-zinc-900 hover:bg-zinc-100',
            secondary: 'border-2 border-white text-white hover:bg-zinc-800'
        },
        text: {
            primary: 'text-white',
            secondary: 'text-zinc-300',
            muted: 'text-zinc-400',
            light: 'text-zinc-500'
        }
    }
};