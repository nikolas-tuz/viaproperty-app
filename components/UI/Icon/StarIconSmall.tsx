// 'use client';

import { ComponentPropsWithoutRef } from 'react';

type StarIconSmallType = {
  dimensions?: { width: number; height: number };
  active?: boolean;
  // children: ReactNode;
} & ComponentPropsWithoutRef<'svg'>;

export default function StarIconSmall({
                                        dimensions = { width: 16, height: 15 },
                                        active = true,
                                        ...props
                                      }: StarIconSmallType) {
  const { height, width } = dimensions;

  if (!active) {
    return (
      <>
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
          <path
            d="M6.94519 1.24637C7.2772 0.224548 8.7228 0.224548 9.05481 1.24637L9.99613 4.14347C10.1446 4.60044 10.5705 4.90983 11.0509 4.90983H14.0971C15.1715 4.90983 15.6183 6.28468 14.749 6.91619L12.2846 8.7067C11.8959 8.98913 11.7332 9.48973 11.8817 9.9467L12.823 12.8438C13.1551 13.8656 11.9855 14.7153 11.1163 14.0838L8.65191 12.2933C8.26318 12.0109 7.73682 12.0109 7.34809 12.2933L4.88367 14.0838C4.01446 14.7153 2.84495 13.8656 3.17696 12.8438L4.11828 9.9467C4.26676 9.48973 4.1041 8.98913 3.71538 8.7067L1.25096 6.91619C0.381748 6.28468 0.828463 4.90983 1.90287 4.90983H4.94906C5.42955 4.90983 5.85539 4.60044 6.00387 4.14347L6.94519 1.24637Z"
            fill="url(#paint0_linear_1340_13741)" fillOpacity="0.2" />
          <defs>
            <linearGradient id="paint0_linear_1340_13741" x1="-2" y1="8" x2="18" y2="8" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FB3838" />
              <stop offset="1" stopColor="#F27155" />
            </linearGradient>
          </defs>
        </svg>
      </>
    );
  }

  return (
    <>
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width={width} height={height}
           viewBox={`0 0 ${width} ${height}`}
           fill="none">
        <path
          d="M6.94519 1.24637C7.2772 0.224548 8.7228 0.224548 9.05481 1.24637L9.99613 4.14347C10.1446 4.60044 10.5705 4.90983 11.0509 4.90983H14.0971C15.1715 4.90983 15.6183 6.28468 14.749 6.91619L12.2846 8.7067C11.8959 8.98913 11.7332 9.48973 11.8817 9.9467L12.823 12.8438C13.1551 13.8656 11.9855 14.7153 11.1163 14.0838L8.65191 12.2933C8.26318 12.0109 7.73682 12.0109 7.34809 12.2933L4.88367 14.0838C4.01446 14.7153 2.84495 13.8656 3.17696 12.8438L4.11828 9.9467C4.26676 9.48973 4.1041 8.98913 3.71538 8.7067L1.25096 6.91619C0.381748 6.28468 0.828463 4.90983 1.90287 4.90983H4.94906C5.42955 4.90983 5.85539 4.60044 6.00387 4.14347L6.94519 1.24637Z"
          fill="url(#paint0_linear_1340_13737)" />
        <defs>
          <linearGradient id="paint0_linear_1340_13737" x1="-2" y1="8" x2="18" y2="8" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FB3838" />
            <stop offset="1" stopColor="#F27155" />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
}
