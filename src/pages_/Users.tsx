import {
  Stack,
  TextInput,
  Flex,
  ActionIcon,
  Pagination,
  SimpleGrid,
  Group,
} from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import { FormEvent, useState } from "react";
import { baseUrl } from "../App";
import axios from "axios";
import { nprogress } from "@mantine/nprogress";
import { showNotification } from "@mantine/notifications";
import { User } from "../types";
import UserCard from "../componenets/users/UserCard";

