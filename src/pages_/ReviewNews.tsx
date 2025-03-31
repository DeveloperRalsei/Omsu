import { usePage } from "../componenets/context/PageContext";

export default function ReviewNews() {
  const { newsletterId } = usePage();
  return <div>{newsletterId}</div>;
}
