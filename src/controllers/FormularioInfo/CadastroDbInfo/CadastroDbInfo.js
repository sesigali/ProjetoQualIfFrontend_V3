
//parte 1
/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import usePrompt from './usePrompt'; // Ajuste o caminho conforme necessário
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

  usePrompt('Tem certeza que deseja sair desta página? Quaisquer dados não salvos serão perdidos.', 
  true,
  () => handleDelete(idEmpresa)
);

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

  const confirmNavigation = async (event) => {
    event.preventDefault();
    const confirm = window.confirm('Você tem certeza que deseja sair desta tela? Todas as alterações não salvas serão perdidas.');
    if (confirm) {
      await handleDelete(idEmpresa); // Exclui as informações após salvar
      navigate('/Home');
    }
  };

  const handleDelete = async (idEmpresa) => {
    try {
      await enviarTodasAsInformacoes(); // Salva todas as informações no banco de dados
      const response = await axios.delete(`http://localhost:8888/empresa/excluir/${idEmpresa}`);
      if (response.status === 200) {
        console.log('Empresa excluída');
      } else {
        console.error('Erro ao excluir a empresa');
      }
    } catch (error) {
      console.error('Erro ao excluir a empresa', error);
    }
  };
  
  // Certidao
  const handleCadastroCertidao = async () => {
    const certidaos = {
      planoRecuperacao: docRecuperacaoCertidao,
      naturezaCertidao: certidaoNaturezaCertidao,
      certidaoFalencia: anexoCertidao,
      idEmpresa: idEmpresa,
    };

    try {
      const response = await axios.post('http://localhost:8888/certidao/adicionar', certidaos);
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  };

  // Balanço
  const handleCadastroBalanco = async () => {
    const balancos = {
      conformidadeLei: balancoConfLeiBalanco,
      balanco: anexoBalanco,
      idEmpresa: idEmpresa,
    };

    try {
      const response = await axios.post('http://localhost:8888/balanco/adicionar', balancos);
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  };

  // Indices
  const handleCadastroIndice = async () => {
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
      const response = await axios.post('http://localhost:8888/indice/adicionar', indices);
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  };

  // Complementação
  const handleCadastroComplementacao = async () => {
    const complementacaos = {
      comprAssumidos: compromissosAssumidos,
      idEmpresa: idEmpresa,
    };

    try {
      const response = await axios.post('http://localhost:8888/complementacao/adicionar', complementacaos);
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  };

  // Compromissos
  const handleCadastroCompromissos = async () => {
    const compromissos = {
      receitaBruta: receitaBrutaCompromisso,
      declaracaoCompr: declaracaoCompromisso,
      dre: dreCompromisso,
      justificativa: justRecuperacaoCompromisso,
      idEmpresa: idEmpresa,
    };

    try {
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
        <button className="save btn-empresaInfo" type="button" onClick={handleSubmit}>
          Salvar
        </button>

        <button className="cancel btn-empresaInfo" onClick={confirmNavigation}>Cancelar</button>

      </div>
      <div><h1>{mensagem && <p>{mensagem}</p>}</h1></div>
      <br />
      <br />
    </div>
  );
}
*/

//-------------------------------------------------------------
//parte 2
/*import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import usePrompt from './usePrompt'; // Ajuste o caminho conforme necessário
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

  const handleDelete = async (idEmpresa) => {
    //await enviarTodasAsInformacoes();
    try {
      const response = await axios.delete(`http://localhost:8888/empresa/excluir/${idEmpresa}`);
      if (response.status === 200) {
        console.log('Empresa excluída com sucesso');
      } else {
        console.error('Erro ao excluir a empresa');
      }
    } catch (error) {
      console.error('Erro ao excluir a empresa', error);
    }
  };

  usePrompt(
    'Tem certeza que deseja sair desta página? Quaisquer dados não salvos serão perdidos.',
    true,
    () => handleDelete(idEmpresa)
  );

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

  const confirmNavigation = async (event) => {
    event.preventDefault();
    const confirm = window.confirm('Você tem certeza que deseja sair desta tela? Todas as alterações não salvas serão perdidas.');
    if (confirm) {
      await enviarTodasAsInformacoes();
      await handleDelete(idEmpresa);
      navigate('/Home');
    }
  };

  // Certidao
  const handleCadastroCertidao = async () => {
    const certidaos = {
      planoRecuperacao: docRecuperacaoCertidao,
      naturezaCertidao: certidaoNaturezaCertidao,
      certidaoFalencia: anexoCertidao,
      idEmpresa: idEmpresa,
    };

    try {
      const response = await axios.post('http://localhost:8888/certidao/adicionar', certidaos);
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  };

  // Balanço
  const handleCadastroBalanco = async () => {
    const balancos = {
      conformidadeLei: balancoConfLeiBalanco,
      balanco: anexoBalanco,
      idEmpresa: idEmpresa,
    };

    try {
      const response = await axios.post('http://localhost:8888/balanco/adicionar', balancos);
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  };

  // Indices
  const handleCadastroIndice = async () => {
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
      const response = await axios.post('http://localhost:8888/indice/adicionar', indices);
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  };

  // Complementação
  const handleCadastroComplementacao = async () => {
    const complementacaos = {
      comprAssumidos: compromissosAssumidos,
      idEmpresa: idEmpresa,
    };

    try {
      const response = await axios.post('http://localhost:8888/complementacao/adicionar', complementacaos);
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  };

  // Compromissos
  const handleCadastroCompromissos = async () => {
    const compromissos = {
      receitaBruta: receitaBrutaCompromisso,
      declaracaoCompr: declaracaoCompromisso,
      dre: dreCompromisso,
      justificativa: justRecuperacaoCompromisso,
      idEmpresa: idEmpresa,
    };

    try {
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
        <button className="save btn-empresaInfo" type="button" onClick={handleSubmit}>
          Salvar
        </button>

        <Link to="/Home">
          <button className="cancel btn-empresaInfo" onClick={confirmNavigation}>Cancelar</button>
        </Link>
      </div>
      <div><h1>{mensagem && <p>{mensagem}</p>}</h1></div>
      <br />
      <br />
    </div>
  );
}
*/
//-----------------------------------------------------------
//parte 3
/*
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import usePrompt from './usePrompt'; // Ajuste o caminho conforme necessário
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

  const handleDelete = async (idEmpresa) => {
    await enviarTodasAsInformacoes();
    try {
      const response = await axios.delete(`http://localhost:8888/empresa/excluir/${idEmpresa}`);
      if (response.status === 200) {
        console.log('Empresa excluída com sucesso');
      } else {
        console.error('Erro ao excluir a empresa');
      }
    } catch (error) {
      console.error('Erro ao excluir a empresa', error);
    }
  };

  usePrompt(
    'Tem certeza que deseja sair desta página? Quaisquer dados não salvos serão perdidos.',
    true,
    () => handleDelete(idEmpresa)
  );

  const enviarTodasAsInformacoes = async () => {
    try {
      await Promise.all([
        handleCadastroCertidao(),
        handleCadastroBalanco(),
        handleCadastroIndice(),
        handleCadastroComplementacao(),
        handleCadastroCompromissos()
      ]);
      setMensagem('Aguarde, relatório sendo gerado...');
      await delay(2000);
      window.open(`/relatorioInfo/${idEmpresa}`);
      navigate('/Home');
    } catch (error) {
      console.error('Erro ao enviar informações', error);
      // Lida com erro, se necessário
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await enviarTodasAsInformacoes();
  };

  const confirmNavigation = async (event) => {
    event.preventDefault();
    const confirm = window.confirm('Você tem certeza que deseja sair desta tela? Todas as alterações não salvas serão perdidas.');
    if (confirm) {
      //await enviarTodasAsInformacoes();
      await handleDelete(idEmpresa);
      navigate('/Home');
    }
  };

  // Certidao
  const handleCadastroCertidao = async () => {
    const certidaos = {
      planoRecuperacao: docRecuperacaoCertidao,
      naturezaCertidao: certidaoNaturezaCertidao,
      certidaoFalencia: anexoCertidao,
      idEmpresa: idEmpresa,
    };

    try {
      const response = await axios.post('http://localhost:8888/certidao/adicionar', certidaos);
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  };

  // Balanço
  const handleCadastroBalanco = async () => {
    const balancos = {
      conformidadeLei: balancoConfLeiBalanco,
      balanco: anexoBalanco,
      idEmpresa: idEmpresa,
    };

    try {
      const response = await axios.post('http://localhost:8888/balanco/adicionar', balancos);
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  };

  // Indices
  const handleCadastroIndice = async () => {
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
      const response = await axios.post('http://localhost:8888/indice/adicionar', indices);
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  };

  // Complementação
  const handleCadastroComplementacao = async () => {
    const complementacaos = {
      comprAssumidos: compromissosAssumidos,
      idEmpresa: idEmpresa,
    };

    try {
      const response = await axios.post('http://localhost:8888/complementacao/adicionar', complementacaos);
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  };

  // Compromissos
  const handleCadastroCompromissos = async () => {
    const compromissos = {
      receitaBruta: receitaBrutaCompromisso,
      declaracaoCompr: declaracaoCompromisso,
      dre: dreCompromisso,
      justificativa: justRecuperacaoCompromisso,
      idEmpresa: idEmpresa,
    };

    try {
      const response = await axios.post('http://localhost:8888/compromisso/adicionar', compromissos);
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <br />
      <div className="container-button">
        <button className="save btn-empresaInfo" type="button" onClick={handleSubmit}>
          Salvar
        </button>

        <Link to="/Home">
          <button className="cancel btn-empresaInfo" onClick={confirmNavigation}>Cancelar</button>
        </Link>
      </div>
      <div><h1>{mensagem && <p>{mensagem}</p>}</h1></div>
      <br />
      <br />
    </div>
  );
}

export { usePrompt };
*/
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
