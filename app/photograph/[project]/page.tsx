import _projectImages from '../(data)/projectImages.json';

import ImageWithModal from '../(components)/Image';
import PhotographPageContainer from '@/components/PhotographPageContainer';

interface PageParams {
  params: {
    project: string;
  };
}

export async function generateStaticParams() {
  return Object.keys(_projectImages);
}

const Page = ({ params }: PageParams) => {
  const projectImages = _projectImages as Record<string, string[]>;
  const images = projectImages[params.project];
  return (
    <PhotographPageContainer title={`_wrks_${params.project}`}>
      <div className="group-hover:black group m-auto min-h-[100svh] w-fit transition-colors  duration-500">
        {images.map((image, index) => (
          <ImageWithModal key={image + index} image={image} />
        ))}
      </div>
    </PhotographPageContainer>
  );
};

export default Page;
