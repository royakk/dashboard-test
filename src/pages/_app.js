import "@/styles/globals.css";
import React, { useContext, useEffect } from "react";
import { appWithTranslation } from "next-i18next";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { useRouter } from "next/router";
import createEmotionCache from "../helpers/createEmotionCache";
import { useMemo, useLayoutEffect } from "react";
import { Provider } from "react-redux";
import store from "@/helpers/store/store";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ResponsiveDrawer from "@/components/sidbar";
import { I18nextProvider } from "react-i18next";
import { lightTheme, darkTheme } from "@/helpers/them";
import i18n from "../helpers/i18n";
import { selectTheme, setTheme } from "../helpers/store/ui";
import { useDispatch, useSelector } from "react-redux";

const rtlClientSideEmotionCache = createEmotionCache(true);
const clientSideEmotionCache = createEmotionCache(false);

function App(props) {
  // const theme = localStorage.getItem("theme");
  //  const theme = useSelector(selectTheme)

  // useEffect(()=>{
  //   dispatch(setTheme('light'))
  // },[])

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { locale } = useRouter();

  const memorizedEmotionCache = useMemo(() => {
    if (locale === "fa") {
      return rtlClientSideEmotionCache;
    }
    if (locale === "en") {
      return clientSideEmotionCache;
    }
    return emotionCache;
  }, [locale]);

  useLayoutEffect(() => {
    document.body.dir = locale === "en" ? "ltr" : "rtl";
  }, [locale]);
  console.log("locaaale", locale);
  const renderWithLayout =
    Component.getLayout ||
    function (page) {
      return <ResponsiveDrawer>{page}</ResponsiveDrawer>;
    };

  return (
    <>
      <Provider store={store}>
        <CacheProvider value={memorizedEmotionCache}>
          {/* <ThemeProvider theme={locale==='fa' ? rtlTheme : ltrTheme}> */}
          <CssBaseline />
          <I18nextProvider i18n={i18n}>
            {renderWithLayout(<Component {...pageProps} />)}
          </I18nextProvider>
          {/* </ThemeProvider> */}
        </CacheProvider>
      </Provider>
    </>
  );
}

export default appWithTranslation(App);
