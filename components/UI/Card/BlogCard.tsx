// 'use client';

type BlogCardType = {
  image: {
    src: StaticImageData;
    alt: string;
  }
  title: string;
  timeToReadInMins: number;
  tags: string[];
  // children: ReactNode;
}

import Image, { StaticImageData } from 'next/image';
import ViapropertyHeading from '@/components/Typography/ViapropertyHeading';
import ButtonActive from '@/components/UI/Button/ButtonActive';
import Paragraph from '@/components/Typography/Paragraph';
import Link from 'next/link';

export default function BlogCard({ image, title, timeToReadInMins, tags }: BlogCardType) {
  return (
    <>
      <div className={`flex gap-8 flex-col bp-620:flex-row`}>
        <div className={`w-44 h-44 self-center bp-620:self-start`}>
          <Image className={`object-cover`} src={image.src} alt={image.alt} />
        </div>
        <div>
          <ViapropertyHeading customClasses={`mb-2`} headingSize={`sm`}
                              label={title} />
          <div className={`flex items-center gap-3 mb-3.5`}>
            <div className={`flex items-center gap-1`}>
              <div className={`p-1.5 rounded-full border border-red-500`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7.01044 0.333252C10.6924 0.333252 13.6771 3.31793 13.6771 6.99994C13.6771 10.682 10.6924 13.6666 7.01044 13.6666C3.32843 13.6666 0.34375 10.682 0.34375 6.99994C0.34375 3.31793 3.32843 0.333252 7.01044 0.333252ZM7.01044 1.66659C5.59595 1.66659 4.23939 2.22849 3.23919 3.22869C2.23899 4.22889 1.67709 5.58545 1.67709 6.99994C1.67709 8.41443 2.23899 9.77099 3.23919 10.7712C4.23939 11.7714 5.59595 12.3333 7.01044 12.3333C8.42493 12.3333 9.78149 11.7714 10.7817 10.7712C11.7819 9.77099 12.3438 8.41443 12.3438 6.99994C12.3438 5.58545 11.7819 4.22889 10.7817 3.22869C9.78149 2.22849 8.42493 1.66659 7.01044 1.66659ZM7.01044 2.99993C7.17373 2.99995 7.33133 3.0599 7.45335 3.1684C7.57538 3.27691 7.65334 3.42643 7.67244 3.5886L7.67711 3.6666V6.72394L9.48178 8.52861C9.60134 8.64858 9.67076 8.80957 9.67593 8.97887C9.6811 9.14817 9.62164 9.31309 9.50961 9.44013C9.39759 9.56718 9.24141 9.64682 9.07279 9.66288C8.90418 9.67894 8.73577 9.63022 8.60178 9.52661L8.53911 9.47128L6.5391 7.47127C6.43549 7.36757 6.36894 7.23261 6.34977 7.08727L6.34377 6.99994V3.6666C6.34377 3.48978 6.41401 3.32021 6.53903 3.19519C6.66406 3.07017 6.83363 2.99993 7.01044 2.99993Z"
                    fill="url(#paint0_linear_721_11964)" />
                  <defs>
                    <linearGradient id="paint0_linear_721_11964" x1="0.34375" y1="6.99994" x2="13.6771"
                                    y2="6.99994" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FB3838" />
                      <stop offset="1" stopColor="#F27155" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <p className={`bg-clip-text text-transparent bg-linear-main-red font-bold`}>{timeToReadInMins} min</p>
            </div>

            <div className={`flex gap-1`}>
              {tags.slice(0, 2).map((tag, index) => (
                <ButtonActive active={true} key={index} color={`red`} size={`small`} label={tag} />
              ))}
              <ButtonActive active={false} color={`red`} size={`small`} label={`+${tags.length - 2}`} />
            </div>

          </div>
          <Paragraph
            text={`We have a good video tour here! It is a wonderful home with a lot of space and a great view.`} />
          <div className={`mt-3.5 pb-4`}>
            <Link
              className={`bg-linear-main-red text-white px-4 bp-620:py-2 py-3 rounded-full font-semibold inline-block
              transition-all duration-200 hover:scale-105 hover:animate-pulse`}
              href={`/blog/1`}>See More</Link>
          </div>
        </div>
      </div>
    </>
  );
}

