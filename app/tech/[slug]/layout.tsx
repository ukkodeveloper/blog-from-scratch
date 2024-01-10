export default function PostLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <article className="prose">{children}</article>;
}
