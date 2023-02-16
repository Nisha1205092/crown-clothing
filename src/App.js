import Home from "./routes/home/home.component";
import { Routes, Route } from 'react-router-dom';
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";

const App = () => {
  

  const Shop = () => {
    return (
      <div>
        <div>
          <h2>I am the shop page</h2>
        </div>
      </div>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
     
    </Routes>    
  );
}

export default App;
