import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Footer from '../../components/Footer/footer';
import './StyleListaCredor.css';
import NavbarCadastro from '../../components/Navbar/navbar-cadastro/navbar-cadastro';
import { FaArrowUp } from 'react-icons/fa';

// Função para formatar CPF
export const formatarCPF = (cpf) => {
  if (!cpf) return '';
  const cpfNumerico = String(cpf).replace(/\D/g, '');
  return cpfNumerico.padStart(11, '0');
};

// Função para formatar Banco
export const formatarBanco = (banco) => {
  if (!banco) return '';
  return banco.toString().padStart(3, '0');
};

// Função para formatar Agência com 4 dígitos
export const formatarAgencia = (agencia) => {
  if (!agencia) return '';
  let formattedAgencia = agencia.toString().replace(/\D/g, '');
  formattedAgencia = formattedAgencia.slice(0, 4).padStart(4, '0');
  if (['9999', '0999', '999'].includes(formattedAgencia)) {
    formattedAgencia = '0001';
  }
  return formattedAgencia;
};

// Função para tratar o "X" na conta e remover zeros à esquerda
export const tratarXNaConta = (conta) => {
  if (!conta) return '';
  const contaMaiuscula = conta.toString().toUpperCase(); // Converte para maiúscula
  const contaSemZeros = contaMaiuscula.replace(/^0+/, ''); // Remove zeros à esquerda
  return contaSemZeros;
};

// Mapeamento para substituir o último dígito na poupança DO BB
const mapaPoupancaBB = {
  '0': '3',
  '1': '4',
  '2': '5',
  '3': '6',
  '4': '7',
  '5': '8',
  '6': '9',
  '7': 'X',
  '8': '0',
  '9': '1',
  'X': '2',
};

// Função para formatar Conta
export const formatarConta = (conta, variacao, banco) => {
  if (!conta) return '';

  const contaTratada = tratarXNaConta(conta); // Chama a função para tratar o 'X'

  const bancoBB = ['001', '01', '1'].includes(banco.toString());
  const bancoItau = ['341'].includes(banco.toString());
  const bancoSantander = ['033', '33'].includes(banco.toString());

  // Corrige a verificação de isPoupanca
  const isPoupanca = ['CONTA POUPANÇA', 'CONTA POUPANCA', 'POUPANCA', 'POUPANÇA', 'P'].includes(variacao.toUpperCase());

  // Remove caracteres indesejados para todos os casos
  let contaNumerica = contaTratada.replace(/[^0-9X]/g, ''); // Remove não numéricos, exceto X

  if (isPoupanca) { // Apenas verifica se é Banco do Brasil
    if (bancoBB) {
      // Substituir o último dígito conforme a tabela, se for conta poupança
      const ultimoDigito = contaNumerica.slice(-1); // Obtém o último dígito
      const novoDigito = mapaPoupancaBB[ultimoDigito] || ultimoDigito; // Substitui pelo novo valor ou mantém o mesmo
      contaNumerica = contaNumerica.slice(0, -1) + novoDigito; // Atualiza o último dígito

      return `51${contaNumerica.padStart(8, '0')}`;
    } else if (bancoItau) {
      return `500${contaNumerica}`;

    } else if (bancoSantander) {
      return `600${contaNumerica}`;

    } else { // É conta corrente ou outro tipo de conta do BB
      return contaNumerica; // Retorna a conta tratada (com o X, se houver)
    }
  } else { // Outros bancos
    return contaNumerica; // Retorna a conta tratada (com o X, se houver)
  }
};

// Função para formatar Valor, removendo R$, espaços e caracteres especiais
export const formatarValor = (valor) => {
  if (!valor) return '';
  const valorSemFormatacao = valor.toString().replace(/[^0-9,.]/g, ''); // Remove R$, espaços e outros caracteres não numéricos
  const valorFinal = parseFloat(valorSemFormatacao.replace(',', '.')) * 100; // Substitui vírgula por ponto e multiplica por 100
  return valorFinal.toFixed(0); // Retorna como string sem casas decimais
};


// Função para validar CPF
export const validarCPF = (cpf) => {
  if (!cpf) return false;

  const cpfNumerico = cpf.replace(/\D/g, '');
  if (cpfNumerico.length !== 11 || /^(\d)\1{10}$/.test(cpfNumerico)) {
    return false;
  }

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpfNumerico.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpfNumerico.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpfNumerico.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpfNumerico.substring(10, 11))) return false;

  return true;
};

// Função para detectar CPFs duplicados
export const detectarCPFsDuplicados = (fileData, indiceCPF) => {
  const cpfCount = {};

  fileData.forEach((linha, index) => {
    if (index === 0) return;
    const cpf = linha[indiceCPF];
    if (!cpf) return;

    if (cpfCount[cpf]) {
      cpfCount[cpf]++;
    } else {
      cpfCount[cpf] = 1;
    }
  });

  return Object.keys(cpfCount).reduce((acc, cpf) => {
    if (cpfCount[cpf] > 1) acc[cpf] = true;
    return acc;
  }, {});
};

