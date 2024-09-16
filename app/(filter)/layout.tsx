import BlogPageContainer from '@/components/BlogPageContainer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <BlogPageContainer>{children}</BlogPageContainer>;
}
