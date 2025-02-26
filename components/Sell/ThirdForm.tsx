'use client';

import { scrollIntoViewFunc } from '@/utils/functions/scrollIntoViewFunc';
import HighlightText from '@/components/Typography/HighlightText';
import TagBadge from '@/components/UI/Badge/TagBadge';
import Features from '@/components/Sell/Features';
import LabelAndInput from '@/components/UI/Input/LabelAndInput';
import ChooseImage from '@/components/UI/Input/ChooseImage/ChooseImage';
import { activeStateType } from '@/components/Sell/SellInputContent';
import { setActiveStateFunc } from '@/utils/functions/sell/setActiveStateFunc';
import Button from '@/components/UI/Button/Button';
import { FormEvent, useState } from 'react';
import { SnackbarDataType } from '@/components/PropertyDescription/Layout/PropertyTags';
import SnackbarMUI, { SnackBarSeverityType } from '@/components/UI/Snackbar/SnackbarMUI';
import { contactsSchema } from '@/utils/schemas/sell/third-step/thirdFormSellSchemas';

export type ContactAndViewingArrangementsType = {
  initials: string;
  phones: string[];
};

export type PriceAndTaskHistoryType = {
  history: string;
};

export type FloorPlansType = {
  heading: string;
  shortDescription: string;
  images: string[];
};

type ThirdFormType = {
  setActiveState?: (prevState: activeStateType) => void;
  mode: `createAdvert` | `editAdvert`;
  defaultValues?: {
    contactAndViewingArrangements: ContactAndViewingArrangementsType[];
    priceAndTaskHistory: PriceAndTaskHistoryType;
    floorPlans: FloorPlansType[];
  };
  // children: ReactNode;
}

type ContactDetailType = {
  initials: string;
  phone1: string;
  phone2?: string;
  phone3?: string
}

