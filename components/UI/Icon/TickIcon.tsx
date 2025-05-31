// 'use client';

type TickIconType = {
  width: number;
  height: number;
  strokeColor: string;
  // children: ReactNode;
}

export default function TickIcon({ width, height, strokeColor }: TickIconType) {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`}
           fill="none">
        <path d="M2.75 8.75L6.25 12.25L13.25 4.75" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round"
              strokeLinejoin="round" />
      </svg>
    </>
  );
}
