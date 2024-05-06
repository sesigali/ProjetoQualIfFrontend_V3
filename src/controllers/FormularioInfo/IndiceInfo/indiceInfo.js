import React, { useState, useEffect } from "react";
import axios from "axios";
import PatrimonioLiqInfo from "../PatrimonioLiqInfo/patrimonioLiqInfo";
import ComplementacaoInfo from "../ComplementacaoInfo/complementacaoInfo";

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
  const [liquidezGeral, setLiquidezGeral] = useState(null);
  const [solvenciaGeral, setSolvenciaGeral] = useState(null);
  const [liquidezCorrente, setLiquidezCorrente] = useState(null);
  const [patrimonioLiquido, setPatrimonioLiquido] = useState("0");
  const [erro, setErro] = useState(null);
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (/^(\d*[\.,]?\d*)$/.test(value) || value === "") {
      if (name === "ativoCirculante") setAtivoCirculante(value);
      if (name === "ativoReaLongoPrazo") setAtivoRealizavelLongoPrazo(value);
      if (name === "ativoTotal") setAtivoTotal(value);
      if (name === "passivoCirculante") setPassivoCirculante(value);
      if (name === "passivoNaoCirculante") setPassivoNaoCirculante(value);

      const ativoCirculanteValue = parseFloat(ativoCirculante.replace(",", ".")) || 0;
      const ativoRealizavelLongoPrazoValue = parseFloat(ativoReaLongoPrazo.replace(",", ".")) || 0;
      const ativoTotalValue = parseFloat(ativoTotal.replace(",", ".")) || 0;
      const passivoCirculanteValue = parseFloat(passivoCirculante.replace(",", ".")) || 0;
      const passivoNaoCirculanteValue = parseFloat(passivoNaoCirculante.replace(",", ".")) || 0;

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
    }
  };

  //APAGAR ESSE MÉTODO, NAO ESTÁ SENDO MAIS UTILIZADO
  useEffect(() => {
    setErro(null);

    if (!valorEstimadoContrato || isNaN(valorEstimadoContrato)) {
      setErro("Por favor, forneça um valor válido para o Valor Estimado do Contrato.");
      return;
    }

  }, [valorEstimadoContrato, patrimonioLiquido]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8888/indice/adicionar', {
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
          <label>Ativo Circulante:</label>
          <input
            type="text"
            name="ativoCirculante"
            value={ativoCirculante}
            onChange={handleInputChange}
          />
        </div>
        <div className="indiceInfo">
          <label>Ativo Realizável a Longo Prazo:</label>
          <input
            type="text"
            name="ativoReaLongoPrazo"
            value={ativoReaLongoPrazo}
            onChange={handleInputChange}
          />
        </div>
        <div className="indiceInfo">
          <label>Ativo Total:</label>
          <input
            type="text"
            name="ativoTotal"
            value={ativoTotal}
            onChange={handleInputChange}
          />
        </div>
        <div className="indiceInfo">
          <label>Passivo Circulante:</label>
          <input
            type="text"
            name="passivoCirculante"
            value={passivoCirculante}
            onChange={handleInputChange}
          />
        </div>
        <div className="indiceInfo">
          <label>Passivo Não Circulante:</label>
          <input
            type="text"
            name="passivoNaoCirculante"
            value={passivoNaoCirculante}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className='patrimonioInfo'>Patrimônio Líquido:</label>
          <input
            type="text"
            name="patrimonioLiquido"
            value={patrimonioLiquido}
            onChange={(e) => setPatrimonioLiquido(e.target.value)}
          />
        </div>
        {/* <button type="submit">Enviar</button> */}
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