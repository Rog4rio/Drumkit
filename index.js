'use strict'; // modo mais restrito, pegar alguns erros ou más práticas e mostrar como erro.

//Configurar um JSON como se recebesse ele de um banco de dados ou API.
const sons = {
    'A': 'boom.wav',
    'S': 'clap.wav',
    'D': 'hihat.wav',
    'F': 'kick.wav',
    'G': 'openhat.wav',
    'H': 'ride.wav',
    'J': 'snare.wav',
    'K': 'tink.wav',
    'L': 'tom.wav',
}



//Função para criar divs com o parâmetro "texto" que vai ficar dentro da div e esse texto vai orientar a descobrir o identificador da div.

const criarDiv = (texto) => {
    const div = document.createElement('div'); // Cria o elemento div.
    div.classList.add('key') // adicionar classe para a div no JS.
    div.textContent = texto; // Escrever conteúdo dentro da div.
    div.id = texto; // adicionar um id para a div.
    document.getElementById('container').appendChild(div); // Adicionar o elemento criado pelo JS dentro do HTML.
}

// Criar função para exibir os sons na tela.

const exibir = (sons) => {
    Object.keys(sons).forEach(criarDiv); // Esse objeto passa um array com todas as keys. // O forEach vai varrer todos os elementos desse array, que no caso são todas as letras, o forEach vai pegar cada um deles e criar uma div.
}

const tocarSom = (letra) => {
    const audio = new Audio(`./sounds/${sons[letra]}`) // Pegar os meus sons e pegar o som na posição da letra que foi clicada.
    audio.play(); // Dar um play no áudio.
}

const adicionarEfeito = (letra) => { // Pegar a div referente a letra.
    document.getElementById(letra).classList.add('active'); // Pegar o elemento através do id que foi passado pelo evento e pegou a lista das classes e adicionou uma active.
}

const removerEfeito = (letra) => { // Pegar a div referente a letra.
   const div = document.getElementById(letra); // Já tenho a div dentro da variável div. Que é a div referente a letra.
   const removeActive = () => {
    div.classList.remove('active');
   }
   div.addEventListener('transitionend', removeActive); // Quando o efeito de transição acabar, ai você vai e remove o efeito. Esperar a transação acabar para remover o Active.
}

const ativarDiv = (evento) => {
    let letra = '';
    if(evento.type === 'click') { // Se o evento type(tipo de evento) for click executa o target.id se não executa o evento.key.
        letra = evento.target.id; // Já sei onde cliquei, o alvo em qual cliquei.
    }else {
        letra = evento.key.toUpperCase(); 
    }

    // const letra = evento.type === 'click' ? evento.target.id : evento.key.toUpperCase(); // Forma ternária de declarar o if.

    const letraPermitida = sons.hasOwnProperty(letra); // Constante para saber se a letra é existente. Validação.
    if(letraPermitida) {
        adicionarEfeito(letra); // Para clicar ou apertar na tecla ele vai ativar a letra.
        tocarSom(letra); // Tocar o som referente a letra que eu cliquei.
        removerEfeito(letra); // Remover o efeito da letra.
    }
}


exibir(sons);

document.getElementById('container').addEventListener('click', ativarDiv);

window.addEventListener('keydown', ativarDiv); // Para clicar na letra e ativar o som tem que ser na janela.

