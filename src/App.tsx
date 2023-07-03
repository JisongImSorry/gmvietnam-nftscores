import "./App.css";

import NFT from "@pages/NFT";
import Header from "@components/Header";
import Landing from "@pages/Landing";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useUser } from "@hooks/useUser";
import { UserContext } from "@context/UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserContext.Provider value={useUser()}>
        <Header />
        <Routes>
          <Route path="/*" element={<Landing />} />
          <Route path="/nft/:address" element={<NFT />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
