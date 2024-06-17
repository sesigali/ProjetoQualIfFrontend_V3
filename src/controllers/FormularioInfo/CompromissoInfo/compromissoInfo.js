import React, { useState, useEffect } from "react";
import axios from "axios";
import host from "../../../components/Host/host";
import CadastroDbIndo from "../CadastroDbInfo/CadastroDbInfo";
import { NumericFormat } from "react-number-format";

export default function CompromissosAssumidosInfo({
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
}) {
  const [receitaBruta, setReceitaBruta] = useState("0");
  const [declaracao, setDeclaracao] = useState(null);
  const [dre, setDre] = useState(null);
  const [divergencia, setDivergencia] = useState(0);
  const [temJustificativa, setTemJustificativa] = useState(false);
  const [erro, setErro] = useState(null);
  const [justificativaRecuperacao, setJustificativaRecuperacao] = useState("N/A");

  const handleDeclaracaoUpload = (e) => {
    const file = e.target.files[0];
    setDeclaracao(file);
  };

  const handleDreUpload = (e) => {
    const file = e.target.files[0];
    setDre(file);
  };

  const handleValueChange = (values) => {
    const { value } = values;
    setReceitaBruta(value);
  };

  useEffect(() => {
    setErro(null);

    if (!receitaBruta || isNaN(receitaBruta) || !compromissosAssumidos || isNaN(compromissosAssumidos)) {
      setErro("Por favor, forneça valores válidos para a Receita Bruta e os Compromissos Assumidos.");
      return;
    }

    const divergenciaValue = ((receitaBruta - compromissosAssumidos) / compromissosAssumidos) * 100;

    setDivergencia(divergenciaValue);

    if (Math.abs(divergenciaValue) > 10) {
      setTemJustificativa(true);
    } else {
      setTemJustificativa(false);
    }
  }, [receitaBruta, compromissosAssumidos]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      receitaBruta: receitaBruta,
      declaracaoCompr: declaracao,
      dre: dre,
      justificativa: justificativaRecuperacao,
      idEmpresa: idEmpresa,
    };

    console.log('receitaBruta', receitaBruta);
    console.log('justificativa', justificativaRecuperacao);
    console.log('declaracaoCompr', declaracao);
    console.log('dre', dre);
    console.log('idEmpresa', idEmpresa);

    try {
      console.log('DataBD', data);
      const response = await axios.post(`${host.API_BASE_URL}/compromisso/adicionar`, data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="title-info">Compromissos Assumidos</h1>
      <p>Caso a diferença entre a receita bruta discriminada na Demonstração do Resultado do <br />
        Exercício (DRE) e a declaração apresentada seja maior que 10% (dez por cento) positivo <br />
        ou negativo em relação à receita bruta, o licitante deverá apresentar justificativas.</p>

      <form onSubmit={handleSubmit}>
        <div className="compromissoInfo">
          <label>Receita Bruta:</label>
          <NumericFormat
            name="receitaBruta"
            value={receitaBruta}
            onValueChange={(values) => handleValueChange(values, "receitaBruta")}
            allowNegative={false}
            decimalScale={2}
            decimalSeparator=','
            thousandSeparator='.'
          />
        </div>

        <div className="compromissoInfo">
          <label>Compromissos Assumidos: R$ </label>
          <span>{compromissosAssumidos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>

        <div className="compromissoInfo">
          <label>Divergência Percentual: </label>
          <span>{divergencia.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%</span>
        </div>

        {temJustificativa && (
          <div>
            <h3 className="sub-title">Empresa encaminhou justificativa para a diferença entre a Receita Bruta e a Declação de Compromissos Assumidos superior ou inferior a 10%?</h3>
            <label className="label-certidaoInfo">
              <input
                type="radio"
                value="sim"
                checked={justificativaRecuperacao === 'sim'}
                onChange={(e) => setJustificativaRecuperacao('sim')}
              />
              Sim
            </label>
            <label className="label-certidaoInfo">
              <input
                type="radio"
                value="não"
                checked={justificativaRecuperacao === 'não'}
                onChange={(e) => setJustificativaRecuperacao('não')}
              />
              Não
            </label>
          </div>
        )}

        <div className="compromissoInfo">
          <label className="anexo">Anexar Declaração de Compromissos Assumidos: </label>
          <input
            className="anexos"
            type="file"
            onChange={handleDeclaracaoUpload}
          />
        </div>
        <div className="compromissoInfo">
          <label className="anexo">Anexar DRE: </label>
          <input
            className="anexos"
            type="file"
            onChange={handleDreUpload}
          />
        </div>
        {/* {<button type="submit">Enviar</button>} */}

        <hr />
        <CadastroDbIndo
          idEmpresa={idEmpresa}

          docRecuperacaoCertidao={docRecuperacaoCertidao}
          certidaoNaturezaCertidao={certidaoNaturezaCertidao}
          anexoCertidao={anexoCertidao}

          balancoConfLeiBalanco={balancoConfLeiBalanco}
          anexoBalanco={anexoBalanco}

          ativoCirculanteIndice={ativoCirculanteIndice}
          ativoReaLongoPrazoIndice={ativoReaLongoPrazoIndice}
          ativoTotalIndice={ativoTotalIndice}
          passivoCirculanteIndice={passivoCirculanteIndice}
          passivoNaoCirculanteIndice={passivoNaoCirculanteIndice}
          patrimonioLiquidoIndice={patrimonioLiquidoIndice}

          compromissosAssumidos={compromissosAssumidos}

          receitaBrutaCompromisso={receitaBruta}
          declaracaoCompromisso={declaracao}
          dreCompromisso={dre}
          justRecuperacaoCompromisso={justificativaRecuperacao}

        />

      </form>
    </div>
  );
}