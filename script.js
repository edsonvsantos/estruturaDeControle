const idadeInput = document.getElementById('idadeInput');
const verifyButton = document.getElementById('verifyButton');
const result = document.getElementById('resultado');

function verificarIdade(){
    resultado.classList.remove('visivel');
    const idade = parseInt(idadeInput.value);
    let mensagem = '';

    if(isNaN(idade) || idade <0){
        mensagem = "Por favor, insira uma idade válida."
    }else if(idade < 18){
        mensagem = "Você é menor de idade."
    }else if(idade <= 65){
        
    }
}