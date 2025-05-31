'use client';

import { activeStateType } from '@/components/Sell/SellInputContent';
import LabelAndInput from '@/components/UI/Input/LabelAndInput';
import LabelAndSelect from '@/components/UI/Select/LabelAndSelect';
import LocationLabel from '@/components/UI/Label/LocationLabel';
import ChooseImage, { ImagesArrayType } from '@/components/UI/Input/ChooseImage/ChooseImage';
import Button from '@/components/UI/Button/Button';
import HighlightText from '@/components/Typography/HighlightText';
import { scrollIntoViewFunc } from '@/utils/functions/scrollIntoViewFunc';
import { setActiveStateFunc } from '@/utils/functions/sell/setActiveStateFunc';
import ValidationParagraph from '@/components/Typography/ValidationParagraph';
import {
  descriptionSchema,
  mapChosenCoordinatesSchema,
  ownershipSchema,
  propertyAreaSchema,
  propertyForSchema,
  propertyPriceSchema,
  titleSchema
} from '@/utils/schemas/sell/first-step/sellSchemasFirstStep';
import { useValidation } from '@/hooks/custom-hooks/useValidateInput';
import { useEffect, useState } from 'react';
import { getGeocode } from '@/utils/map/geocode';
import ChevronIcon from '@/components/UI/Icon/ChevronIcon';
import AIButton from '@/components/AI/buttons/AIButton';
import { windowExists } from '@/utils/functions/windowExists';
import AIModal, { GenerationForType } from '@/components/AI/modals/AIModal';
import SnackbarMUI, { SnackBarSeverityType } from '@/components/UI/Snackbar/SnackbarMUI';
import { SnackbarDataType } from '@/components/PropertyDescription/Layout/PropertyTags';
import { validateForm } from '@/utils/functions/sell/validateForm';
import SelectLocationOnMap from '@/components/UI/Map/SelectLocationOnMap';

type FirstFormType = {
  setActiveState?: (prevState: activeStateType) => void;
  mode: `createAdvert` | `editAdvert`;
  // children: ReactNode;
}

type PropertyLocationType = {
  title: string;
  country: string;
  city: string;
  location: {
    type: `Point`,
    coordinates: number[]
  },
};

