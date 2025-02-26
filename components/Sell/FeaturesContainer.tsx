'use client';

import { ReactNode, useState } from 'react';
import ContainerBox from '@/components/Layout/Container/ContainerBox';

type FeaturesContainerType = {
  children: ReactNode;
  heading: string;
}

export default function FeaturesContainer({ children, heading }: FeaturesContainerType) {
  const [questionMarkVisibility, setQuestionMarkVisibility] = useState<boolean>(false);
  return (
    <>
      <div>
        <ContainerBox
          questionMark={{
            visible: true,
            content: `Just enter a valid initials(1 to 100 characters) and at least 1 phone number related(max 3). You can add up to 2 contacts.`
          }}
          questionMarkVisibility={questionMarkVisibility}
          setQuestionMarkVisibility={setQuestionMarkVisibility}>
          <div>
            <h3 className={`text-zinc-700 text-xl font-semibold mb-5`}>{heading}</h3>

            <div className={`flex justify-center gap-4 flex-col`}>
              {children}
            </div>
          </div>
        </ContainerBox>
      </div>
    </>
  );
}
