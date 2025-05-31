// 'use client';

import { ComponentPropsWithoutRef } from 'react';

type ChevronIconType = {
  stroke?: string;
  // children: ReactNode;
} & ComponentPropsWithoutRef<'svg'>;

export default function ChevronIcon({ stroke = `#3E3E3E`, ...props }: ChevronIconType) {
  return (
    <>
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="13" height="9" viewBox="0 0 9 5" fill="none">
        <path d="M1.07422 0.815918L4.69107 4.43277L8.30791 0.815918" stroke={stroke} strokeWidth="1.00468"
              strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );
}
