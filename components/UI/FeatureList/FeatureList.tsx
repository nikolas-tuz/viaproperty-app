// 'use client';

type FeatureListType = {
  text: string;
  // children: ReactNode;
}

import React from 'react';

export default function FeatureList({ text }: FeatureListType) {
  return (
    <>
      <div className={`flex gap-2.5 items-center`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 16 10" fill="none">
          <path
            d="M1.71954 5.6584L4.41497 8.35383M8.18858 4.04114L10.884 1.3457M6.03223 5.6584L8.72766 8.35383L15.1967 1.3457"
            stroke="white" strokeWidth="1.61726" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p>{text}</p>
      </div>
    </>
  );
}
