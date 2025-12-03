const canvas = document.getElementById("canvas-desenho"); // declaração do canvas 
const borracha = document.getElementById("borracha"); // declaração da borracha
const pincel = document.getElementById("pincel"); // declaração do pincel
const limpaTela = document.getElementById("limpar"); // declaração do botão de limpar tela 
const salvaDesenho = document.getElementById("salvar"); // declaração do botão de salvar 
const tamanhoPincelBorracha = document.getElementById("tamanho-pincel-borracha"); // declaração do tamanho do pincel
const valorTamanho = document.getElementById("valor-tamanho"); // declaração do tamanho do range
const preto = document.getElementById("preto"); // declaração da cor preta 
const vermelho = document.getElementById("vermelho"); // declaração cor vermelha
const azul = document.getElementById("azul"); // declaração cor azul
const verde = document.getElementById("verde"); // declaração cor verde
const amarelo = document.getElementById("amarelo"); // declaração cor amaraela
const escolheCor = document.getElementById("seletorCor");
const ctx = canvas.getContext("2d"); // declaração do ctx do canvas
const preenche = document.getElementById("preencher");

canvas.width = 910;   // TAMANHO DO QUADRO DEFINIDO PELA JS - NÃO BUGAR COM CSS
canvas.height = 486;  // TAMANHO DO QUADRO DEFINIDO PELA JS - NÃO BUGAR COM CSS

let taDesenhando = false; //

function desenhar(e) { // "e" serve para fazer anotação de eventos no javascript - passar uma funcao que vai receber um evento.
    if (!taDesenhando) return; // EXCLAMAÇÃO É NEGAÇÃO - nesse exemplo se não estiver desenhando.

    ctx.lineCap = 'round';  // arredondado 
    ctx.lineTo(e.offsetX, e.offsetY);   // mouse acompanhar 
    ctx.stroke(); // linha visivel 
}

function comecaDesenho(e) {
    taDesenhando = true;     // para iniciar o desenho ao clicar com o evento de clique 
    desenhar(e);
}

function pararDesenho(e) {
    taDesenhando = false;  // para entender que parou de desenhar no evento de clique desenho ao clicar com o evento de clique
    ctx.beginPath();
}

canvas.addEventListener('mousedown', comecaDesenho);
canvas.addEventListener('mousemove', desenhar);
canvas.addEventListener('mouseout', pararDesenho);   // são eventos de movimentos do mouse 
canvas.addEventListener('mouseup', pararDesenho);

/* CONFIGURANDO A GROSSURA */
// let tamanhoInicial = tamanhoPincelBorracha.value;

// ctx.lineWidth = tamanhoInicial;

valorTamanho.innerHTML = tamanhoPincelBorracha.value;
tamanhoPincelBorracha.oninput = () => {
    valorTamanho.innerHTML = tamanhoPincelBorracha.value;
    ctx.lineWidth = tamanhoPincelBorracha.value;
}

/* CONFIGURANDO A FUNÇÃO P LIMPAR A TELA */

function limparTela() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
limpaTela.addEventListener('click', limparTela);

/* CONFIGURAR O BOTAO DO SAVE DE IMAGEM */
function salvarDesenho() {
    const desenho = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.download = "desenho.png";
    link.href = desenho;
    alert("Tu baixou o desenho pai :3 ");
    link.click();
    document.body.removeChild(link);
}
salvaDesenho.addEventListener('click', salvarDesenho);

/* CONFIGURANDO O SELETOR DE CORES */
var corEscolhida;

function trocaCor(e) {
    corEscolhida = escolheCor.value;
    ctx.strokeStyle = corEscolhida;
}
escolheCor.addEventListener('change', trocaCor);


/* ABAIXO, FUNCAO PARA BORRACHA */
var corPincel;
corPincel = ctx.strokeStyle;

function borracharr(e) {
    ctx.strokeStyle = "white";
    console.log("foi clicado");
    borracha.classList.add('ferramenta-ativa');
    pincel.classList.remove('ferramenta-ativa');
    canvas.style.cursor = 'url("/borracha.png"), auto';
}

borracha.addEventListener('click', borracharr);


// FUNCAO PARA SELECIONAR O PINCEL E DEFINIR PARA DETERMINAR A COR DO PINCEL, PUXANDO A corPincel
function pincerr(e) {
    ctx.strokeStyle = corPincel;
    pincel.classList.add('ferramenta-ativa'); // CSS
    borracha.classList.remove('ferramenta-ativa');
    canvas.style.cursor = 'url("/pincel.png"), auto'; // cursor definido 
}

