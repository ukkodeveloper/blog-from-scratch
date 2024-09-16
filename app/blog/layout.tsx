import NavBar from '@/components/NavBar';

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="py-4">
      <NavBar />
      {children}
    </div>
  );
}
