export const palette = {
  black: '#0A0A0A',
  white: '#FFFFFF',
  lime: '#7ED321',
  orange: '#FF7A00',
  blue: '#007AFF',
  charcoal: '#111111',
  softGray: '#F4F4F5',
  gray700: '#3F3F46',
  gray500: '#71717A',
  gray300: '#D4D4D8',
  danger: '#EF4444'
} as const;

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, xxxl: 48 } as const;
export const radius = { sm: 10, md: 16, lg: 24, pill: 999 } as const;
export const typography = {
  title: { fontSize: 32, fontWeight: '800' as const, letterSpacing: -1 },
  h1: { fontSize: 28, fontWeight: '800' as const },
  h2: { fontSize: 22, fontWeight: '700' as const },
  body: { fontSize: 16, fontWeight: '400' as const },
  label: { fontSize: 13, fontWeight: '700' as const, letterSpacing: 0.5 }
} as const;

export const lightTheme = {
  mode: 'light' as const,
  colors: {
    background: palette.white,
    surface: palette.softGray,
    elevated: palette.white,
    border: palette.gray300,
    text: palette.black,
    muted: palette.gray500,
    primary: palette.lime,
    secondary: palette.orange,
    info: palette.blue,
    danger: palette.danger
  }
};

export const darkTheme = {
  mode: 'dark' as const,
  colors: {
    background: palette.black,
    surface: palette.charcoal,
    elevated: '#171717',
    border: '#27272A',
    text: palette.white,
    muted: '#A1A1AA',
    primary: palette.lime,
    secondary: palette.orange,
    info: palette.blue,
    danger: palette.danger
  }
};

export type AppTheme = typeof lightTheme;
