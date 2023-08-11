import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import "react-toastify/dist/ReactToastify.css";
import ProtectedComp from "./components/ProtectedComp";
import Homescreen from "./pages/Homescreen";
import FormikForm from "./pages/FormikForm";
import { ContextProvider } from "./context/MainContext";
import Profile from "./pages/Profile";
import Update from "./pages/ProfileUpdate";

function App() {
  return (
    <>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homescreen />} />
            <Route path="/login" element={<FormikForm />} />
            <Route path="" element={<ProtectedComp />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/update-profile" element={<Update />} />
            </Route>
          </Route>
        </Routes>
      </ContextProvider>
    </>
  );
}

export default App;
