import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/formStyle.css';

export default function CadastroDbIndo({
  idEmpresa,
  docRecuperacaoCertidao,
  certidaoNaturezaCertidao,
  anexoCertidao,
  balancoConfLeiBalanco,
  anexoBalanco,
  ativoCirculanteIndice,
  ativoReaLongoPrazoIndice,
  ativoTotalIndice,
  passivoCirculanteIndice,
  passivoNaoCirculanteIndice,
  patrimonioLiquidoIndice,
  compromissosAssumidos,
  receitaBrutaCompromisso,
  declaracaoCompromisso,
  dreCompromisso,
  justRecuperacaoCompromisso,
}) {

//--------------------------------------------------------------------------------------------
const [mensagem, setMensagem] = useState(null);
const navigate = useNavigate();
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const enviarTodasAsInformacoes = async () => {
  await handleCadastroCertidao();
  await handleCadastroBalanco();
  await handleCadastroIndice();
  await handleCadastroComplementacao();
  await handleCadastroCompromissos();
  setMensagem('Aguarde, relatório sendo gerado...');
  await delay(2000);

  window.open(`/relatorioInfo/${idEmpresa}`);
  navigate('/Home');
};

//Certidao
const handleCadastroCertidao = async () => {

  const certidaos = {
    planoRecuperacao: docRecuperacaoCertidao,
    naturezaCertidao: certidaoNaturezaCertidao,
    certidaoFalencia: anexoCertidao,
    idEmpresa: idEmpresa,
  };

  try {
    // Adicione a lógica para enviar os certidaos para o backend
    const response = await axios.post('http://localhost:8888/certidao/adicionar', certidaos);
    console.log(response.data); 
  } catch (error) {
    console.error(error);
  }
};

//Balanço
const handleCadastroBalanco = async (event) => {

  const balancos = {
    conformidadeLei: balancoConfLeiBalanco,
    balanco: anexoBalanco,
    idEmpresa: idEmpresa,
  };

  try {
    // Adicione a lógica para enviar os compromissos para o backend
    const response = await axios.post('http://localhost:8888/balanco/adicionar', balancos);
    console.log(response.data); 
  } catch (error) {
    console.error(error);
  }
};

//Indices
const handleCadastroIndice = async (event) => {
  
  const indices = {
    ativoCirculante: ativoCirculanteIndice,
    ativoReaLongoPrazo: ativoReaLongoPrazoIndice,
    ativoTotal: ativoTotalIndice,
    passivoCirculante: passivoCirculanteIndice,
    passivoNaoCirculante: passivoNaoCirculanteIndice,
    patrimonioLiquido: patrimonioLiquidoIndice,
    idEmpresa: idEmpresa,
  };

  try {
    // Adicione a lógica para enviar os compromissos para o backend
    const response = await axios.post('http://localhost:8888/indice/adicionar', indices);
    console.log(response.data); 
  } catch (error) {
    console.error(error);
  }
};

//Complementação
const handleCadastroComplementacao = async (event) => {
  
  const complementacaos = {
    comprAssumidos: compromissosAssumidos,
    idEmpresa: idEmpresa,
  };

  try {
    // Adicione a lógica para enviar os complementacaos para o backend
    const response = await axios.post('http://localhost:8888/complementacao/adicionar', complementacaos);
    console.log(response.data); 
  } catch (error) {
    console.error(error);
  }
};

//Compromissos
const handleCadastroCompromissos = async (event) => {
  
  const compromissos = {
    receitaBruta: receitaBrutaCompromisso,
    declaracaoCompr: declaracaoCompromisso,
    dre: dreCompromisso,
    justificativa: justRecuperacaoCompromisso,
    idEmpresa: idEmpresa,
  };

  try {
    // Adicione a lógica para enviar os compromissos para o backend
    const response = await axios.post('http://localhost:8888/compromisso/adicionar', compromissos);
    console.log(response.data); 
  } catch (error) {
    console.error(error);
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();

  await enviarTodasAsInformacoes();
};
  
  return (
    <div>
      <br />
      <div className="container-button">
        <a href="/Home">
          <button className="save btn-empresaInfo" type="button" onClick={handleSubmit}>
            Salvar
          </button>
        </a>

        <Link to="/Home">
          <button className="cancel btn-empresaInfo">Cancelar</button>
        </Link>

      </div>
      <div><h1>{mensagem && <p>{mensagem}</p>}</h1></div>
      <br />
      <br />
    </div>
  );
}