'use client';

/*type InputType = {
  // children: ReactNode;
}*/

import React from 'react';
import { useRouter } from 'next/navigation';
import { SearchPropertiesViaNavSchema } from '@/utils/schemas/searchPropetriesViaNavSchema';

export default function Input(/*{  }: InputType*/) {
  const router = useRouter();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries()) as { searchTerm: string; propertyFor: `rent` | `buy` };

    const validation = SearchPropertiesViaNavSchema.safeParse(results);

    if (!validation.success) {
      console.error(validation.error.errors[0].message);
      return;
    }

    router.push(`/properties?searchTerm=${results.searchTerm}&propertyFor=${results.propertyFor}`);
  }

  return (
    <>
      <div className={`flex items-center`}>
        <form onSubmit={onSubmit} className={`relative`}>
          <input name={`searchTerm`} className={`bg-zinc-100 text-sm pl-5 py-3.5 rounded-2xl border-2 border-transparent
              focus:outline-none focus:border-2 focus:border-red-500 transition-all duration-150
              focus:bg-white w-[112%]`} type="seach"
                 placeholder={`Search`} />
          <div
            className={`absolute w-[50px] h-[50px] bg-red-500 top-0 -right-12 rounded-2xl flex items-center justify-center
                hover:scale-110 transition-all duration-200 cursor-pointer
                active:bg-red-300`}>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 21 20" fill="none">
                <path
                  d="M14.8154 14.2003L18.1251 17.5099M3.23178 9.2359C3.23178 10.9914 3.92916 12.6751 5.17051 13.9164C6.41186 15.1578 8.09548 15.8551 9.85102 15.8551C11.6065 15.8551 13.2902 15.1578 14.5315 13.9164C15.7729 12.6751 16.4702 10.9914 16.4702 9.2359C16.4702 7.48037 15.7729 5.79674 14.5315 4.5554C13.2902 3.31405 11.6065 2.61667 9.85102 2.61667C8.09548 2.61667 6.41186 3.31405 5.17051 4.5554C3.92916 5.79674 3.23178 7.48037 3.23178 9.2359Z"
                  stroke="white" strokeWidth="1.24111" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className={`absolute top-[15px] right-3 text-sm`}>
            <select className={`bg-transparent text-sm text-stone-500`} name="propertyFor" id="propertyType">
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </div>
        </form>
      </div>
    </>
  );
}
