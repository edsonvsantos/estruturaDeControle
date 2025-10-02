const idadeInput = document.getElementById('idadeInput');
const verifyButton = document.getElementById('verifyButton');
const result = document.getElementById('resultado');

function verificarIdade(){
    result.classList.remove('visivel');
    const idade = parseInt(idadeInput.value);
    let mensagem = '';

    if(isNaN(idade) || idade <0){
        mensagem = "Por favor, insira uma idade válida."
    }else if(idade < 18){
        mensagem = "Você é menor de idade."
    }else if(idade <= 65){
        mensagem = "Você é adulto."
    }else{
        mensagem = "Você é idoso."
    }

    setTimeout(() => {
        result.innerText = mensagem;
        result.classList.add('visivel');
    }, 100);
}

verifyButton.addEventListener('click', verificarIdade);
idadeInput.addEventListener('keyup', (event) => {
    if(event.key === 'Enter') verificarIdade();
});

const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height - window.innerHeight;

let mouse = {
    x: null,
    y: null,
    radius: 150
};

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

let particulasArray = [];
const numeroDeParticulas = 100;

class Particula{
    constructor(x, y, direcaoX, direcaoY, tamanho, cor){
        this.x = x;
        this.y = y;
        this.direcaoX = direcaoX;
        this.direcaoY = direcaoY;
        this.tamanho = tamanho;
        this.cor = cor;
    }

        desenhar(){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.tamanho, 0, Math.PI * 2, false);
            ctx.fillstyle = '#007bff';
            ctx.fill();
        }
}