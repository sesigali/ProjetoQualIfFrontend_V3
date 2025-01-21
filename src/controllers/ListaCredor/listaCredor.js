import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Footer from '../../components/Footer/footer';
import './StyleListaCredor.css';
import NavbarCadastro from '../../components/Navbar/navbar-cadastro/navbar-cadastro';
import { FaArrowUp } from 'react-icons/fa'; // Importe o ícone de seta para cima

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

// Função para formatar Agência
export const formatarAgencia = (agencia) => {
    if (!agencia) return '';
    let formattedAgencia = agencia.toString().replace(/\D/g, '').padStart(4, '0');
    if (formattedAgencia === '9999' || formattedAgencia === '0999' || formattedAgencia === '999') {
      formattedAgencia = '0001';
    }
    return formattedAgencia;
};

// Função para formatar Conta
export const formatarConta = (conta) => {
    if (!conta) return '';
    return conta.toString().replace(/\D/g, '');
};

// Função para formatar Valor
export const formatarValor = (valor) => {
    if (!valor) return '';
    const valorMultiplicado = parseFloat(valor) * 100;
    return valorMultiplicado.toFixed(0);
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

    // Calcula o primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpfNumerico.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfNumerico.substring(9, 10))) return false;

    soma = 0;
    // Calcula o segundo dígito verificador
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
        if (index === 0) return; // Ignorar cabeçalho
        const cpf = linha[indiceCPF];
        if (!cpf) return;

        if (cpfCount[cpf]) {
            cpfCount[cpf]++;
        } else {
            cpfCount[cpf] = 1;
        }
    });

    // Retorna CPFs duplicados
    return Object.keys(cpfCount).reduce((acc, cpf) => {
        if (cpfCount[cpf] > 1) acc[cpf] = true;
        return acc;
    }, {});
};

export default function ListaCredor() {
  const [fileData, setFileData] = useState([]);
  const [error, setError] = useState('');
  const [copiedBlocks, setCopiedBlocks] = useState([]);
  const [duplicadosCPF, setDuplicadosCPF] = useState({}); // Estado para CPFs duplicados
  const [showScrollButton, setShowScrollButton] = useState(false);

  const columnPositions = {
    CPF: 0,
    BANCO: 1,
    AGENCIA: 2,
    CONTA: 3,
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

        // Formata os dados, incluindo o CPF
        const formattedData = data.map((row, rowIndex) => {
          if (rowIndex === 0) return row; // Mantém o cabeçalho original
          return row.map((cell, cellIndex) => {
            if (cellIndex === columnPositions.CPF) {
              return formatarCPF(cell); // Aplica formatação ao CPF
            } else if (cellIndex === columnPositions.BANCO) {
              return formatarBanco(cell);
            } else if (cellIndex === columnPositions.AGENCIA) {
              return formatarAgencia(cell);
            } else if (cellIndex === columnPositions.CONTA) {
              return formatarConta(cell);
            } else if (cellIndex === columnPositions.VALOR) {
              return formatarValor(cell);
            }
            return cell; // Mantém outras células sem alteração
          });
        });

        // Identificar CPFs duplicados
        const indiceCPF = formattedData[0]?.indexOf('CPF');
        if (indiceCPF === -1) {
          setError('A coluna "CPF" não foi encontrada no arquivo.');
          return;
        }
        const duplicados = detectarCPFsDuplicados(formattedData, indiceCPF);

        setDuplicadosCPF(duplicados); // Atualiza o estado com CPFs duplicados
        setFileData(formattedData); // Salva os dados formatados
        setError('');
      } catch (err) {
        console.error('Erro ao processar o arquivo:', err);
        setError('Erro ao processar o arquivo. Verifique o formato.');
      }
    };

    reader.readAsBinaryString(file);
  };

  // Função para copiar o bloco (preservada como no código original)
  const copiarBloco = (bloco, blocoIndex) => {
    const indiceCPF = fileData[0].indexOf('CPF');
    const indiceConta = fileData[0].indexOf('CONTA');
    const indiceVariacao = fileData[0].indexOf('VARIAÇÃO'); // Index da coluna "VARIAÇÃO"
  
    // Mapeia todas as linhas do bloco
    const conteudo = bloco.map(linha => {
      let novaLinha = [...linha];
      
      if (indiceCPF !== -1) {
        novaLinha = [...novaLinha.slice(0, indiceCPF + 1), '', '', '', ...novaLinha.slice(indiceCPF + 1)];
      }
      
      // Remove a coluna "VARIAÇÃO"
      if (indiceVariacao !== -1) {
        novaLinha.splice(7, 1); // Remove o elemento da posição correspondente
      } 
      
      if (indiceConta !== -1) {
        novaLinha = [...novaLinha.slice(0, indiceConta + 4), '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ...novaLinha.slice(indiceConta + 4)];
      }   
      
      return novaLinha.join('\t'); // Junta as colunas da linha em formato de texto tabulado
    }).join('\n\n'); // Junta as linhas com quebras de linha duplas
  
    // Copia o resultado formatado para a área de transferência
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
              elimina ajustes manuais e reduz erros.
            </p>
          </div>

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
                            <tr key={linhaIndex}>
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

                                    return (
                                        <td
                                            key={celulaIndex}
                                            className={className}
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
      </div>
      {showScrollButton && (
        <button onClick={scrollToTop} className="scroll-to-top">
          <FaArrowUp />
        </button>
      )}
      <Footer />
    </div>
  );
}
