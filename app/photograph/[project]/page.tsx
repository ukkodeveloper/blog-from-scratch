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
      <div className="group m-auto w-fit transition-colors duration-500 group-hover:bg-black ">
        {images.map((image, index) => (
          <ImageWithModal key={image + index} image={image} />
        ))}
      </div>
    </PhotographPageContainer>
  );
};

export default Page;
