'use client';

/*type NavigationType = {
  // children: ReactNode;
}*/

import NavLink from '@/components/UI/Link/NavLInk';
import React, { useLayoutEffect, useState } from 'react';
import Input from '@/components/UI/Input/Input';
import Logo from '@/components/UI/Logo/Logo';
import NavigationFullScreen from '@/components/Layout/Navigation/NavigationFullScreen';
import ViapropertyIcon from '@/components/UI/Icon/ViapropertyIcon';
import { useUserDataOnClient } from '@/hooks/queries/useUserDataOnClient';
import UserCredentialsSkeleton from '@/components/UI/Skeletons/UserCredentialsSkeleton';
import UserCredentials from '@/components/Layout/Other/UserCredentials';
import { abbreviateInitials } from '@/utils/functions/abbreviateInitials';
import { trimString } from '@/utils/functions/trimString';
import { useCartDispatch, useCartSelector } from '@/store/hooks';
import { navigationSliceActions } from '@/store/features/navigation';

export default function Navigation(/*{  }: NavigationType*/) {
  const [navigationOpen, setNavigationOpen] = useState<boolean>(false);
  const userInitials = useCartSelector((state) => state.navigation.userInitials);
  const dispatch = useCartDispatch();

  const { userData, loading } = useUserDataOnClient();

  useLayoutEffect(() => {
    if (!loading && userData) {
      dispatch(navigationSliceActions.updateUserInitials(userData.initials));
      dispatch(navigationSliceActions.changeUserEmail(userData.email));
    }
  }, [userData, loading, dispatch]);

  function handleClickOnHeartIcon() {
    const wishlistURL = `/account-settings/settings/wishlist`;

    if (window) {
      if (!userData || loading) {
        return;
      }
      window.location.href = wishlistURL;
    }

  }

  function handleClickOnNotificationIcon() {
    if (!userData || loading) {
      return;
    }
    // window.location.href = '';
  }

  return (
    <>
      <div onClick={() => setNavigationOpen(false)} className={`inset-0 w-screen h-screen fixed bg-white/95 z-[52] bp-1178:opacity-0 pointer-events-hidden
      bp-1178:pointer-events-none ${navigationOpen ? `translate-x-0 opacity-100` : `translate-x-full  opacity-0`} transition-all duration-300`}>
        <NavigationFullScreen setNavigationOpen={setNavigationOpen} />
      </div>
      <div className={`max-w-7xl mx-auto w-full mt-9 px-4`}>
        <nav className={`flex items-center`}>
          <Logo link href={`/`} label={``} />
          <div className={`flex mr-4 bp-1178:hidden`}>
            <svg onClick={() => setNavigationOpen(true)} className={``} xmlns="http://www.w3.org/2000/svg" width="32"
                 height="32" viewBox="0 0 24 24"
                 fill="none">
              <path d="M4 5H20M18 12H6M8 19H16" stroke="#FF3030" strokeWidth="1.5" strokeLinecap="round"
                    strokeLinejoin="round" />
            </svg>
          </div>
          <div className={`bp-1178:flex gap-12 mr-20 hidden items-center`}>
            <NavLink label={`Home`} path={`/`} />
            <NavLink label={`Properties`} path={`/properties`} />
            <NavLink label={`Create Advert`} path={`/sell`} />
          </div>
          <div className={`hidden bp-750:flex`}>
            <Input />
          </div>
          <div className={`ml-auto flex gap-7 items-center`}>
            <div className={`hidden bp-480:flex gap-7 items-center`}>
              <div onClick={() => handleClickOnHeartIcon()}>
                <ViapropertyIcon icon={`heart`} />
              </div>
              <div onClick={() => handleClickOnNotificationIcon()}>
                <ViapropertyIcon icon={`bell`} />
              </div>
            </div>

            {loading && (
              <>
                <UserCredentialsSkeleton />
              </>
            )}
            {!loading && (
              <>
                <UserCredentials
                  userEmail={userData?.email}
                  initials={userInitials || `Guest`}
                  location={userData?.email ? trimString(userData.email, 13) : `unknown`}
                  abbrInitials={userInitials ? abbreviateInitials(userInitials) : `G`}
                  popupAvailable={true}
                />
              </>
            )}
          </div>

        </nav>
      </div>
    </>
  );
}