pincel.addEventListener('click', pincerr);


function black(e) {
    ctx.strokeStyle = "black";
    corPincel = ctx.strokeStyle;
    console.log("foi clicado"); preto.classList.add('cor-selecionada');
    vermelho.classList.remove('cor-selecionada');
    azul.classList.remove('cor-selecionada');
    verde.classList.remove('cor-selecionada');
    amarelo.classList.remove('cor-selecionada');
    corEscolhida = ctx.strokeStyle;
    pincel.classList.add('ferramenta-ativa');
    borracha.classList.remove('ferramenta-ativa');
    canvas.style.cursor = 'url("/pincel.png"), auto';

}

//ABAIXO FUNÇÃO PARA SELECIONAR 

function red(e) {
    ctx.strokeStyle = "red";
    corPincel = ctx.strokeStyle;  // COMANDO PARA DEFINIR COR DO PINCEL COMO COR ATUAL, PARA EVITAR QUE A BORRACHA POR EXEMPLO, SAIA COLORIDA
    console.log("foi clicado"); 
    preto.classList.remove('cor-selecionada');
    vermelho.classList.add('cor-selecionada');
    azul.classList.remove('cor-selecionada');   // REMOVE E ADS SERVEM PRA MANTER OU REMOVER AS BORDAS DE SELEÇÃO
    verde.classList.remove('cor-selecionada');
    amarelo.classList.remove('cor-selecionada');
    corEscolhida = ctx.strokeStyle;   // para escolher uma cor pelo seletor, barra de cores 
    pincel.classList.add('ferramenta-ativa');  // para deixar como ferramenta ativa caso eu clique na cor, p quando selecionar a cor, ir diretamente pro pincel e nao pra borracha (rever)
    borracha.classList.remove('ferramenta-ativa'); // DESATIVA A BORRACHA ao ativar outra ferramenta
    canvas.style.cursor = 'url("/pincel.png"), auto';
}

function blue(e) {
    ctx.strokeStyle = "blue";
    corPincel = ctx.strokeStyle;
    console.log("foi clicado");
    preto.classList.remove('cor-selecionada');
    vermelho.classList.remove('cor-selecionada');
    azul.classList.add('cor-selecionada');
    verde.classList.remove('cor-selecionada');
    amarelo.classList.remove('cor-selecionada');
    corEscolhida = ctx.strokeStyle;
    pincel.classList.add('ferramenta-ativa');
    borracha.classList.remove('ferramenta-ativa');
    canvas.style.cursor = 'url("/pincel.png"), auto';

}

function green(e) {
    ctx.strokeStyle = "green";
    corPincel = ctx.strokeStyle;
    console.log("foi clicado");
    preto.classList.remove('cor-selecionada');
    vermelho.classList.remove('cor-selecionada');
    azul.classList.remove('cor-selecionada');
    verde.classList.add('cor-selecionada');
    amarelo.classList.remove('cor-selecionada');
    corEscolhida = ctx.strokeStyle;
    pincel.classList.add('ferramenta-ativa');
    borracha.classList.remove('ferramenta-ativa');
    canvas.style.cursor = 'url("/pincel.png"), auto';

}

function yellow(e) {
    ctx.strokeStyle = "yellow";
    corPincel = ctx.strokeStyle;
    console.log("foi clicado");
    preto.classList.remove('cor-selecionada');
    vermelho.classList.remove('cor-selecionada');
    azul.classList.remove('cor-selecionada');
    verde.classList.remove('cor-selecionada');
    amarelo.classList.add('cor-selecionada');
    corEscolhida = ctx.strokeStyle;
    pincel.classList.add('ferramenta-ativa');
    borracha.classList.remove('ferramenta-ativa');
    canvas.style.cursor = 'url("/pincel.png"), auto';
}

preto.addEventListener('click', black);
vermelho.addEventListener('click', red);
azul.addEventListener('click', blue);
verde.addEventListener('click', green);
amarelo.addEventListener('click', yellow);

/* CONFIGURANDO BOTAO DE PREENCHER */

function preencheTela(e) {
    ctx.fillStyle = corEscolhida;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

preenche.addEventListener('click', preencheTela);