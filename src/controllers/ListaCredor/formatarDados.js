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
    return valor.replace(',', ''); // Remove a vírgula, mantendo os centavos.
};
