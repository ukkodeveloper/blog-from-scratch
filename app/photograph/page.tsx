import Txt from '@/components/Txt';
import _projectImages from './(data)/projectImages.json';

import Image from 'next/image';
import PhotographPageContainer from './(components)/photographPageContainer';
import Link from 'next/link';

const PhotographerPortfolio = () => {
  const projectImages = _projectImages as Record<string, string[]>;
  const projects = Object.keys(projectImages);

  return (
    <PhotographPageContainer title="_wrks">
      {projects.map((project, index) => (
        <Link
          href={`/photograph/${project}`}
          key={project + index}
          className="group relative flex w-full flex-shrink-0"
        >
          <Image
            width={650}
            height={1400}
            src={projectImages[project][0]}
            alt={`Gallery image ${project}`}
            className="w-full object-cover transition duration-500 group-hover:scale-90"
          />
          <div className="absolute right-3 top-10">
            {[...project].map((str, index) => (
              <Txt
                key={str + index}
                className="text-s m-auto w-fit text-white opacity-0 transition duration-500 group-hover:opacity-100"
              >
                {str}
              </Txt>
            ))}
          </div>
        </Link>
      ))}
    </PhotographPageContainer>
  );
};

export default PhotographerPortfolio;
