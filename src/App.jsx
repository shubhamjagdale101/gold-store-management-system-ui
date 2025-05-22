import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/signup";
import CreateStore from "./components/createStore";
import Header from "./components/header";
import TransactionsPage from "./components/transactionsPage";
import CreateTransaction from "./components/createTransaction";
import StoresPage from "./components/storePage";
import ViewCustomers from "./components/viewCustomers";
import CreateCustomer from "./components/createCustomer";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function App() {
  const isLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(!isLoggedIn && location.pathname != '/signup') navigate("/login")
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/stores/create" element={<CreateStore />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/transactions/create" element={<CreateTransaction />} />
        <Route path="/stores" element={<StoresPage />} />
        <Route path="/customers" element={<ViewCustomers />} />
        <Route path="/customers/create" element={<CreateCustomer />} />
      </Routes>
    </>
  );
}

export default App;
