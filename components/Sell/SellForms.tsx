'use client';

import { switchSteps } from '@/utils/functions/sell/switchSteps';
import BadgeStages from '@/components/UI/Badge/BadgeStages';
import FirstForm from '@/components/Sell/FirstForm';
import SecondForm from '@/components/Sell/SecondForm';
import ThirdForm from '@/components/Sell/ThirdForm';
import FourthForm from '@/components/Sell/FourthForm';
import FifthForm from '@/components/Sell/FifthForm';
import HighlightText from '@/components/Typography/HighlightText';
import { useState } from 'react';
import { activeStateType } from '@/components/Sell/SellInputContent';
import BulkyLink from '@/components/UI/Link/BulkyLink';

/*type SellFormsType = {
  // children: ReactNode;
}*/

export default function SellForms(/*{ mode }: SellFormsType*/) {

  const createAdvertStack = {
    stepOne: `disabled`,
    stepTwo: `disabled`,
    stepThree: `disabled`,
    stepFour: `disabled`,
    finishingSteps: `active`
  } as activeStateType;

  const [activeState, setActiveState] = useState<activeStateType>(createAdvertStack);

  const heading = activeState.stepOne === `active` ? `Fill in the most important!`
    : activeState.stepTwo === `active` ? `Add some details!`
      : activeState.stepThree === `active` ? `Good! Let's intersperse your advert with extras!`
        : activeState.stepFour === `active` ? `We are so close! Let's finish the advert!` : activeState.finishingSteps === `completed` ? `Huzzah! A New advert was successfully created!` : ``;

  return (
    <>
      <div className={`mb-7`}>
        <h2 className={`text-3xl bg-clip-text text-transparent bg-linear-main-red font-bold
          mb-5`}>{heading}</h2>
        <p className={`text-zinc-800`}>
          Almost all of the fields are optional. Do not worry that there are many! Let&#39;s just start filling the most
          important.</p>
      </div>
      <div className={`flex gap-2.5 items-center overflow-x-auto scrollbar-thin`}>
        <div
          onClick={activeState.stepOne === `completed` ? () => switchSteps(`stepOne`, setActiveState) : undefined}>
          <BadgeStages state={activeState.stepOne} label={`Step 1`} object={`stepOne`} />
        </div>
        <div
          onClick={activeState.stepTwo === `completed` ? () => switchSteps(`stepTwo`, setActiveState) : undefined}>
          <BadgeStages state={activeState.stepTwo} label={`Step 2`} object={`stepTwo`} />
        </div>
        <div className={``}
             onClick={activeState.stepThree === `completed` ? () => switchSteps(`stepThree`, setActiveState) : undefined}>
          <BadgeStages state={activeState.stepThree} label={`Step 3`} object={`stepThree`} />
        </div>
        <div
          onClick={activeState.stepFour === `completed` ? () => switchSteps(`stepFour`, setActiveState) : undefined}>
          <BadgeStages state={activeState.stepFour} label={`Step 4`} object={`stepFour`} />
        </div>
        <div
          onClick={activeState.stepFour === `completed` ? () => switchSteps(`finishingSteps`, setActiveState) : undefined}>
          <BadgeStages state={activeState.finishingSteps} label={`Finishing Steps`} object={`finishingSteps`} />
        </div>
      </div>
      {activeState.stepOne === `active` && <FirstForm mode={`createAdvert`} setActiveState={setActiveState} />}
      {activeState.stepTwo === `active` && <SecondForm mode={`createAdvert`} setActiveState={setActiveState} />}
      {activeState.stepThree === `active` && <ThirdForm mode={`createAdvert`} setActiveState={setActiveState} />}
      {activeState.stepFour === `active` && <FourthForm mode={`createAdvert`} setActiveState={setActiveState} />}
      {activeState.finishingSteps === `active` &&
        <FifthForm mode={`createAdvert`} setActiveState={setActiveState} />}

      {activeState.finishingSteps === `completed` && (
        <div className={`mt-9`}>
          <p className={`leading-relaxed text-zinc-900 max-w-4xl mb-12`}>Ut enim ad minim veniam, quis nostrud
            exercitation ullamco
            laboris nisi ut
            aliquip ex ea commodo consequat.
            Duis aute irure dolor in <HighlightText
              text={`reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`} /></p>

          <div className={`flex flex-col gap-6`}>
            <BulkyLink linkStyle={`red`} href={`#`} label={`See My Adverts`} />
            <BulkyLink linkStyle={`emptyBlack`} href={`/`} label={`Home`} />
          </div>
        </div>
      )}
    </>
  );
}
