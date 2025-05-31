// 'use client';

/*type BlogDescriptionType = {
  // children: ReactNode;
}*/

import MainContainer from '@/components/Layout/Container/MainContainer';
import Link from 'next/link';
import ViapropertyHeading from '@/components/Typography/ViapropertyHeading';
import ButtonActive from '@/components/UI/Button/ButtonActive';
import Paragraph from '@/components/Typography/Paragraph';
import HighlightText from '@/components/Typography/HighlightText';
import Image from 'next/image';
import VideoPreviewImg from '@/assets/videoPreview.png';
import WorkVideoConference from '@/assets/blog/Work-Video-conference.png';
import PropertyTags from '@/components/PropertyDescription/Layout/PropertyTags';
import React from 'react';
import { BlogTagsEnum } from '@/utils/enums/BlogTags';
import HeadingWithParagraph from '@/components/Typography/HeadingWithParagraph';
import ActivityDetail from '@/components/Layout/Activity/ActivityDetail';
import { AccountActivityIconsTypeEnum } from '@/components/UI/Icon/AccountActivityIcon';
import MarketingDigitalAdsImg from '@/assets/blog/Marketing-Digital-ads-performance-01.png';
import HeadingMedium from '@/components/Typography/HeadingMedium';
import MetricDisplayRatingHero from '@/components/UI/MetricDisplay/MetricDisplayRatingHero';
import MetricDisplayRating from '@/components/UI/MetricDisplay/MetricDisplayRating';
import BlogComments from '@/components/Blog/BlogComments';
import LatestPosts from '@/components/Home/Layout/LatestPosts';
import LeaveBlogComment from '@/components/Blog/LeaveBlogComment';

