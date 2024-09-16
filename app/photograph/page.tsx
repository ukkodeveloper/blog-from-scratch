'use client';

import Txt from '@/components/Txt';
import _projectImages from './(data)/projectImages.json';

import Image from 'next/image';

const PhotographerPortfolio = () => {
  const projectImages = _projectImages as Record<string, string[]>;
  const projects = Object.keys(projectImages);

  return (
    <div className="h-[100svh] overflow-y-hidden">
      <div className="w-max-[650px]">
        <Txt as="h1" fontSize="2xl" className="px-4 py-2">
          _wrks
        </Txt>
        <div className=" h-[100svh] overflow-y-auto">
          {projects.map((project, index) => (
            <div
              key={project + index}
              className="group relative mx-2 flex w-full flex-shrink-0"
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
                    className="text-s m-auto w-fit text-black opacity-0 transition duration-500 group-hover:opacity-100"
                  >
                    {str}
                  </Txt>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Txt
          fontSize="xl"
          className="absolute bottom-4 right-10 from-neutral-400 font-wSans text-white"
        >
          KIM YOOKWON
        </Txt>
      </div>
    </div>
  );
};

export default PhotographerPortfolio;
