import Home from "./routes/home/home.component";
import { Routes, Route } from 'react-router-dom';
import Nav from "./routes/nav/nav.component";
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
      <Route path="/" element={<Nav />} >
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="signin" element={<Authentication />} />
      </Route>
     
    </Routes>    
  );
}

export default App;
