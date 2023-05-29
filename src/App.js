import Home from "./routes/home/home.component";
import { Routes, Route } from 'react-router-dom';
import { useEffect, lazy, Suspense } from "react";
import { checkUserSession } from "./store/user/user.action";
import { useDispatch } from "react-redux";
import Spinner from "./components/spinner/spinner.component";
import GlobalStyle from "./global.styles";
//theme code
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, useTheme } from "./utils/theme/theme.utils";
import DarkModeToggle from "./components/DarkModeToggle/DarkModeToggle.component";
import { LIGHT } from "./contexts/theme.context";
//theme code

const Navigation = lazy(() => import("./routes/navigation/navigation.component"));
const Authentication = lazy(() => import("./routes/authentication/authentication.component"));
const Shop = lazy(() => import("./routes/shop/shop.component"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));

const App = () => {
  const { myTheme, themeToggler, setLightTheme, setDarkTheme } = useTheme();
  // theme code
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch])

  return (
    <Suspense fallback={<Spinner />}>
      <ThemeProvider theme={myTheme === LIGHT ? lightTheme : darkTheme}>
        <GlobalStyle />
        <DarkModeToggle toggle={themeToggler} setLight={setLightTheme} setDark={setDarkTheme} />
        {/* <button onClick={themeToggler}>Switch Theme</button> */}
        <Routes>
          <Route path="/" element={<Navigation />} >
            <Route index element={<Home />} />
            <Route path="shop/*" element={<Shop />} />
            <Route path="auth" element={<Authentication />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
