declare module "*.mdx" {
    const content: string;
    const props: Record<string, unknown>;
    export default content;
}
