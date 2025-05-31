// 'use client';

type ExpandIconType = {
  state: boolean;
  // children: ReactNode;
}

import React from 'react';

export default function ExpandIcon({ state }: ExpandIconType) {
  return (
    <>
      {state && (
        <>
          <svg className={`cursor-pointer`} xmlns="http://www.w3.org/2000/svg" width="13" height="3" viewBox="0 0 13 3"
               fill="none">
            <path d="M1.31934 1.68481H11.408" stroke="url(#paint0_linear_383_7683)" strokeWidth="1.68145"
                  strokeLinecap="round" />
            <defs>
              <linearGradient id="paint0_linear_383_7683" x1="1.31934" y1="2.18481" x2="11.408" y2="2.18481"
                              gradientUnits="userSpaceOnUse">
                <stop stopColor="#FB3838" />
                <stop offset="1" stopColor="#F27155" />
              </linearGradient>
            </defs>
          </svg>
        </>
      )}
      {!state && (
        <>
          <svg className={`cursor-pointer`} xmlns="http://www.w3.org/2000/svg" width="12" height="10"
               viewBox="0 0 12 10" fill="none">
            <path d="M1 5H11.0887M6 9V1" stroke="url(#paint0_linear_1042_7979)" strokeWidth="1.68145"
                  strokeLinecap="round" />
            <defs>
              <linearGradient id="paint0_linear_1042_7979" x1="1" y1="5" x2="11.0887" y2="5"
                              gradientUnits="userSpaceOnUse">
                <stop stopColor="#FB3838" />
                <stop offset="1" stopColor="#F27155" />
              </linearGradient>
            </defs>
          </svg>
        </>
      )}
    </>
  );
}
