import React, { useState } from "react";
import axios from "axios";
import host from "../../../components/Host/host";
import PatrimonioLiqInfo from "../PatrimonioLiqInfo/patrimonioLiqInfo";
import ComplementacaoInfo from "../ComplementacaoInfo/complementacaoInfo";
import { NumericFormat } from "react-number-format";

export default function IndiceInfo({
  idEmpresa,
  valorEstimadoContrato,
  docRecuperacaoCertidao,
  certidaoNaturezaCertidao,
  anexoCertidao,
  balancoConfLeiBalanco,
  anexoBalanco
}) {
  const [ativoCirculante, setAtivoCirculante] = useState("0");
  const [ativoReaLongoPrazo, setAtivoRealizavelLongoPrazo] = useState("0");
  const [ativoTotal, setAtivoTotal] = useState("0");
  const [passivoCirculante, setPassivoCirculante] = useState("0");
  const [passivoNaoCirculante, setPassivoNaoCirculante] = useState("0");
  const [patrimonioLiquido, setPatrimonioLiquido] = useState("0");
  const [liquidezGeral, setLiquidezGeral] = useState(null);
  const [solvenciaGeral, setSolvenciaGeral] = useState(null);
  const [liquidezCorrente, setLiquidezCorrente] = useState(null);
  const [erro, setErro] = useState(null);
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  const handleInputChange = (values, name) => {
    const { floatValue } = values;

    if (name === "ativoCirculante") setAtivoCirculante(floatValue);
    if (name === "ativoReaLongoPrazo") setAtivoRealizavelLongoPrazo(floatValue);
    if (name === "ativoTotal") setAtivoTotal(floatValue);
    if (name === "passivoCirculante") setPassivoCirculante(floatValue);
    if (name === "passivoNaoCirculante") setPassivoNaoCirculante(floatValue);

    const ativoCirculanteValue = ativoCirculante;
    const ativoRealizavelLongoPrazoValue = ativoReaLongoPrazo;
    const ativoTotalValue = ativoTotal;
    const passivoCirculanteValue = passivoCirculante;
    const passivoNaoCirculanteValue = passivoNaoCirculante;

    const liquidezGeralResult =
      (ativoCirculanteValue + ativoRealizavelLongoPrazoValue) /
      (passivoCirculanteValue + passivoNaoCirculanteValue);
    const solvenciaGeralResult = ativoTotalValue / (passivoCirculanteValue + passivoNaoCirculanteValue);
    const liquidezCorrenteResult = ativoCirculanteValue / passivoCirculanteValue;

    if (!isNaN(liquidezGeralResult) && isFinite(liquidezGeralResult)) {
      setLiquidezGeral(liquidezGeralResult.toFixed(2));
    } else {
      setLiquidezGeral("Indefinido");
    }

    if (!isNaN(solvenciaGeralResult) && isFinite(solvenciaGeralResult)) {
      setSolvenciaGeral(solvenciaGeralResult.toFixed(2));
    } else {
      setSolvenciaGeral("Indefinido");
    }

    if (!isNaN(liquidezCorrenteResult) && isFinite(liquidezCorrenteResult)) {
      setLiquidezCorrente(liquidezCorrenteResult.toFixed(2));
    } else {
      setLiquidezCorrente("Indefinido");
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${host.API_BASE_URL}/indice/adicionar`, {
        ativoCirculante,
        ativoReaLongoPrazo,
        ativoTotal,
        passivoCirculante,
        passivoNaoCirculante,
        patrimonioLiquido,
        idEmpresa: idEmpresa,
      });

      console.log('Dados enviados com sucesso:', response.data);

      setFormularioEnviado(true);
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      setErro("Erro ao enviar os dados. Por favor, tente novamente.");
    }
  };

  return (
    <div className="">
      <h1 className="title-info">Índices Financeiros</h1>
      <form onSubmit={handleSubmit}>
        <div className="indiceInfo">
          <label>Ativo Circulante: R$ </label>
          <NumericFormat
            name="ativoCirculante"
            value={ativoCirculante}
            thousandSeparator="."
            decimalSeparator=","
            onValueChange={(values) => handleInputChange(values, "ativoCirculante")}
            allowNegative={false}
            decimalScale={2}
          />
        </div>

        <div className="indiceInfo">
          <label>Ativo Realizável a Longo Prazo: R$ </label>
          <NumericFormat
            name="ativoReaLongoPrazo"
            value={ativoReaLongoPrazo}
            thousandSeparator="."
            decimalSeparator=","
            onValueChange={(values) => handleInputChange(values, "ativoReaLongoPrazo")}
            allowNegative={false}
            decimalScale={2}
          />

        </div>
        <div className="indiceInfo">
          <label>Ativo Total: R$ </label>
          <NumericFormat
            name="ativoTotal"
            value={ativoTotal}
            thousandSeparator="."
            decimalSeparator=","
            onValueChange={(values) => handleInputChange(values, "ativoTotal")}
            allowNegative={false}
            decimalScale={2}
          />

        </div>
        <div className="indiceInfo">
          <label>Passivo Circulante: R$ </label>
          <NumericFormat
            name="passivoCirculante"
            value={passivoCirculante}
            thousandSeparator="."
            decimalSeparator=","
            onValueChange={(values) => handleInputChange(values, "passivoCirculante")}
            allowNegative={false}
            decimalScale={2}
          />

        </div>
        <div className="indiceInfo">
          <label>Passivo Não Circulante: R$ </label>
          <NumericFormat
            name="passivoNaoCirculante"
            value={passivoNaoCirculante}
            thousandSeparator="."
            decimalSeparator=","
            onValueChange={(values) => handleInputChange(values, "passivoNaoCirculante")}
            allowNegative={false}
            decimalScale={2}
          />

        </div>
        <div>
          <label className='patrimonioInfo'>Patrimônio Líquido: R$</label>
          <NumericFormat
            name="patrimonioLiquido"
            value={patrimonioLiquido}
            thousandSeparator="."
            decimalSeparator=","
            onValueChange={(values) => setPatrimonioLiquido(values.floatValue)}
            allowNegative={false}
            decimalScale={2}
          />
        </div>

      </form>
      <div>
        {formularioEnviado && <p>Dados enviados com sucesso!</p>}
        {erro && <p>Ocorreu um erro ao enviar os dados: {erro}</p>}
      </div>
      <div>
        <p>Liquidez Geral: {liquidezGeral || "Indefinido"}</p>
        <p>Solvência Geral: {solvenciaGeral || "Indefinido"}</p>
        <p>Liquidez Corrente: {liquidezCorrente || "Indefinido"}</p>
      </div>

      <hr />

      <PatrimonioLiqInfo
        idEmpresa={idEmpresa}
        valorEstimadoContrato={valorEstimadoContrato}
        patrimonioLiquido={patrimonioLiquido}
      />

      <ComplementacaoInfo
        idEmpresa={idEmpresa}

        docRecuperacaoCertidao={docRecuperacaoCertidao}
        certidaoNaturezaCertidao={certidaoNaturezaCertidao}
        anexoCertidao={anexoCertidao}

        balancoConfLeiBalanco={balancoConfLeiBalanco}
        anexoBalanco={anexoBalanco}

        ativoCirculanteIndice={ativoCirculante}
        ativoReaLongoPrazoIndice={ativoReaLongoPrazo}
        ativoTotalIndice={ativoTotal}
        passivoCirculanteIndice={passivoCirculante}
        passivoNaoCirculanteIndice={passivoNaoCirculante}
        patrimonioLiquidoIndice={patrimonioLiquido}
      />
    </div>
  );
}