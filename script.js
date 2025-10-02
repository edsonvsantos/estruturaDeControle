const idadeInput = document.getElementById('idade');
const verifyButton = document.getElementById('verifyButton');
const result = document.getElementById('resultado');

function verificarIdade(){
    result.classList.remove('visivel');
    const idade = parseInt(idadeInput.value);
    let mensagem = '';

    if(isNaN(idade) || idade < 0){
    mensagem = "Por favor, insira uma idade válida.";
    } else if(idade < 18){
    mensagem = "Você é menor de idade.";
    } else if(idade <= 65){
    mensagem = "Você é adulto.";
    } else {
    mensagem = "Você é idoso.";
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
canvas.height = window.innerHeight;

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

class Particula {
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
    ctx.fillStyle = this.cor;
    ctx.fill();
    }

    atualizar(){
    if(this.x > canvas.width || this.x < 0){
        this.direcaoX = -this.direcaoX;
    }
    if(this.y > canvas.height || this.y < 0){
        this.direcaoY = -this.direcaoY;
    }
    this.x += this.direcaoX;
    this.y += this.direcaoY;
    this.desenhar();
    }
}

function init(){
    particulasArray = [];
    for(let i = 0; i < numeroDeParticulas; i++){
    let tamanho = Math.random() * 2 + 1;
    let x = Math.random() * (innerWidth - tamanho * 2) + tamanho;
    let y = Math.random() * (innerHeight - tamanho * 2) + tamanho;
    let direcaoX = (Math.random() * 0.4) - 0.2;
    let direcaoY = (Math.random() * 0.4) - 0.2;
    let cor = '#000000';
    particulasArray.push(new Particula(x, y, direcaoX, direcaoY, tamanho, cor));
    }
}

function conectar(){
    for(let a = 0; a < particulasArray.length; a++){
    for(let b = a; b < particulasArray.length; b++){
        let dx = particulasArray[a].x - particulasArray[b].x;
        let dy = particulasArray[a].y - particulasArray[b].y;
        let distancia = dx * dx + dy * dy;

        if(distancia < (canvas.width / 7) * (canvas.height / 7)){
        ctx.strokeStyle = `rgba(0,0,0,${1 - (distancia / 20000)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particulasArray[a].x, particulasArray[a].y);
        ctx.lineTo(particulasArray[b].x, particulasArray[b].y);
        ctx.stroke();
        }
    }
    }
}

function animar(){
    requestAnimationFrame(animar);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < particulasArray.length; i++){
    particulasArray[i].atualizar();
    }
    conectar();
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

init();
animar();