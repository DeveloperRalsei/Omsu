import { createRoot } from "react-dom/client";
import React from "react";
import { createTheme, MantineProvider } from "@mantine/core";
import { NavigationProgress } from "@mantine/nprogress";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/notifications/styles.css";
import "./styles.css";

const root = document.getElementById("root");
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

export const queryClient = new QueryClient();

const theme = createTheme({
    primaryColor: "pink",
    fontSizes: {
        xs: "30px",
    },
    colors: {
        dark: [
            "#C1C2C5",
            "#A6A7AB",
            "#909296",
            "#5c5f66",
            "#373A40",
            "#2C2E33",
            "#25262b",
            "#1A1B1E",
            "#141517",
            "#101113",
        ],
    },
    components: {
        ActionIcon: {
            defaultProps: { variant: "light", size: "lg" },
        },
        Button: {
            defaultProps: { variant: "light" },
        },
        Tootlip: {
            defaultProps: {
                events: { touch: true },
            },
        },
    },
});

createRoot(root!).render(
    <React.StrictMode>
        <MantineProvider theme={theme} forceColorScheme="dark">
            <Notifications />
            <ModalsProvider>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
                <NavigationProgress />
            </ModalsProvider>
        </MantineProvider>
    </React.StrictMode>,
);