export default function BlogDescription(/*{  }: BlogDescriptionType*/) {
  return (
    <MainContainer>
      <div className={`mt-16`}>

        <section className={`flex items-center justify-between flex-col bp-620:flex-row mb-14 bp-620:mb-0`}>
          <div>
            <Link className={`flex items-center gap-2 bg-clip-text text-transparent bg-linear-main-red font-bold
            border  border-red-500 rounded-full px-4 py-2 text-[15.5px] w-fit mb-5`}
                  href={`/blog`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                <path
                  d="M4.87683 9.16541C4.72949 9.31555 4.52967 9.3999 4.32133 9.3999C4.11298 9.3999 3.91316 9.31555 3.76582 9.16541L0.230049 5.56131C0.0827471 5.41112 -1.32019e-06 5.20744 -1.33876e-06 4.99507C-1.35732e-06 4.7827 0.082747 4.57902 0.230049 4.42882L3.76582 0.824728C3.91401 0.678836 4.11248 0.598108 4.3185 0.599933C4.52451 0.601758 4.72158 0.685988 4.86726 0.834484C5.01294 0.982979 5.09558 1.18386 5.09737 1.39385C5.09916 1.60385 5.01996 1.80616 4.87683 1.95721L2.74987 4.19416L10.2143 4.19416C10.4227 4.19416 10.6225 4.27854 10.7699 4.42874C10.9172 4.57894 11 4.78265 11 4.99507C11 5.20748 10.9172 5.4112 10.7699 5.5614C10.6225 5.7116 10.4227 5.79598 10.2143 5.79598L2.74987 5.79598L4.87683 8.03292C5.02414 8.18311 5.10688 8.38679 5.10688 8.59916C5.10688 8.81154 5.02414 9.01521 4.87683 9.16541Z"
                  fill="#FB3838" />
              </svg>
              Go Back</Link>

            <ViapropertyHeading customClasses={`max-w-4xl mb-4`} headingSize={`lg`}
                                label={`A Spellbinding Video Tour through Chateux!`} />

            <div className={`flex items-center gap-4 mb-9 overflow-x-auto scrollbar-thin text-nowrap`}>
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
                <p className={`bg-clip-text text-transparent bg-linear-main-red font-bold`}>4 min</p>
              </div>
              <ButtonActive active={true} color={`red`} size={`small`} label={`Top Trending`} />
              <ButtonActive active={true} color={`red`} size={`small`} label={`Newest`} />
              <ButtonActive active={true} color={`red`} size={`small`} label={`Hot`} />
            </div>

            <div className={`mb-14`}>
              <Paragraph customClasses={`max-w-4xl`} text={(
                <>
                  Discover the beauty of Chateux with this spellbinding video tour! This home is a wonderful place with
                  a
                  lot
                  of space and a great view.
                  We can also see the beautiful garden and the pool. <HighlightText
                  text={`The video tour is a great way to see the property and get a feel for the space.`} />
                </>
              )} />
            </div>
          </div>
          <div>
            <Image className={`object-cover`} src={WorkVideoConference} alt={`Work Video Conference`} />
          </div>
        </section>

        <section className={`rounded-xl`}>
          <Image className={`min-h-96 object-cover`} src={VideoPreviewImg} alt={`Video Preview`} />
        </section>
        <section className={`max-w-[918px] mb-10`}>
          <PropertyTags propertyId={'1'} landlordId={'1'} visibility={{ shareIcon: true }} rating={4.1}
                        tags={[BlogTagsEnum.POPULAR, BlogTagsEnum.TOPTRENDING]} />
        </section>
        <section className={`mb-11`}>
          <ViapropertyHeading headingSize={`md`} label={`Interested in the details?`} />
          <HeadingWithParagraph
            heading={`Details about current video tour`}
            paragraph={(
              <>
                This video tour is a great way to see the property and get a feel for the space. It is a wonderful place
                with a lot of space and a great view. We can also see the beautiful garden and the pool. The video tour
                is
                a great way to see the property and get a feel for the space. It is a wonderful place with a lot of
                space
                and a great view. We can also see the beautiful garden and the pool.
              </>
            )} />

          <HeadingWithParagraph heading={`More about this spellbinding property`} paragraph={(
            <>
              This property is not expensive and is a great place to live. It is a wonderful place with a lot of space.
              It was built in 1923 and has a lot of history. The property is a great place to live and is a wonderful
              gift.
            </>
          )} />

        </section>
        <section className={`flex gap-16 flex-col bp-896:flex-row mb-12 bp-896:mb-0`}>
          <div>
            <div className={`flex flex-col gap-5 mb-12`}>
              <ActivityDetail
                requestType={`formal`}
                customContainerClasses={``}
                messageFont={`text-[19px] font-medium`}
                trashCanVisibility={false} circleColor={`emptyBorderRed`}
                iconType={
                  AccountActivityIconsTypeEnum.user} date={`Creator`}
                message={`Nikolas Baker`} />

              <ActivityDetail
                requestType={`formal`}
                customContainerClasses={``}
                messageFont={`text-[19px] font-medium`}
                trashCanVisibility={false} circleColor={`emptyBorderRed`}
                iconType={
                  AccountActivityIconsTypeEnum.time} date={`Time of Creation`}
                message={`August 13, 2024 at 13:34`} />
            </div>
            <HeadingMedium customClasses={`mb-8`} heading={`User Reviews & Ratings`} />
            <MetricDisplayRatingHero propertyFor={`rent`} overallRating={4.4} ratingsCount={18} />
          </div>
          <div className={`self-center bp-896:self-start`}>
            <Image src={MarketingDigitalAdsImg} alt={`Marketing Digital Ads`} />
          </div>
        </section>


        <section className={`mb-14`}>
          <div className={`flex items-center gap-y-24`}>
            <div className={`flex flex-col gap-6 items-center`}>
              <div className={`flex bp-1160:flex-row bp-1160:gap-24 items-center mr-auto flex-col gap-4`}>
                <MetricDisplayRating label={`Quality`} rating={4.3} size={`md`} />
                <MetricDisplayRating label={`Joy`} rating={4} size={`md`} />
              </div>

              <div className={`flex bp-1160:flex-row bp-1160:gap-24 items-center mr-auto flex-col gap-4`}>
                <MetricDisplayRating label={`Informativeness`} rating={4.5} size={`md`} />
                <MetricDisplayRating label={`Duration`} rating={4.3} size={`md`} />
              </div>
            </div>
          </div>
        </section>

        <section className={`max-w-4xl mb-20`}>
          <BlogComments />
        </section>

        <section className={`mt-12 mb-16`}>
          <LeaveBlogComment />
        </section>

        <section>
          <LatestPosts />
        </section>

      </div>
    </MainContainer>
  );
}
