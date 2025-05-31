// 'use client';

import { calculateDaysPassed } from '@/utils/functions/calculateDaysPassed';
import ButtonGoTo from '@/components/UI/Button/ButtonGoTo';
import React from 'react';
import { CldImage } from 'next-cloudinary';
import ImagePreloader from '@/assets/map/image-preloader.png';

type PointPopupType = {
  imageUrl: string;
  price: string;
  title: string;
  location: string;
  createdAt: string;
  href: string;
  // children: ReactNode;
}

export default function PointPopup({ imageUrl, title, price, location, createdAt, href }: PointPopupType) {
  return (
    <>
      <div className={`flex items-center gap-3.5 rounded-2xl w-fit pb-2 relative`}>
        <div className={`relative min-w-[83px] h-[120px]`}>
          <CldImage
            format={`auto`}
            placeholder="blur"
            blurDataURL={ImagePreloader.src}
            alt={title}
            fill
            src={imageUrl}
            className={`rounded-2xl object-cover absolute`} />
        </div>
        <div className={`flex flex-col gap-2 min-w-48`}>
          <span className={`text-lg font-semibold text-zinc-900`}>${price}</span>
          <p>{title}</p>
          <p className={`text-zinc-500`}>{location}</p>
          <div className={`flex justify-between items-center`}>
            <ButtonGoTo href={href} type={`red`} />
            <span>{calculateDaysPassed(createdAt)} days ago</span>
          </div>
        </div>
        <svg className={`absolute top-3 right-3`} xmlns="http://www.w3.org/2000/svg" width="24" height="21"
             viewBox="0 0 24 21" fill="none">
          <path
            d="M21.5766 6.45645C21.0197 6.49001 20.4696 6.59537 19.9397 6.76989C19.401 6.92108 18.8766 7.11919 18.3725 7.36194C17.8636 7.58005 17.3839 7.86083 16.9446 8.19777C16.4961 8.50761 16.0765 8.85727 15.6908 9.2426C15.3023 9.64729 14.9416 10.0778 14.6112 10.5312C14.2995 10.987 14.0202 11.4641 13.7754 11.9591C13.5477 12.4695 13.35 12.9928 13.1833 13.5263C13.0454 14.0649 12.9407 14.6116 12.8699 15.1631C12.833 14.6067 12.7277 14.0569 12.5564 13.5263C12.4053 12.9876 12.2071 12.4632 11.9644 11.9591C11.7463 11.4502 11.4655 10.9705 11.1286 10.5312C10.8102 10.0782 10.4611 9.64768 10.0837 9.2426C9.67864 8.86523 9.24808 8.51614 8.79514 8.19777C8.35582 7.86083 7.87614 7.58005 7.36724 7.36194C6.86806 7.1079 6.34251 6.90937 5.80004 6.76989C5.27019 6.59537 4.72002 6.49001 4.16318 6.45645C4.16318 6.76989 4.12835 7.08333 4.12835 7.39677C4.1149 8.03977 4.17331 8.68222 4.30249 9.31223C4.36737 9.62972 4.44875 9.94358 4.54628 10.2526C4.61941 10.5644 4.72444 10.8678 4.85972 11.1581C4.97275 11.4545 5.10061 11.7451 5.24281 12.0287L5.73039 12.8646L6.32244 13.6308L6.94932 14.3273L7.64586 14.989L8.41205 15.5462C8.69068 15.7552 8.96927 15.8945 9.2479 16.0686L10.1186 16.4866L10.9892 16.8L11.9295 17.0438L12.8699 17.1831L13.8102 17.0438L14.7505 16.8L15.656 16.4866L16.5267 16.0686L17.3277 15.5462L18.0939 14.989C18.3427 14.7866 18.5755 14.5654 18.7904 14.3273C19.0285 14.1124 19.2497 13.8795 19.4521 13.6308L20.0094 12.8646C20.1835 12.586 20.3576 12.3073 20.4969 12.0287L20.9149 11.1581L21.2283 10.2526C21.3145 9.94306 21.3843 9.62915 21.4373 9.31223C21.5007 9.00155 21.5472 8.68764 21.5766 8.3719C21.6235 8.04912 21.6352 7.72212 21.6114 7.39677C21.6172 7.08293 21.6055 6.76901 21.5766 6.45645Z"
            fill="url(#paint0_linear_1224_5845)" />
          <path
            d="M15.0638 5.86443C15.0709 6.0162 15.0592 6.16827 15.029 6.31718C14.9985 6.47255 14.9518 6.6243 14.8897 6.76993L14.6807 7.15302L14.4021 7.50129L14.0538 7.7799L13.6359 7.98886L13.218 8.12815H12.3125L11.8598 7.98886L11.4767 7.7799L11.1284 7.50129L10.815 7.15302L10.606 6.76993L10.4667 6.31718C10.4667 6.17787 10.4319 6.03856 10.4319 5.86443C10.4319 5.6903 10.4667 5.58582 10.4667 5.44651C10.4667 5.3072 10.5712 5.13307 10.606 4.99376L10.815 4.61067L11.1284 4.2624C11.2283 4.15097 11.346 4.05683 11.4767 3.98379L11.8598 3.77482L12.3125 3.63552H13.218L13.6359 3.77482L14.0538 3.98379L14.4021 4.2624L14.6807 4.61067L14.8897 4.99376C14.9565 5.13763 15.0034 5.28995 15.029 5.44651C15.0578 5.58386 15.0694 5.72422 15.0638 5.86443Z"
            fill="#FB3838" />
          <defs>
            <linearGradient id="paint0_linear_1224_5845" x1="4.12646" y1="11.8198" x2="21.6234" y2="11.8198"
                            gradientUnits="userSpaceOnUse">
              <stop stopColor="#FB3838" />
              <stop offset="1" stopColor="#F27155" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
