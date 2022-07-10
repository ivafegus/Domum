import { useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from "./userContext";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Home from "./components/Home";
import Admin from "./components/Admin";
import ShowApartment from "./components/ShowApartment";

import Apartment from "./components/Apartment";
import ListApartments from "./components/ListApartments";
import FilteredApartments from "./components/FilteredApartments";

function App() {
  const [user, setUser] = useState(localStorage.user ? JSON.parse(localStorage.user) : null);
  const updateUserData = (userInfo) => {
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUser(userInfo);
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{
        user: user,
        setUserContext: updateUserData
      }}>
        <div className="App">
          <Header title="Nepremicnine knockoff"></Header>
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/admin" element={<Admin />} ></Route>
            <Route path="/listApartments" element={<ListApartments />}></Route>
            <Route path="/filteredApartments" element={<FilteredApartments />}></Route>
            <Route path="listApartments/ShowApartment" element={<ShowApartment />}></Route>
            <Route path="filteredApartments/ShowApartment" element={<ShowApartment />}></Route>

          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
