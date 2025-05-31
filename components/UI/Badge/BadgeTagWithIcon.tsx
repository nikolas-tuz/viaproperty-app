// 'use client';

import { ReactNode } from 'react';

type BadgeTagWithIconType = {
  icon: `wifi`
  label: string;
  // children: ReactNode;
}

export default function BadgeTagWithIcon({ icon, label }: BadgeTagWithIconType) {
  let iconEl: ReactNode = null;

  switch (icon) {
    case `wifi`:
      iconEl = (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
            <path
              d="M10.3371 15.8714H10.3457M7.90091 13.4352C8.5471 12.7892 9.42339 12.4263 10.3371 12.4263C11.2508 12.4263 12.1271 12.7892 12.7733 13.4352M5.46387 10.9981C6.10382 10.3581 6.86356 9.85048 7.69971 9.50412C8.53586 9.15776 9.43205 8.97949 10.3371 8.97949C11.2421 8.97949 12.1383 9.15776 12.9745 9.50412C13.8106 9.85048 14.5704 10.3581 15.2103 10.9981"
              stroke="#00202A" strokeWidth="1.7229" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.02783 8.56191C7.06459 4.52429 13.6099 4.52429 17.6725 8.56191" stroke="#00202A"
                  strokeWidth="1.7229" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </>
      );
      break;
  }

  return (
    <>
      <div className={`flex gap-2 whitespace-nowrap`}>
        {iconEl}
        <span className={`inline-block text-sm font-semibold text-zinc-800`}>{label}</span>
      </div>
    </>
  );
}
