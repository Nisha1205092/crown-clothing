import Home from "./routes/home/home.component";
import { Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import {
  getCurrentUser
} from "./utils/firebase/firebase.utils";

const App = () => {
  useEffect(() => {
    getCurrentUser()
      .then(user => console.log(user));
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>

    </Routes>
  );
}

export default App;
