import { Outlet, createRootRoute, useLocation } from "@tanstack/react-router";
import App from "../App";
import { routes } from "../data/routes";
import { NotFoundComponent } from "../componenets/app/not-found-component";
import { showNotification } from "@mantine/notifications";

export const Route = createRootRoute({
    component: RootComponent,
    // errorComponent: ErrorComponent,
    notFoundComponent: NotFoundComponent,
    onError: (err) => {
        showNotification({
            color: "red",
            message: "Something went wrong:" + JSON.stringify(err),
        });
    },
    head: () => ({
        meta: [
            {
                name: "description",
                content: "An easy data fetcher for osu users",
            },
            {
                name: "author",
                content: "Developer Ralsei",
            },
            {
                name: "keywords",
                content:
                    "osu, omsu, osu api, osu data, easy to use, developer ralsei, devrals, uwu ",
            },
        ],
    }),
});

function RootComponent() {
    const { pathname } = useLocation();

    const title = routes.find((r) => r.path === pathname);

    return (
        <App title={title?.label!}>
            <Outlet />
        </App>
    );
}