export default function ThirdForm({ setActiveState, defaultValues }: ThirdFormType) {
  const [contactAndViewingArrangements, setContactAndViewingArrangements] = useState<ContactAndViewingArrangementsType[]>(defaultValues?.contactAndViewingArrangements || []);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [priceAndTaskHistory, setPriceAndTaskHistory] = useState<PriceAndTaskHistoryType | null>(defaultValues?.priceAndTaskHistory || null);
  const [floorPlans, setFloorPlans] = useState<FloorPlansType[]>(defaultValues?.floorPlans || []);

  const [snackbarState, setSnackbarState] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<SnackbarDataType>({ severity: `error`, message: `` });

  const [extraNumberInputs, setExtraNumberInputs] = useState(0);

  function setActiveStateDeclaration(activeState: activeStateType) {
    scrollIntoViewFunc(`.sell-heading`);
    if (setActiveState) {
      setActiveStateFunc(activeState, setActiveState);
    }
  }

  function handleSnackbarOpen(severity: SnackBarSeverityType, message: string) {
    setSnackbarState(true);
    setSnackbarMessage({ severity, message });
  }

  function excludeContact(initials: string) {
    setContactAndViewingArrangements((prev) =>
      prev.filter((contact) => contact.initials !== initials));
  }

  function excludeFloorPlan(label: string) {
    setFloorPlans((prev) => prev.filter((floorPlan) => floorPlan.heading !== label));
  }

  function handleAddNewContact(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { phone1, phone2, phone3, initials } = Object.fromEntries(formData.entries()) as ContactDetailType;

    const phoneNumbers = [phone1, phone2, phone3].filter(Boolean).map(phone => phone!.trim());

    // filter phone numbers from undefined

    const validate = contactsSchema.safeParse({ initials, phoneNumbers });

    if (!validate.success) {
      handleSnackbarOpen(`error`, validate.error.errors[0].message);
      return;
    }

    setContactAndViewingArrangements((prevState) => [...prevState, { initials, phones: phoneNumbers }]);

    e.currentTarget.reset();

    handleSnackbarOpen(`success`, `A new contact "${initials} - (${[...phoneNumbers].toString()})" was successfully added.`);

    // Use the rest of the form data and phoneNumbers as needed
  }

  return (
    <>
      <SnackbarMUI severity={snackbarMessage.severity} message={snackbarMessage.message} state={{
        open: snackbarState, setOpen:
        setSnackbarState
      }} />
      <div className={`flex flex-col mt-9`}>
        <h2 className={`bg-clip-text text-transparent bg-linear-main-red font-bold text-2xl mb-10`}>Contact & Viewing
          Arrangements *</h2>
        <p className={`leading-relaxed text-zinc-900`}>Please provide your valid initials and phone number(s). These
          details would help your potential customer to get in touch with you.</p>
        <div className={`mt-6 mb-9`}>
          <div className={`flex gap-3.5 items-center overflow-x-auto scrollbar-thin`}>
            {!contactAndViewingArrangements.length && (
              <h2 className={`text-zinc-900 font-semibold`}>No contact and viewing arrangements added yet. At least one
                contact is required.</h2>
            )}
            {(contactAndViewingArrangements && contactAndViewingArrangements.length > 0) && contactAndViewingArrangements.map((contact, index) => {
                const formattedPhones = contact.phones.map((item) => item.slice(0, 3) + `..` + item.slice(8, -1));
                /*@ts-ignore*/
                return (
                  <TagBadge tooltipText={`Click to delete. Details: ${contact.initials} - [${contact.phones.join(', ')}]`}
                            setItems={() => excludeContact(contact.initials)}
                            key={index} label={`${contact.initials} - [${formattedPhones.join(', ')}]`} />
                );
              }
            )}
          </div>
        </div>
        <form onSubmit={handleAddNewContact} className={`mb-12`}>
          <Features featureHeading={`Contact Details`}>
            <LabelAndInput minLength={1} maxLength={100} labelStyle={`grey-and-small`} name={`initials`}
                           placeholder={`e.g. John Doe`}
                           customClassNames={`bp-620:w-72 text-custom-medium`} label={`Initials`} inputType={`text`} />
            <div className={`flex flex-col gap-2 justify-start`}>
              <LabelAndInput maxLength={20} minLength={1} labelStyle={`grey-and-small`} name={`phone1`}
                             placeholder={`e.g. +380123456789`}
                             customClassNames={`bp-620:w-72 text-custom-medium`} label={`Phone Number`}
                             inputType={`number`} />
              {extraNumberInputs >= 1 && (
                <LabelAndInput maxLength={20} minLength={1} labelStyle={`grey-and-small`} name={`phone2`}
                               placeholder={`e.g. +380123456789`}
                               customClassNames={`bp-620:w-72 text-custom-medium`} label={`Phone Number 2`}
                               inputType={`number`} />
              )}
              {extraNumberInputs === 2 && (
                <LabelAndInput maxLength={20} minLength={1} labelStyle={`grey-and-small`} name={`phone3`}
                               placeholder={`e.g. +380123456789`}
                               customClassNames={`bp-620:w-72 text-custom-medium`} label={`Phone Number 3`}
                               inputType={`number`} />
              )}
              {extraNumberInputs <= 1 && (
                <button
                  onClick={() => setExtraNumberInputs((prevState) => extraNumberInputs === 2 ? extraNumberInputs : prevState + 1)}
                  type={`button`}
                  className={`text-normal text-left font-medium text-zinc-400`}>Add extra
                  number
                </button>
              )}
            </div>
            <div className={`mt-3 flex items-center gap-2`}>
              <button
                className={`bg-clip-text text-lg text-transparent bg-linear-main-red font-bold
                transition-all duration-200 hover:animate-pulse`}>Add Contact
              </button>

            </div>
          </Features>
        </form>
        <div className={`mb-9`}>
          <h2 className={`text-2xl bg-clip-text text-transparent bg-linear-main-red font-bold mb-6`}>Price & Task
            History</h2>
          <p className={`leading-relaxed text-zinc-900 max-w-4xl`}>Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Alias consequuntur doloribus enim, fugiat harum incidunt maiores minus nulla provident <HighlightText
              text={`quam quibusdam quod ratione saepe voluptatem?`} /></p>
        </div>
        <div className={`mb-12`}>
          <LabelAndInput defaultValue={priceAndTaskHistory?.history} required inputType={`text`}
                         labelStyle={`grey-and-small`} name={`propertyPriceHistory`}
                         placeholder={`e.g. The task history of the property was..`}
                         customClassNames={`max-w-[528px] h-[155px]`} type={`textarea`}
                         label={`Tell us about your task history and property price`} />
        </div>
        <div>
          <h2 className={`text-2xl bg-clip-text text-transparent bg-linear-main-red font-bold mb-6`}>Floor Plans
            (Optional)</h2>
          <p className={`leading-relaxed text-zinc-900 max-w-4xl`}>Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Alias consequuntur doloribus enim, fugiat harum incidunt maiores minus nulla provident <HighlightText
              text={`quam quibusdam quod ratione saepe voluptatem?`} /></p>
          <div className={`mt-6 mb-9`}>
            <div className={`flex gap-3.5 items-center overflow-x-auto scrollbar-thin`}>
              {!floorPlans.length && (
                <h2 className={`text-zinc-900 font-semibold`}>No floor plans added yet.</h2>
              )}
              {(floorPlans && floorPlans.length > 0) && floorPlans.map((floorPlan, index) => (
                <TagBadge setItems={excludeFloorPlan} key={index} label={floorPlan.heading} />
              ))}
            </div>
          </div>
          <div>
            <Features featureHeading={`Floor Plans`}>
              <LabelAndInput labelStyle={`grey-and-small`} name={`heading`} placeholder={`e.g. Overall Building`}
                             customClassNames={`bp-620:w-72 text-custom-medium`} label={`Heading`} inputType={`text`} />
              <LabelAndInput type={`textarea`} labelStyle={`grey-and-small`} name={`short-description`}
                             placeholder={`e.g. This is the overall building floor plan.`}
                             customClassNames={`bp-620:w-72 h-36 text-custom-medium`} label={`Short Description`}
                             inputType={`text`} />
              <div className={`overflow-x-auto scrollbar-thin max-w-[270px]`}>
                <ChooseImage
                  imagesState={{
                    setImages: () => {
                    }, images: []
                  }}
                  max={3} min={0} />
              </div>
              <div className={`mt-3`}>
                <button type={`button`}
                        className={`bg-clip-text text-lg text-transparent bg-linear-main-red font-bold`}>Add
                </button>
              </div>
            </Features>
          </div>
          <div className={`mt-12`}>
            {setActiveState && (
              <Button type={`button`} label={`Next`}
                // @ts-ignore
                      onClick={() => setActiveStateDeclaration({ stepThree: `completed`, stepFour: `active` })} />
            )}
            {!setActiveState && (
              <Button type={`button`} label={`Save Changes`} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}