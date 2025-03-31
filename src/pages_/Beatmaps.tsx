import {
    ActionIcon,
    SimpleGrid,
    Stack,
    TextInput,
    Group,
    Pagination,
    Skeleton,
} from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import { nprogress } from "@mantine/nprogress";
import { IconSearch, IconX } from "@tabler/icons-react";
import { baseUrl } from "../App";
import { showNotification } from "@mantine/notifications";
import { beatmapset } from "../types";
import BeatmapSetCard from "../componenets/beatmap/BeatmapSetCard";

export default QueryBeatmap;
