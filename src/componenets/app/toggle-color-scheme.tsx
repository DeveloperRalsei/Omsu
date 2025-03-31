import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";

export const ToggleColorScheme = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    useHotkeys([["0", toggleColorScheme]]);

    return (
        <ActionIcon
            color={colorScheme === "dark" ? "yellow" : "teal"}
            onClick={toggleColorScheme}
        >
            {colorScheme === "dark" ? <IconSunFilled /> : <IconMoonFilled />}
        </ActionIcon>
    );
};
