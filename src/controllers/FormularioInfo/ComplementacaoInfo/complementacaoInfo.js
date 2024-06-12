import React, { useState, useEffect } from "react";
import axios from "axios";
import CompromissosAssumidosInfo from "../CompromissoInfo/compromissoInfo";
import { NumericFormat } from "react-number-format";

export default function ComplementacaoInfo({
  idEmpresa,
  //valorEstimadoContrato,

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
  patrimonioLiquidoIndice

}) {
  // Variáveis de estado
  const [capitalGiro, setCapitalGiro] = useState("");
  const [ccl, setCcl] = useState("");
  const [umDozeAvos, setUmDozeAvos] = useState("");
  const [txCclValorEstimado, settxCclValorEstimado] = useState("");
  const [indiceResult, setIndiceResult] = useState("");
  const [compromissosAssumidos, setCompromissosAssumidos] = useState("0");
  const [erro, setErro] = useState(null);
  const [ultimoCadastro, setUltimoCadastro] = useState({ valorEstimadoContrato: '' });

  // Função para buscar os dados mais recentes quando o componente é montado
  useEffect(() => {
    async function fetchUltimoCadastro() {
      try {
        const response = await axios.get('http://localhost:8888/empresa/ultimoCadastro');
        const data = response.data;

        if (data) {
          setUltimoCadastro(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchUltimoCadastro();
  }, []);

  // Calcular valores quando as dependências mudam
  useEffect(() => {
    setErro(null);

    if (!ultimoCadastro.valorEstimadoContrato || isNaN(ultimoCadastro.valorEstimadoContrato)) {
      setErro("Por favor, forneça um valor válido para o Valor Estimado do Contrato.");
      return;
    }

    const patrimonioLiquidoNum = parseFloat(patrimonioLiquidoIndice);
    const valorEstimadoNum = parseFloat(ultimoCadastro.valorEstimadoContrato);
    const requisitoMinimo = (16.66 / 100) * valorEstimadoNum;
    const cclValue = parseFloat(ativoCirculanteIndice) - parseFloat(passivoCirculanteIndice);
    const taxaEmpresaCclContrato = (cclValue / valorEstimadoNum) * 100;
    const umDozeAvosIndice = parseFloat(compromissosAssumidos) / 12;
    const umDozeAvosValue = (parseFloat(patrimonioLiquidoNum) / parseFloat(compromissosAssumidos)) * 12;
    const ultrapassaValor = parseFloat(umDozeAvosIndice) > parseFloat(patrimonioLiquidoNum);
    const atendeRequisitos = cclValue >= requisitoMinimo;

    setCapitalGiro(atendeRequisitos);
    setCcl(cclValue);
    setUmDozeAvos(umDozeAvosIndice);
    settxCclValorEstimado(taxaEmpresaCclContrato);

    setIndiceResult({
      requisitoMinimo,
      atendeRequisitos,
      umDozeAvosValue,
      ultrapassaValor,
      patrimonioLiquidoIndice,
      patrimonioLiquidoNum,
      txCclValorEstimado,
    });
  }, [ultimoCadastro.valorEstimadoContrato, capitalGiro, ativoCirculanteIndice, passivoCirculanteIndice, patrimonioLiquidoIndice, compromissosAssumidos]);

  const handleCadastroCompromissos = async (event) => {
    event.preventDefault();

    const compromissos = {
      comprAssumidos: compromissosAssumidos,
      idEmpresa: idEmpresa,
    };

    try {
      // Adicione a lógica para enviar os compromissos para o backend
      console.log('DaBD', compromissos);
      const response = await axios.post('http://localhost:8888/complementacao/adicionar', compromissos);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleValueChange = (values) => {
    const { value } = values;
    setCompromissosAssumidos(value);
  };

  return (
    <div>
      <hr />
      <h1 className="title-info">Complementação da Qualificação Econômico-Financeira</h1>
      <form onSubmit={handleCadastroCompromissos}>
        <p>Comprovação de possuir Capital Circulante Líquido (CCL) ou Capital de Giro <br />
          (Ativo Circulante - Passivo Circulante) de, no mínimo, 16,66% (dezesseis inteiros <br />
          e sessenta e seis centésimos por cento) do valor estimado do contrato.</p>

        <div className="complInfo">
          <label>Capital Circulante Líquido (CCL) ou Capital de Giro: R$ {isNaN(ccl) ? "Indefinido" : ccl.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</label>
        </div>
        <div className="complInfo">
          <label>Valor Estimado do Contrato: R$ {ultimoCadastro.valorEstimadoContrato ? ultimoCadastro.valorEstimadoContrato.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'Indefinido'}</label>
        </div>

        {indiceResult && (
          <div>
            <p><h4>Resultados</h4></p>
            <p>Requisito mínimo CCL 16,66% do valor estimado: R$ {indiceResult.requisitoMinimo.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>


            <p>Total de Capital de Giro (CCL) estimado sobre o valor da contratação: {isNaN(txCclValorEstimado) ? "Indefinido" : txCclValorEstimado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%</p>

            <p>Atende aos Requisitos: <span className={indiceResult.atendeRequisitos ? "texto-azul" : "texto-vermelho"}>{indiceResult.atendeRequisitos ? "Sim" : "Não"}</span></p>
            <hr />

            <div>
              <p>A Declaração de Compromissos Assumidos deve informar que 1/12 (um doze avos)<br>
              </br> dos contratos firmados pela licitante não é superior ao Patrimônio Líquido da licitante </p>
            </div>

            <div className="complInfo">
              <label>Compromissos Assumidos:</label>
              <NumericFormat
                name="compromissosAssumido"
                value={compromissosAssumidos}
                onValueChange={(values) => handleValueChange(values, "compromissosAssumidos")}
                allowNegative={false}
                decimalScale={2}
                decimalSeparator=','
                thousandSeparator='.'
              />
            </div>
            
            <p>1/12 dos Compromissos Assumidos: R$ {isNaN(umDozeAvos) ? "Indefinido" : umDozeAvos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>

            {indiceResult.ultrapassaValor}
            {indiceResult.atendeRequisitos}

            <p>Patrimônio Líquido: R$ {indiceResult.patrimonioLiquidoNum.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>

            <p>1/12 do valor dos compromissos assumidos ultrapassa o Patrimonial Líquido: <span className={indiceResult.ultrapassaValor ? "texto-vermelho" : "texto-azul"}>
              {indiceResult.ultrapassaValor ? "Sim" : "Não"}</span>
            </p>


          </div>
        )}

        {/* <button type="submit">Enviar</button> */}
      </form>
      <hr />
      <CompromissosAssumidosInfo
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
      />
    </div>
  );
}