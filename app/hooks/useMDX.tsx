import { useMDXComponent } from 'next-contentlayer/hooks';
import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

const useMDX = (code: string) => {
  const MDXContent = useMDXComponent(code);

  const mdxComponents: MDXComponents = {
    img: ({ src, ...rest }) => {
      if (!src) return;
      const srcWithSlash = src.startsWith('/') ? src : `\/${src}`;

      return <img src={srcWithSlash} {...rest} />;
    },
    a: ({ href, children }) => <Link href={href ?? ''}>{children}</Link>,
  };

  return { MDXComponent: () => <MDXContent components={mdxComponents} /> };
};

export default useMDX;
