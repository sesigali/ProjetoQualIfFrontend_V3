import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Cadastro from "./controllers/Cadastro/cadastro";
import EmpresaInfo from "./controllers/FormularioInfo/EmpresaInfo/empresaInfo";
import RelatorioInfo from "./controllers/FormularioInfo/RelatorioInfo/relatorioInfo";
import LoginUser from "./controllers/Login/loginUser"
import RegisterUser from "./controllers/Login/registerUser";
import Navbar from "./components/Navbar/navbar/navbar";
import NavbarLogin from "./components/Navbar/navbar-login/navbar-login";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<NavbarLogin/>}/>
        <Route exact path="/home" element={<Navbar/>}/>
        <Route exact path="/cadastro" element={<Cadastro />}/>
        <Route exact path="/empresaInfo" element={<EmpresaInfo/>}/>
        <Route exact path="/relatorioInfo/:idEmpresa" element={<RelatorioInfo/>}/>
        <Route exact path="/login" element={<LoginUser/>}/>
        <Route exact path="/register" element={<RegisterUser/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;