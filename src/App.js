import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Cadastro from "./controllers/Cadastro/cadastro";
import EmpresaInfo from "./controllers/FormularioInfo/EmpresaInfo/empresaInfo";
import RelatorioInfo from "./controllers/FormularioInfo/RelatorioInfo/relatorioInfo";
import LoginUser from "./controllers/Login/loginUser"
import RegisterUser from "./controllers/Login/registerUser";
import Navbar from "./components/Navbar/navbar/navbar";
import NavbarLogin from "./components/Navbar/navbar-login/navbar-login";
import UploadListaCredor from './components/UploadListaCredor/UploadListaCredor'; // Certifique-se de que o caminho está correto

function App() {

  return (
    <BrowserRouter>
        
      {/*<!-- Teste de lista de credor -->*/}
        
      <div className="App">
        <h1>Upload de Lista de Credores</h1>
        <UploadListaCredor />
      </div>

      <Routes>

        <Route exact path="/" element={<NavbarLogin/>}/>
        <Route exact path="/home" element={<Navbar/>}/>
        <Route exact path="/cadastro" element={<Cadastro />}/>
        <Route exact path="/empresaInfo" element={<EmpresaInfo/>}/>
        <Route exact path="/relatorioInfo/:idEmpresa" element={<RelatorioInfo/>}/>
        <Route exact path="/login" element={<LoginUser/>}/>
        <Route exact path="/register" element={<RegisterUser/>}/>

        {/*<!-- Teste de lista de credor -->*/}
        
        <Route exact path="/upload" element={        
          <div className="App">
            <h1>Upload de Lista de Credores</h1>
            <UploadListaCredor />
          </div>
        } />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App;