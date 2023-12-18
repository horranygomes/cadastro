'use strict'; 

const cepInput = document.querySelector('#cep');
const enderecoInput = document.querySelector('#endereco');
const bairroInput = document.querySelector('#bairro');
const cidadeInput = document.querySelector('#cidade');
const estadoInput = document.querySelector('#estado');

const limparFormulario = () => {
    enderecoInput.value = '';
    bairroInput.value = '';
    cidadeInput.value = '';
    estadoInput.value = '';
}

const preencherFormulario = (endereco) => {
    enderecoInput.value = endereco.logradouro;
    bairroInput.value = endereco.bairro;
    cidadeInput.value = endereco.localidade;
    estadoInput.value = endereco.uf;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && eNumero(cep);
const pesquisarCep = async () => {
    limparFormulario(); //chama a funcao pra garantir que todos os campos estejam limpos
    const cep = document.getElementById('cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;

    if (cepValido(cep)) {
        const dados = await fetch(url); //recebendo o resultado do fetch
        const endereco = await dados.json(); //pegando os dados e aplicando na funcao json
        if (endereco.hasOwnProperty('erro')) {
            document.getElementById('endereco').value = 'CEP não encontrado! :('
        } else {
            preencherFormulario(endereco);
        }
    } else {
        document.getElementById('endereco').value = 'CEP incorreto!';
    }

}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);
