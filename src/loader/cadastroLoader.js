import { axiosUrl } from "../axiosConfig";

async function cadastrarEmpresaLoader(empresaData) {
  try {
    const response = await axiosUrl.post("http://localhost:8888/empresa/adicionar", empresaData);
    if (response.status === 200) {
      return response.data; // Se cadastro bem-sucedido, retorna os dados da empresa cadastrada
    } else {
      throw new Error("Erro no cadastro de empresa");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { cadastrarEmpresaLoader };
