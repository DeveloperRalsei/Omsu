import { Newsletter } from "../types";
import { usePage } from "./context/PageContext";

export default function NewsLetterRenderer() {
    const { newsletterId } = usePage();
    return "newsletter :3";
}