export default function
  FirstForm({
              setActiveState,
              mode
            }: FirstFormType) {
  const [snackbarState, setSnackbarState] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<SnackbarDataType>({
    severity: `warning`,
    message: ``
  });

  const [AIModalState, setAIModalState] = useState(false);
  const [textareaValue, setTextareaValue] = useState<{ val: string; generatedFor: GenerationForType; }>({
    val: ``,
    generatedFor: `Property Title`
  });

  const [generationFor, setGenerationFor] = useState<GenerationForType | null>(null);
  const [expandOptionalFields, setExpandOptionalFields] = useState(false);

  const [mapChosenCoordinates, setMapChosenCoordinates] = useState<PropertyLocationType>();
  const [images, setImages] = useState<ImagesArrayType[]>([]);

  useEffect(() => {
    if (windowExists()) {
      const images = window.sessionStorage.getItem('images');
      const mapCoordinates = window.localStorage.getItem('mapCoordinates');
      if (images) {
        setImages(() => JSON.parse(images));
      }
      if (mapCoordinates) {
        setMapChosenCoordinates(() => JSON.parse(mapCoordinates));
      }
    }
  }, []);

  const { value: titleEntered, setValue: setTitleEntered, validationStage: titleInputStage } = useValidation(
    titleSchema,
    '',
    true,
    `title`
  );

  const {
    value: locationDescriptionEntered,
    setValue: setLocationDescriptionEntered,
    validationStage: locationDescriptionInputStage
  } = useValidation(
    descriptionSchema,
    '',
    true,
    `locationDescription`
  );

  const {
    value: propertyForChosen,
    setValue: setPropertyForChosen,
    validationStage: propertyForInputStage
  } = useValidation(
    propertyForSchema,
    '',
    true,
    'propertyFor'
  );

  const {
    value: descriptionEntered,
    setValue: setDescriptionEntered,
    validationStage: descriptionInputStage
  } = useValidation(
    descriptionSchema,
    '',
    true,
    'propertyDescription'
  );

  const {
    value: propertyAreaEntered,
    setValue: setPropertyAreaEntered,
    validationStage: propertyAreaInputStage
  } = useValidation(
    propertyAreaSchema,
    ``,
    true,
    `propertyArea`
  );

  const {
    value: propertyPriceEntered,
    setValue: setPropertyPriceEntered,
    validationStage: propertyPriceInputStage
  } = useValidation(
    propertyPriceSchema,
    ``,
    true,
    `propertyPrice`
  );

  const {
    value: ownershipSelected,
    setValue: setOwnershipSelected,
    validationStage: ownershipInputStage
  } = useValidation(
    ownershipSchema,
    ``,
    true,
    `ownership`
  );

  function handleShowSnackbar(message: string, severity: SnackBarSeverityType) {
    setSnackbarState(() => true);
    setSnackbarMessage({ message, severity });
  }

  function handleFillTheCorrespondingInput() {
    if (textareaValue?.val) {
      switch (textareaValue.generatedFor) {
        case 'Property Title':
          setTitleEntered(textareaValue.val);
          break;
        case 'Property Description':
          setDescriptionEntered(textareaValue.val);
          break;
        case 'Property Location Description':
          setLocationDescriptionEntered(textareaValue.val);
          break;
      }
    }
  }

  const handleMapClick = async (coordinates: { lat: number; lng: number }) => {
    try {
      const { country, city, address } = await getGeocode(coordinates.lat, coordinates.lng);
      const newMapObject: PropertyLocationType = {
        title: address || null,
        country: country || null,
        city: city || null,
        location: {
          type: 'Point',
          coordinates: [coordinates.lng, coordinates.lat]
        }
      };
      const validate = mapChosenCoordinatesSchema.safeParse(newMapObject);

      if (!validate.success) {
        handleShowSnackbar('Please provide a valid location on map.', `warning`);
        return;
      }

      setMapChosenCoordinates(newMapObject);

      if (windowExists()) {
        window.localStorage.setItem('mapCoordinates', JSON.stringify(newMapObject));
      }
    } catch (error) {
      handleShowSnackbar('Please provide a valid location on map.', `error`);
      console.error('Error fetching geocode:', error);
    }
  };

  function handleAIModalOpen(generationFor: GenerationForType) {
    setGenerationFor(() => generationFor);
    setAIModalState(() => true);
  }

  function setActiveStateDeclaration(activeState: activeStateType) {
    scrollIntoViewFunc(`.sell-heading`);
    if (setActiveState)
      setActiveStateFunc(activeState, setActiveState);
  }

  function handleNextFormSwitch() {

    const validate = [
      { stage: titleInputStage, label: `title`, optional: false },
      { stage: descriptionInputStage, label: `description`, optional: false },
      { stage: locationDescriptionInputStage, label: `location  description`, optional: false },
      { stage: ownershipInputStage, label: `ownership`, optional: true },
      { stage: propertyAreaInputStage, label: `property area`, optional: false },
      { stage: propertyPriceInputStage, label: `property price`, optional: false },
      { stage: propertyForInputStage, label: `property for`, optional: false }
    ];
    const failed = validateForm(validate);
    if (failed) {
      handleShowSnackbar(failed, `error`);
      return;
    }

    const validateMapCoordinates = mapChosenCoordinatesSchema.safeParse(mapChosenCoordinates);

    if (!validateMapCoordinates.success) {
      handleShowSnackbar('Please provide a valid location on map.', `warning`);
      return;
    }

    if (images.length < 2 || images.length > 6) {
      handleShowSnackbar('Please provide a valid amount of images.', `warning`);
      return;
    }
    // @ts-ignore
    setActiveStateDeclaration({ stepOne: `completed`, stepTwo: `active` });
  }

  return (
    <>
      <SnackbarMUI severity={snackbarMessage.severity} message={snackbarMessage.message}
                   state={{ open: snackbarState, setOpen: setSnackbarState }} />
      <AIModal
        handleFillTheCorrespondingInput={handleFillTheCorrespondingInput}
        textareaValueState={{ value: textareaValue, setValue: setTextareaValue }}
        generationFor={generationFor}
        modalState={{ open: AIModalState, setOpen: setAIModalState }} />
      <div className={`max-w-screen-md mt-8 flex justify-center flex-col gap-6`}>
        <div className={`flex items-center gap-3 flex-col bp-620:flex-row`}>
          <div>
            <LabelAndInput
              onChangeState={{ setValueEntered: setTitleEntered, valueEntered: titleEntered }}
              defaultValue={titleEntered}
              label={`Title`} required name={`title`}
              customClassNames={`bp-620:w-96`}
              placeholder={`e.g. Arizona Cottage close to Street N..`} inputType={`text`} />
            <ValidationParagraph text={`Title should contain from 5 to 100 characters long.`} stage={titleInputStage} />
          </div>
          <AIButton onClick={() => handleAIModalOpen(`Property Title`)} className={`mt-6`} />
        </div>
        <div className={`flex gap-3 items-center flex-col bp-620:flex-row`}>
          <div>
            <LabelAndInput
              onChangeState={{ setValueEntered: setDescriptionEntered, valueEntered: descriptionEntered }}
              defaultValue={descriptionEntered}
              type={`textarea`}
              label={`Description`}
              required
              name={`description`}
              customClassNames={`bp-620:w-[537px] min-h-[155px]`}
              placeholder={`e.g. Arizona Cottage close to Street N..`} inputType={`text`} />
            <ValidationParagraph text={`Description should contain from 5 to 4000 characters long.`}
                                 stage={descriptionInputStage} />
          </div>
          <AIButton onClick={() => handleAIModalOpen(`Property Description`)} />
        </div>

        <div>
          <h3 className={`text-zinc-700 font-semibold mb-3`}>Where is this property located? *</h3>
          <p className={`leading-relaxed`}><HighlightText text={`Click on the map`} /> to select your property location.
          </p>
        </div>
        <div className={`mb-9`}>
          {mapChosenCoordinates?.title && (
            <div className={`mb-4`}>
              <LocationLabel
                location={mapChosenCoordinates?.title} />
            </div>
          )}
          <div className={`bp-620:w-[565px] h-[299px] rounded-3xl mb-9 flex flex-col`}>
            <div className={`mb-5`}>
              <ValidationParagraph text={`Please select your  valid property location.`}
                                   stage={mapChosenCoordinates?.location.coordinates ? `success` : `neutral`} />
            </div>
            <SelectLocationOnMap initialCoordinates={mapChosenCoordinates ? {
              lat: mapChosenCoordinates.location.coordinates[1], lng:
                mapChosenCoordinates.location.coordinates[0]
            } : null} onMapClick={handleMapClick} />
          </div>
          <div className={`mb-9`}>
            <div className={`flex items-center gap-3 flex-col bp-620:flex-row`}>
              <div>
                <LabelAndInput
                  onChangeState={{
                    setValueEntered: setLocationDescriptionEntered,
                    valueEntered: locationDescriptionEntered
                  }}
                  type={`textarea`}
                  label={`Tell your potential customer shortly about location`}
                  required
                  defaultValue={locationDescriptionEntered}
                  name={`locationDescription`}
                  customClassNames={`bp-620:w-[537px] min-h-[155px]`}
                  placeholder={`e.g. This place is located at N Street, with calm neighborhood... `}
                  inputType={`text`} labelStyle={`grey-and-small`} />
                <ValidationParagraph text={`Location description is expected to be 5 to 4000 characters.`}
                                     stage={locationDescriptionInputStage} />
              </div>
              <div>
                <AIButton onClick={() => handleAIModalOpen(`Property Location Description`)} />
              </div>
            </div>
          </div>

          <div className={`mb-9`}>
            <ChooseImage imagesState={{ images, setImages }} min={2} max={6} />
            <div className={`mt-2`}>
              <ValidationParagraph text={`Select at least 2 images. Up to 6.`}
                                   stage={images.length === 0 ? `neutral` : images.length >= 2 && images.length <= 6 ? `success` : `error`} />
            </div>
          </div>
          <div className={`mb-9`}>
            <LabelAndInput
              onChangeState={{ setValueEntered: setPropertyAreaEntered, valueEntered: propertyAreaEntered }}
              type={`input`}
              label={`Property Area(In Sqft)`}
              defaultValue={propertyAreaEntered}
              required
              name={`propertyArea`}
              customClassNames={`bp-620:w-96`}
              placeholder={`e.g. 1000`}
              inputType={`number`} labelStyle={`grey-and-small`} />

            <div className={`mt-2`}>
              <ValidationParagraph text={`Property Area should be provided from 5 to 9999`}
                                   stage={propertyAreaInputStage} />
            </div>
          </div>

          <div className={`mb-9`}>
            <div className={`mb-2`}>
              <LabelAndSelect
                name={`propertyFor`}
                defaultValue={propertyForChosen}
                onChange={(e) => setPropertyForChosen(e.currentTarget.value)}
                disabled={mode === `editAdvert`} label={`This property is for..`}
                options={[{ value: ``, label: `Tap to choose` }, { value: `rent`, label: `Rent` }, {
                  value: `sell`,
                  label: `Sell`
                }]} />
              <div className={`mb-2`}>
                <ValidationParagraph text={`Property for can be either for rent or sell`}
                                     stage={propertyForInputStage} />
              </div>
            </div>
            <p className={`text-zinc-700 text-sm`}>{
              mode === `editAdvert` ? `You can't change this property` : `You can't change this property after creating the advert`
            }</p>
          </div>

          <div className={`mb-12`}>
            <LabelAndInput
              onChangeState={{ setValueEntered: setPropertyPriceEntered, valueEntered: propertyPriceEntered }}
              disabled={propertyForChosen === ``}
              type={`input`}
              label={`Price ${propertyForChosen === `rent` ? `per one day of rent` : ``}(In USD)`}
              defaultValue={propertyPriceEntered}
              required
              name={`propertyPrice`}
              customClassNames={`bp-620:w-96`}
              placeholder={propertyForChosen === `` ? `Not Available` : propertyForChosen === `rent` ? `e.g. 50` : `e.g. 144999`}
              inputType={`number`} labelStyle={`grey-and-small`} />
            <div className={`mt-2`}>
              <ValidationParagraph
                text={propertyForChosen === `` ? `Please select what your property is for first (rent or sell)` :
                  `Your price should be in range from 5 dollars to 10 millions.`}
                stage={propertyPriceInputStage} />
            </div>
          </div>

          <div className={`mb-8`}>
            <button onClick={() => setExpandOptionalFields((prevState) => !prevState)}
                    className={`text-zinc-700 font-semibold text-lg flex items-center gap-3`}>
              <ChevronIcon className={expandOptionalFields ? `rotate-180` : ``} />
              {expandOptionalFields ? `Fold` : `Expand`} Optional Fields
            </button>
          </div>

          {expandOptionalFields && (
            <div className={`mb-9`}>
              <LabelAndSelect
                onChange={(event) => setOwnershipSelected(() => event.target.value)}
                name={`ownership`}
                required={false}
                defaultValue={ownershipSelected}
                label={`Ownership`}
                options={[{ value: ``, label: `No Reference` }, { value: `leasehold`, label: `Leasehold` },
                  { value: `freehold`, label: `Freehold` }
                ]} />
              <div className={`mb-2`}>
                <ValidationParagraph text={`Ownership can either be leasehold or freehold.`}
                                     stage={ownershipInputStage} />
              </div>
            </div>
          )}
          {setActiveState && (
            <>
              <Button onClick={handleNextFormSwitch} type={`button`} label={`Next`}
                // @ts-ignore
                //       onClick={() => setActiveStateDeclaration({ stepOne: `completed`, stepTwo: `active` })}
              />
            </>
          )}

          {!setActiveState && (
            <>
              <Button type={`button`} label={`Save Changes`} />
            </>
          )}
        </div>
      </div>
    </>
  );
}