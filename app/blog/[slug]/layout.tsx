import BlogPageContainer from '@/components/BlogPageContainer';
import NavBar from '@/components/NavBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <BlogPageContainer>
      <NavBar />
      {children}
    </BlogPageContainer>
  );
}
