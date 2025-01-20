export const formatarCPF = (cpf) => {
    const cpfNumerico = cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos.
    return cpfNumerico.padStart(11, '0'); // Adiciona zeros à esquerda até ter 11 dígitos.
};

export const formatarBanco = (banco) => {
    return banco.padStart(3, '0'); // Adiciona zeros à esquerda até ter 3 dígitos.
};

export const formatarAgencia = (agencia) => {
    let agenciaNumerica = agencia.replace(/\D/g, ''); // Remove caracteres não numéricos.
    return agenciaNumerica === '9999' ? '0001' : agenciaNumerica.padStart(4, '0');
};

export const formatarConta = (conta, banco, tipoConta) => {
    let contaNumerica = conta.replace(/\D/g, '');
    if (tipoConta === 'poupanca') {
        switch (banco) {
            case '033':
                return `600${contaNumerica.padStart(7, '0')}`;
            case '341':
                return `500${contaNumerica.padStart(7, '0')}`;
            case '001':
                return `51${contaNumerica.padStart(9, '0')}`;
            default:
                return contaNumerica;
        }
    }
    return contaNumerica;
};

export const formatarValor = (valor) => {
    if (!valor) return '';
    return parseFloat(valor) * 100;
};

export const detectarCPFsDuplicados = (fileData, indiceCPF) => {
    const cpfCount = {}; // Contador dos CPFs

    fileData.forEach((linha, index) => {
        if (index === 0) return; // Ignorar a primeira linha (cabeçalho)
        const cpf = linha[indiceCPF];
        if (!cpf) return;

        if (cpfCount[cpf]) {
            cpfCount[cpf]++;
        } else {
            cpfCount[cpf] = 1;
        }
    });

    // Retornar um objeto com os CPFs duplicados marcados como true
    return Object.keys(cpfCount).reduce((acc, cpf) => {
        if (cpfCount[cpf] > 1) acc[cpf] = true;
        return acc;
    }, {});
};

