import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import host from '../../../components/Host/host';
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

  const [mensagem, setMensagem] = useState(null);
  const navigate = useNavigate();
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleCadastroCertidao = useCallback(async () => {
    const certidaos = {
      planoRecuperacao: docRecuperacaoCertidao,
      naturezaCertidao: certidaoNaturezaCertidao,
      certidaoFalencia: anexoCertidao,
      idEmpresa: idEmpresa,
    };

    try {
      const response = await axios.post(`${host.API_BASE_URL}/certidao/adicionar`, certidaos);
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  }, [docRecuperacaoCertidao, certidaoNaturezaCertidao, anexoCertidao, idEmpresa]);

  const handleCadastroBalanco = useCallback(async () => {
    const balancos = {
      conformidadeLei: balancoConfLeiBalanco,
      balanco: anexoBalanco,
      idEmpresa: idEmpresa,
    };

    try {
      const response = await axios.post(`${host.API_BASE_URL}/balanco/adicionar`, balancos);
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  }, [balancoConfLeiBalanco, anexoBalanco, idEmpresa]);

  const handleCadastroIndice = useCallback(async () => {
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
      const response = await axios.post(`${host.API_BASE_URL}/indice/adicionar`, indices);
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  }, [ativoCirculanteIndice, ativoReaLongoPrazoIndice, ativoTotalIndice, passivoCirculanteIndice, passivoNaoCirculanteIndice, patrimonioLiquidoIndice, idEmpresa]);

  const handleCadastroComplementacao = useCallback(async () => {
    const complementacaos = {
      comprAssumidos: compromissosAssumidos,
      idEmpresa: idEmpresa,
    };

    try {
      const response = await axios.post(`${host.API_BASE_URL}/complementacao/adicionar`, complementacaos);
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  }, [compromissosAssumidos, idEmpresa]);

  const handleCadastroCompromissos = useCallback(async () => {
    const compromissos = {
      receitaBruta: receitaBrutaCompromisso,
      declaracaoCompr: declaracaoCompromisso,
      dre: dreCompromisso,
      justificativa: justRecuperacaoCompromisso,
      idEmpresa: idEmpresa,
    };

    try {
      const response = await axios.post(`${host.API_BASE_URL}/compromisso/adicionar`, compromissos);
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  }, [receitaBrutaCompromisso, declaracaoCompromisso, dreCompromisso, justRecuperacaoCompromisso, idEmpresa]);

  const saveAllData = useCallback(async () => {
    await handleCadastroCertidao();
    await handleCadastroBalanco();
    await handleCadastroIndice();
    await handleCadastroComplementacao();
    await handleCadastroCompromissos();
    await delay(1000);
  }, [handleCadastroCertidao, handleCadastroBalanco, handleCadastroIndice, handleCadastroComplementacao, handleCadastroCompromissos]);

  const deleteAllData = useCallback(async () => {
    try {
      const response = await axios.delete(`${host.API_BASE_URL}/empresa/excluir/${idEmpresa}`);
      if (response.status === 200) {
        console.log('Dados excluídos com sucesso');
      } else {
        console.error('Erro ao excluir os dados');
      }
    } catch (error) {
      console.error('Erro ao excluir os dados', error);
    }
  }, [idEmpresa]);

  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      event.preventDefault();
      await saveAllData();
      await deleteAllData();
    };
    
    //Resolver problema de salvar e apagar informações do BD
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'hidden') {
        //await saveAllData();
        //await deleteAllData();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [saveAllData, deleteAllData]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    await enviarTodasAsInformacoes();
  };

  const handleSubmitDelete = async (event) => {
    event.preventDefault();
    await saveAllData();
    await deleteAllData();
    navigate('/Home');
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
        <button className="cancel btn-empresaInfo" onClick={handleSubmitDelete}>Cancelar</button>
        </Link>
      </div>
      <div><h1>{mensagem && <p>{mensagem}</p>}</h1></div>
      <br />
      <br />
    </div>
);
}
