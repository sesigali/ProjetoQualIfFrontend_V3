// import * as xlsx from 'xlsx'; // Biblioteca para leitura de arquivos Excel no frontend
// import { formatarCPF, formatarBanco, formatarAgencia, formatarConta, formatarValor } from './formatarDados';
// import { validarCPF, validarBanco, validarAgencia, validarConta, validarValor } from './validarDados';

// // Função para realizar o upload e ler o arquivo Excel
// export const uploadArquivo = (file) => {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = (event) => {
//             try {
//                 const binaryString = event.target.result;
//                 const workbook = xlsx.read(binaryString, { type: 'binary' });
//                 const sheetName = workbook.SheetNames[0];
//                 const sheet = workbook.Sheets[sheetName];
//                 const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

//                 resolve(data);
//             } catch (error) {
//                 reject('Erro ao ler o arquivo Excel. Certifique-se de que o arquivo está no formato correto.');
//             }
//         };

//         reader.onerror = () => {
//             reject('Erro ao carregar o arquivo. Tente novamente.');
//         };

//         reader.readAsBinaryString(file);
//     });
// };

// // Função para processar os dados extraídos do arquivo Excel
// export const processarLinhas = (dados) => {
//     const dadosProcessados = [];

//     // Supondo que a primeira linha contém os cabeçalhos
//     const [header, ...linhas] = dados;

//     linhas.forEach((linha, index) => {
//         try {
//             const [cpf, banco, agencia, conta, tipoConta, valor] = linha;

//             // Valida e formata os campos
//             const cpfValido = validarCPF(cpf) ? formatarCPF(cpf) : null;
//             const bancoValido = validarBanco(banco) ? formatarBanco(banco) : null;
//             const agenciaValida = validarAgencia(agencia) ? formatarAgencia(agencia) : null;
//             const contaValida = validarConta(conta, tipoConta) ? formatarConta(conta, banco, tipoConta) : null;
//             const valorValido = validarValor(valor) ? formatarValor(valor) : null;

//             // Verifica se todos os campos foram validados corretamente
//             if (cpfValido && bancoValido && agenciaValida && contaValida && valorValido) {
//                 dadosProcessados.push({
//                     cpf: cpfValido,
//                     banco: bancoValido,
//                     agencia: agenciaValida,
//                     conta: contaValida,
//                     valor: valorValido,
//                 });
//             } else {
//                 console.warn(`Erro de validação na linha ${index + 2}. Os dados foram ignorados.`);
//             }
//         } catch (error) {
//             console.warn(`Erro ao processar a linha ${index + 2}: ${error.message}`);
//         }
//     });

//     return dadosProcessados;
// };

// // Função principal para integrar o upload e processamento
// export const processarArquivoExcel = async (file) => {
//     try {
//         const dados = await uploadArquivo(file);
//         const dadosProcessados = processarLinhas(dados);

//         if (dadosProcessados.length === 0) {
//             throw new Error('Nenhuma linha válida foi encontrada no arquivo. Verifique os dados e tente novamente.');
//         }

//         return dadosProcessados;
//     } catch (error) {
//         throw new Error(`Erro no processamento do arquivo: ${error.message}`);
//     }
// };
