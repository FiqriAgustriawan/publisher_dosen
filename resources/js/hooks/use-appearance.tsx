import { useCallback, useEffect, useState } from 'react';

export type Appearance = 'light' | 'dark' | 'system';

// Theme configuration dengan class untuk Tailwind 4
export const themeConfig = {
    light: {
        background: 'bg-white',
        text: {
            primary: 'text-gray-900',
            secondary: 'text-gray-700',
            muted: 'text-gray-500',
            light: 'text-gray-200'
        },
        card: 'bg-white',
        border: 'border-gray-200',
        header: 'bg-green-800',
        headerText: 'text-white'
    },
    dark: {
        background: 'bg-gray-900',
        text: {
            primary: 'text-gray-100',
            secondary: 'text-gray-300',
            muted: 'text-gray-400',
            light: 'text-gray-400'
        },
        card: 'bg-gray-800',
        border: 'border-gray-700',
        header: 'bg-green-900',
        headerText: 'text-gray-100'
    }
};

const prefersDark = () => {
    if (typeof window === 'undefined') {
        return false;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const applyTheme = (appearance: Appearance) => {
    if (typeof document === 'undefined') {
        return;
    }

    const isDark = appearance === 'dark' || (appearance === 'system' && prefersDark());

    // Toggle dark class untuk Tailwind
    document.documentElement.classList.toggle('dark', isDark);
};

const mediaQuery = () => {
    if (typeof window === 'undefined') {
        return null;
    }
    return window.matchMedia('(prefers-color-scheme: dark)');
};

const handleSystemThemeChange = () => {
    const currentAppearance = localStorage.getItem('appearance') as Appearance;
    applyTheme(currentAppearance || 'system');
};

export function initializeTheme() {
    const savedAppearance = (localStorage.getItem('appearance') as Appearance) || 'system';
    applyTheme(savedAppearance);
    mediaQuery()?.addEventListener('change', handleSystemThemeChange);
}

export function useAppearance() {
    const [appearance, setAppearance] = useState<Appearance>('system');

    const theme = appearance === 'dark' || (appearance === 'system' && prefersDark())
        ? themeConfig.dark
        : themeConfig.light;

    const updateAppearance = useCallback((mode: Appearance) => {
        // Tampilkan loading overlay
        const overlay = document.createElement('div');
        overlay.className = 'theme-changing';
        overlay.innerHTML = '<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>';
        document.body.appendChild(overlay);

        // Simpan preferensi tema
        localStorage.setItem('appearance', mode);
        setCookie('appearance', mode);
        applyTheme(mode);

        // Reload halaman setelah delay singkat
        setTimeout(() => {
            window.location.reload();
        }, 200);
    }, []);

    useEffect(() => {
        const savedAppearance = localStorage.getItem('appearance') as Appearance | null;
        if (savedAppearance) {
            setAppearance(savedAppearance);
            applyTheme(savedAppearance);
        } else {
            setAppearance('system');
            applyTheme('system');
        }

        return () => mediaQuery()?.removeEventListener('change', handleSystemThemeChange);
    }, []);

    return { appearance, updateAppearance, theme } as const;
}
