// 'use client';

type LinkWithArrowType = {
  href: string;
  label: string
  style?: `blue` | `red`;
  // children: ReactNode;
}

import Link from 'next/link';

export default function LinkWithArrow({ href, label, style = `blue` }: LinkWithArrowType) {
  const blueStylesLink = `bg-clip-text text-transparent bg-linear-main-dark-blue`;
  const blueStylesContainer = `border-indigo-950`;

  const redStylesLink = `bg-clip-text text-transparent bg-linear-main-red`;
  const redStylesContainer = `border-red-500`;

  const chosenStylesLink = style === `blue` ? blueStylesLink : redStylesLink;
  const chosenStylesContainer = style === `blue` ? blueStylesContainer : redStylesContainer;

  const blueColorIcon = `#00202A`;
  const redColorIcon = `#FB3838`;

  return (
    <>
      <div className={`flex items-center gap-4`}>
        <div className={`flex items-center gap-1.5 w-fit rounded-full border ${chosenStylesContainer}
            px-5 py-3`}>
          <Link href={href} className={`${chosenStylesLink} font-bold
              text-xl`}>{label}</Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
            <path
              d="M1.7513 0.25V2.16667H9.98339L0.792969 11.3571L2.14422 12.7083L11.3346 3.51792V11.75H13.2513V0.25H1.7513Z"
              fill={style === `red` ? redColorIcon : `url(#paint0_linear_722_17286)`} />
            <defs>
              <linearGradient id="paint0_linear_722_17286" x1="0.792969" y1="1.46123" x2="17.6515" y2="-3.63241"
                              gradientUnits="userSpaceOnUse">
                <stop stopColor={style === `red` ? redColorIcon : blueColorIcon} />
                <stop offset="1" stopColor={style === `red` ? redColorIcon : blueColorIcon} stop-opacity="0.6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </>
  );
}
