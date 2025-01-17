import React, { useState } from 'react';
import * as XLSX from 'xlsx'; // Importação da biblioteca xlsx
import Footer from '../../components/Footer/footer';
import './StyleListaCredor.css';
import NavbarCadastro from '../../components/Navbar/navbar-cadastro/navbar-cadastro';

export default function ListaCredor() {
  // Estado para armazenar os dados do Excel após leitura
  const [fileData, setFileData] = useState([]);
  const [error, setError] = useState('');
  const [copiedBlocks, setCopiedBlocks] = useState([]);

  // Posições das colunas
  const columnPositions = {
    CPF: 0,       // Suponha que a coluna CPF está na posição 0
    BANCO: 1,     // Suponha que a coluna BANCO está na posição 1
    AGENCIA: 2,   // Suponha que a coluna AGENCIA está na posição 2
    CONTA: 3,     // Suponha que a coluna CONTA está na posição 3
    VALOR: 5      // Suponha que a coluna VALOR está na posição 5
  };

  // Função para processar o arquivo Excel
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    // Checa se algum arquivo foi enviado
    if (!file) {
      setError('Por favor, selecione um arquivo.');
      return;
    }

    const reader = new FileReader();
    // Quando o arquivo for carregado no FileReader
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      try {
        // Lê o arquivo Excel usando a biblioteca xlsx
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0]; // Seleciona a primeira aba
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Converte para JSON

        // Formata os CPFs, bancos, agências, contas e valores nas posições corretas
        const formattedData = data.map((row, rowIndex) => {
          if (rowIndex === 0) return row; // Mantém os cabeçalhos originais
          return row.map((cell, cellIndex) => {
            if (cellIndex === columnPositions.CPF) {
              return formatCPF(cell);
            } else if (cellIndex === columnPositions.BANCO) {
              return formatBanco(cell);
            } else if (cellIndex === columnPositions.AGENCIA) {
              return formatAgencia(cell);
            } else if (cellIndex === columnPositions.CONTA) {
              return formatConta(cell);
            } else if (cellIndex === columnPositions.VALOR) {
              return formatValor(cell);
            }
            return cell;
          });
        });

        setFileData(formattedData); // Define os dados em estado
        setError(''); // Limpa os erros
      } catch (err) {
        console.error('Erro ao processar o arquivo:', err);
        setError('Erro ao processar o arquivo. Verifique o formato.');
      }
    };

    reader.readAsBinaryString(file);
  };

  // Função para formatar CPF
  const formatCPF = (cpf) => {
    if (!cpf) return '';
    return cpf.replace(/\D/g, '').padStart(11, '0');
  };

  // Função para formatar Banco
  const formatBanco = (banco) => {
    if (!banco) return '';
    return banco.toString().padStart(3, '0');
  };

  // Função para formatar Agência
  const formatAgencia = (agencia) => {
    if (!agencia) return '';
    let formattedAgencia = agencia.toString().replace(/\D/g, '').padStart(4, '0');
    if (formattedAgencia === '9999' || formattedAgencia === '0999' || formattedAgencia === '999') {
      formattedAgencia = '0001';
    }
    return formattedAgencia;
  };

  // Função para formatar Conta
  const formatConta = (conta) => {
    if (!conta) return '';
    return conta.toString().replace(/\D/g, ''); // Remove pontos e traços
  };

  // Função para formatar Valor
  const formatValor = (valor) => {
    if (!valor) return '';
    return valor.toString().replace(/\D/g, '' ); // Remove a vírgula, mantendo todos os números
  };

  // Função para copiar os dados de um bloco específico para a área de transferência
  const copiarBloco = (bloco, blocoIndex) => {
    const indiceCPF = fileData[0].indexOf('CPF');
    const indiceVariacao = fileData[0].indexOf('VARIAÇÃO');

    const conteudo = bloco.map(linha => {
      let novaLinha = [...linha];

      // Adiciona 3 colunas após o CPF
      if (indiceCPF !== -1) {
        novaLinha.splice(indiceCPF + 1, 0, '', '', '');
      }

      // Adiciona 7 colunas após "variação"
      if (indiceVariacao !== -1) {
        novaLinha.splice(indiceVariacao + 4, 0, '', '', '', '', '', '', '');
      }

      return novaLinha.join('\t');
    }).join('\n\n'); // Formata para copiar em texto tabulado com linha em branco entre cada linha

    navigator.clipboard.writeText(conteudo)
      .then(() => setCopiedBlocks([...copiedBlocks, blocoIndex])) // Adiciona o índice do bloco copiado
      .catch(() => alert('Erro ao copiar os dados.'));
  };

  // Dividir dados em blocos de 7 linhas (ignora o cabeçalho, que aparece separadamente)
  const blocos = [];
  for (let i = 1; i < fileData.length; i += 7) {
    blocos.push(fileData.slice(i, i + 7));
  }

  return (
    <div className='container-lista1'>
      <NavbarCadastro /><br/>

      <div className="container-lista2">
        <div className="lista1">
          <iframe
            className="video-lista"
            width="360"
            height="200"
            src="https://www.youtube.com/embed/DD3amWHThKk?si=aWNvh0A1XmRaF1h7"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          
          <label className="label-lista">
            <input
              className="input-lista"
              type="file"
              accept=".xls, .xlsx"
              onChange={handleFileUpload}
            />
            {/*<button className="button-lista-buscar">Buscar</button>*/}
          </label>

          {error && <p className="error-message">{error}</p>}

          {/*<button className="button-lista-conf">Configurar Lista</button>*/}
        </div>

        <div className="result-container">
          <h3 className="result-title">Dados do Arquivo Excel:</h3>
          {fileData.length > 0 ? (
            <div className="blocos-container">
              {blocos.map((bloco, blocoIndex) => (
                <div
                  key={blocoIndex}
                  className={`bloco ${copiedBlocks.includes(blocoIndex) ? 'copied' : ''}`}
                >
                  <div className="bloco-header">
                    <span className="bloco-numero">Bloco {blocoIndex + 1}</span>
                    <button
                      className="bloco-copiar"
                      onClick={() => copiarBloco(bloco, blocoIndex)}
                    >
                      Copiar
                    </button>
                  </div>
                  <table className="bloco-tabela">
                    <thead>
                      <tr>
                        {fileData[0].map((header, index) => (
                          <th key={index}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {bloco.map((linha, linhaIndex) => (
                        <tr key={linhaIndex}>
                          {linha.map((celula, celulaIndex) => (
                            <td key={celulaIndex}>{celula || '-'}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">Nenhum dado carregado.</p>
          )} <br/><br/>
        </div>
      </div>

      <Footer />
    </div>
  );
}














