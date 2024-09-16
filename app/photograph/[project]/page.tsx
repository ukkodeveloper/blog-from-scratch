import _projectImages from '../(data)/projectImages.json';
import PhotographPageContainer from '../(components)/photographPageContainer';
import Image from 'next/image';

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
        {images.map((image) => (
          <div key={image} className="group relative flex w-full flex-shrink-0">
            <Image
              width={650}
              height={1400}
              src={image}
              alt={`Gallery image ${image}`}
              className="w-full object-cover transition duration-500 group-hover:scale-90"
            />
          </div>
        ))}
      </div>
    </PhotographPageContainer>
  );
};

export default Page;
