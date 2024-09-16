import { createRoot } from 'react-dom/client';
import React from 'react';
import { createTheme, MantineProvider } from '@mantine/core';
import { NavigationProgress } from '@mantine/nprogress';
import App from './App';
import '@mantine/core/styles.css';
import '@mantine/nprogress/styles.css';

const root = document.getElementById("root");

const theme = createTheme({
    primaryColor: "violet",
    fontSizes: {
        xs: "30px"
    },
    colors: {
        dark: [
            '#C1C2C5',
            '#A6A7AB',
            '#909296',
            '#5c5f66',
            '#373A40',
            '#2C2E33',
            '#25262b',
            '#1A1B1E',
            '#141517',
            '#101113',
        ]
    },
    components: {
        ActionIcon: {
            defaultProps: { variant: "light" }
        },
        Button: {
            defaultProps: { variant: "light" }
        }
    }
});

createRoot(root!).render(
    <React.StrictMode>
        <MantineProvider theme={theme} defaultColorScheme='dark'>
            <App />
            <NavigationProgress />
        </MantineProvider>
    </React.StrictMode>
);