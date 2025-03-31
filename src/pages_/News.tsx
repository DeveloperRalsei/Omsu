import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../App";
import { Newsletter } from "../types";
import { SimpleGrid, Skeleton } from "@mantine/core";
import { NewsLetterCard } from "../componenets/newsletter/NewsLetterCard";
import { nprogress } from "@mantine/nprogress";

export default News;
