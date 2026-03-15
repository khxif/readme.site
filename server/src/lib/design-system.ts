export const designSystem = {
  themes: [
    {
      name: 'light',
      colors: {
        background: 'oklch(0.9195 0.0169 88.0030)',
        foreground: 'oklch(0.2350 0 0)',
        card: 'oklch(0.9530 0.0156 86.4257)',
        'card-foreground': 'oklch(0.2350 0 0)',
        popover: 'oklch(0.9530 0.0156 86.4257)',
        'popover-foreground': 'oklch(0.2350 0 0)',
        primary: 'oklch(0.3012 0 0)',
        'primary-foreground': 'oklch(0.9169 0.0175 99.6160)',
        secondary: 'oklch(0.8647 0.0201 87.5232)',
        'secondary-foreground': 'oklch(0.3012 0 0)',
        muted: 'oklch(0.8340 0.0232 87.1630)',
        'muted-foreground': 'oklch(0.4688 0.0136 84.5932)',
        accent: 'oklch(0.9169 0.0175 99.6160)',
        'accent-foreground': 'oklch(0.3012 0 0)',
        destructive: 'oklch(0.5771 0.2152 27.3250)',
        'destructive-foreground': 'oklch(1 0 0)',
        border: 'oklch(0.8434 0.0231 87.1621)',
        input: 'oklch(0.8434 0.0231 87.1621)',
        ring: 'oklch(0.3012 0 0)',
      },
    },

    {
      name: 'dark',
      colors: {
        background: 'oklch(0 0 0)',
        foreground: 'oklch(0.8141 0 0)',
        card: 'oklch(0.2264 0 0)',
        'card-foreground': 'oklch(0.9173 0.0133 82.4015)',
        popover: 'oklch(0.2264 0 0)',
        'popover-foreground': 'oklch(0.9173 0.0133 82.4015)',
        primary: 'oklch(0.4325 0.0376 198.3573)',
        'primary-foreground': 'oklch(1 0 0)',
        secondary: 'oklch(0.3329 0 0)',
        'secondary-foreground': 'oklch(0.8055 0.0194 100.1916)',
        muted: 'oklch(0.1344 0 0)',
        'muted-foreground': 'oklch(0.6348 0.0113 81.7875)',
        accent: 'oklch(0.3329 0 0)',
        'accent-foreground': 'oklch(0.8520 0.0205 100.6306)',
        destructive: 'oklch(0.6368 0.2078 25.3313)',
        'destructive-foreground': 'oklch(1 0 0)',
        border: 'oklch(0.1822 0 0)',
        input: 'oklch(0.3904 0 0)',
        ring: 'oklch(0.5103 0 0)',
      },
    },
  ],

  tokens: {
    typography: {
      sans: 'Google Sans Flex, ui-sans-serif, sans-serif, system-ui',
      serif: 'Google Sans Flex, ui-sans-serif, sans-serif, system-ui',
      mono: 'Google Sans Code, ui-monospace, monospace',
    },

    radius: {
      base: '1rem',
      sm: 'calc(1rem - 4px)',
      md: 'calc(1rem - 2px)',
      lg: '1rem',
      xl: 'calc(1rem + 4px)',
    },

    shadows: {
      xs: '0 1px 10px 0px hsl(0 0% 0% / 0.03)',
      sm: '0 1px 10px 0px hsl(0 0% 0% / 0.05), 0 1px 2px -1px hsl(0 0% 0% / 0.05)',
      md: '0 1px 10px 0px hsl(0 0% 0% / 0.05), 0 2px 4px -1px hsl(0 0% 0% / 0.05)',
      lg: '0 1px 10px 0px hsl(0 0% 0% / 0.05), 0 4px 6px -1px hsl(0 0% 0% / 0.05)',
      xl: '0 1px 10px 0px hsl(0 0% 0% / 0.05), 0 8px 10px -1px hsl(0 0% 0% / 0.05)',
      '2xl': '0 1px 10px 0px hsl(0 0% 0% / 0.13)',
    },
  },
};
