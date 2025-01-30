import { UnistylesRegistry } from 'react-native-unistyles'

const lightTheme = {
    colors: {
        background: '#fbfbfe',
        primary: '#2f27ce',
        text: '#040316',
        card: '#dddbff'
    },
    spacing: {
        sm: 8,
        md: 16,
        lg: 24
    }
}

const darkTheme = {
    colors: {
        background: '#010104',
        primary: '#3a31d8',
        text: '#eae9fc',
        card: '#020024'
    },
    spacing: {
        sm: 8,
        md: 16,
        lg: 24
    }
}

UnistylesRegistry
    .addThemes({
        light: lightTheme,
        dark: darkTheme
    }).addConfig({
        initialTheme: "light" as any,
    });

export { lightTheme, darkTheme }