export default function ListaCredor() {
  const [fileData, setFileData] = useState([]);
  const [error, setError] = useState('');
  const [copiedBlocks, setCopiedBlocks] = useState([]);
  const [duplicadosCPF, setDuplicadosCPF] = useState({});
  const [showScrollButton, setShowScrollButton] = useState(false);

  const columnPositions = {
    CPF: 0,
    BANCO: 1,
    AGENCIA: 2,
    CONTA: 3,
    VARIACAO: 4, // Certifique-se de que este índice esteja correto
    VALOR: 5,
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError('Por favor, selecione um arquivo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      try {
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        console.log('Dados lidos do Excel:', data);

        const formattedData = data.map((row, rowIndex) => {
          if (rowIndex === 0) return row;
          return row.map((cell, cellIndex) => {
            if (cellIndex === columnPositions.CPF) {
              return formatarCPF(cell);
            } else if (cellIndex === columnPositions.BANCO) {
              return formatarBanco(cell);
            } else if (cellIndex === columnPositions.AGENCIA) {
              return formatarAgencia(cell);
            } else if (cellIndex === columnPositions.CONTA) {
              const variacao = row[columnPositions.VARIACAO]?.toUpperCase();
              const banco = row[columnPositions.BANCO];
              return formatarConta(cell, variacao, banco);
            } else if (cellIndex === columnPositions.VALOR) {
              return formatarValor(cell);
            }
            return cell;
          });
        });


        const indiceCPF = formattedData[0]?.indexOf('CPF');
        if (indiceCPF === -1) {
          setError('A coluna "CPF" não foi encontrada no arquivo.');
          return;
        }
        const duplicados = detectarCPFsDuplicados(formattedData, indiceCPF);

        const indiceVariacao = formattedData[0]?.indexOf('VARIAÇÃO');
        if (indiceVariacao === -1) {
          setError('A coluna "VARIAÇÃO" não foi encontrada no arquivo.');
          return;
        }

        setDuplicadosCPF(duplicados);
        setFileData(formattedData);
        setError('');
      } catch (err) {
        console.error('Erro ao processar o arquivo:', err);
        setError('Erro ao processar o arquivo. Verifique a formatação das colunas.');
      }
    };

    reader.readAsBinaryString(file);
  };

  const copiarBloco = (bloco, blocoIndex) => {
    const indiceCPF = fileData[0].indexOf('CPF');
    const indiceConta = fileData[0].indexOf('CONTA');
    const indiceVariacao = fileData[0].indexOf('VARIAÇÃO');

    const conteudo = bloco.map(linha => {
      let novaLinha = [...linha];

      if (indiceCPF !== -1) {
        novaLinha = [...novaLinha.slice(0, indiceCPF + 1), '', '', '', ...novaLinha.slice(indiceCPF + 1)];
      }

      if (indiceVariacao !== -1) {
        novaLinha.splice(7, 1);
      }

      if (indiceConta !== -1) {
        novaLinha = [...novaLinha.slice(0, indiceConta + 4), '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ...novaLinha.slice(indiceConta + 4)];
      }

      return novaLinha.join('\t');
    }).join('\n\n');

    navigator.clipboard.writeText(conteudo)
      .then(() => setCopiedBlocks([...copiedBlocks, blocoIndex]))
      .catch(() => alert('Erro ao copiar os dados.'));
  };


  const blocos = [];
  for (let i = 1; i < fileData.length; i += 7) {
    blocos.push(fileData.slice(i, i + 7));
  }
  return (
    <div className='container-lista1'>
      <NavbarCadastro /><br />

      <div className="container-lista2">
        <div className="lista1">

          <div className="intro-container">
            <h2 className="title2">Bem-vindo ao Sistema de Lista de Credores</h2>
            <p className="intro-text">
              O sistema QualIF - Módulo Lista de Credor automatiza a formatação de dados financeiros de planilhas Excel,
              organizando informações de credores de forma eficiente e em conformidade com o ATULC do SIAFI. Sua interface intuitiva
              elimina ajustes manuais e reduz erros. A planilha deve conter as seguintes colunas:
            </p>
          </div>

          <p className="intro-text">CPF  |  BANCO  |  AGÊNCIA  |  CONTA  |  VARIAÇÃO  |  VALOR</p>

          <iframe 
          width="360" 
          height="210" 
          src="https://www.youtube.com/embed/biLS3js1d1c?si=LQJiEGwtrY-lu6Hp" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerpolicy="strict-origin-when-cross-origin" 
          allowfullscreen>  
          </iframe>

          <label className="label-lista">
            <input
              className="input-lista"
              type="file"
              accept=".xls, .xlsx"
              onChange={handleFileUpload}
            />
          </label>

          {error && <p className="error-message">{error}</p>}
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
                        <tr key={linhaIndex} >
                          {linha.map((celula, celulaIndex) => {
                            const isDuplicate = duplicadosCPF[celula];
                            const isValid = validarCPF(celula);
                            const tooltip = !isValid
                              ? 'CPF inválido'
                              : isDuplicate
                                ? 'CPF duplicado'
                                : '';
                            const className = celulaIndex === columnPositions.CPF && !isValid
                              ? 'cpf-invalido'
                              : celulaIndex === columnPositions.CPF && isDuplicate
                                ? 'cpf-duplicado'
                                : '';
                            const variacao = linha[columnPositions.VARIACAO]?.toUpperCase();
                            const isPoupanca = ['CONTA POUPANÇA', 'CONTA POUPANCA', 'POUPANCA', 'POUPANÇA', 'P'].includes(variacao);
                            const isVariacaoCell = celulaIndex === columnPositions.VARIACAO; // Nova variável

                            const cellClassName = `${className} ${isVariacaoCell && isPoupanca ? 'linha-poupanca' : ''}`;

                            return (
                              <td
                                key={celulaIndex}
                                className={cellClassName}
                                title={tooltip}
                              >
                                {celula || '-'}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table><br />
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">Nenhum dado carregado.</p>
          )}
        </div>
      </div><br /><br /><br />
      {showScrollButton && (
        <button onClick={scrollToTop} className="scroll-to-top">
          <FaArrowUp />
        </button>
      )}
      <Footer />
    </div>
  );
}
