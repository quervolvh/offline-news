import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { change, resizer } from 'utils';
import 'assets/styles/main.scss';
import { SetClientAvailability } from 'hooks/useIsClient';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [state, setState] = useState({
    isMobile: false,
    deviceWidth: 0,
    showMobileView: false,
    timeOutTrigger: 0,
    clientMode: false
  });

  const { isMobile, deviceWidth, showMobileView, clientMode } = state;

  const isInSession = false;

  const currentPath = router.pathname.trim();

  const unProtectedRoutes: string[] = ["", "/", "/executive", "/passenger", "/mover", "/ev"];

  const redirectCondition =
    (isInSession && [...unProtectedRoutes].includes(currentPath));

  const resizeListener = (mode: "add" | "remove") => {

    window?.[mode === "add" ? "addEventListener" : "removeEventListener"]?.("resize",

      () => resizer(

        (e) => change(e, "isMobile", setState),
        (e) => change(e, "deviceWidth", setState)

      ),

      false

    );

  }

  useEffect(() => {

    // On first load, this function sets the values obtained for client width and height.

    if (clientMode && window && document) {

      resizeListener("add");

      change(document?.body?.clientWidth < 601, "isMobile", setState);

      change(document?.body?.clientWidth, "deviceWidth", setState);

    }

    return (() => {

      if (clientMode && window) { resizeListener("remove"); }

    })

    //eslint-disable-next-line
  }, [clientMode]);

  useEffect(() => {
    change(isMobile, "showMobileView", setState);
  }, [isMobile]);

  useEffect(() => {

    if (isInSession && [...unProtectedRoutes, "/404", "/500"].includes(currentPath)) {
      router.replace("/dashboard");
    }

    //eslint-disable-next-line
  }, [redirectCondition]);

  useEffect(() => {

    if (!isInSession) change(0, "timeOutTrigger", setState);

  }, [isInSession]);

  SetClientAvailability((e) => change(e, "clientMode", setState));

  useEffect(() => {

    const reg = async () => {

      if ("serviceWorker" in navigator) {

        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });

        if (registration.installing) {

          console.log("Service worker installing");

        } else if (registration.waiting) {

          console.log("Service worker installed");

        } else if (registration.active) {

          console.log("Service worker active");

        }

      }

    }

    // reg();

    // eslint-disable-next-line
  }, []);

  return (
    <>

      {
        (redirectCondition || !clientMode) ?

          <> </>

          :

          <>

            <Component
              {...pageProps}
              isMobile={showMobileView}
              deviceWidth={deviceWidth}
              clientMode={clientMode}
            />

          </>
      }

    </>
  );

}

export default App;
