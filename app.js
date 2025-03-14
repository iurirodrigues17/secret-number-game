// Array para armazenar os números já sorteados, evitando repetições
let listaDeNumerosSorteados = []; 

// Define o limite para o número secreto
let numeroLimite = 20; 

// Gera o primeiro número secreto aleatório
let numeroSecreto = gerarNumeroAleatorio(); 

// Contador de tentativas do jogador
let tentativas = 1; 

/**
 * Exibe um texto na tela dentro do elemento HTML.
 * Também usa a API responsiveVoice para leitura do texto em voz.
 * @param {string} tag - Seletor do elemento HTML onde o texto será exibido.
 * @param {string} texto - Texto a ser exibido.
 */
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

//Exibe a mensagem inicial do jogo.
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 100');
}

// Inicializa o jogo exibindo a mensagem inicial
exibirMensagemInicial();

//Verifica se o chute do jogador está correto e exibe a mensagem para o jogador.
function verificarChute() {
    let chute = document.querySelector('input').value;

    // Se o chute for igual ao número secreto, o jogador venceu
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);

        // Habilita o botão de reiniciar jogo
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        // Dá uma dica ao jogador se o número secreto for maior ou menor
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }

        // Incrementa o número de tentativas e limpa o campo de entrada
        tentativas++;
        limparCampo();
    }
}

/**
 * Gera um número aleatório entre 1 e o número máximo, evitando repetições.
 * @returns {number} - Número aleatório único dentro do intervalo definido.
 */
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    // Se todos os números já foram sorteados, reinicia a lista
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    // Se o número já foi sorteado, gera outro número recursivamente
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        // Adiciona o número na lista e retorna
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

//Limpa o campo de entrada do número informado pelo usuário anteriormente.
function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}

// Reinicia o jogo, gerando um novo número secreto e resetando as tentativas.
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    
    // Desabilita o botão de reiniciar até que o usuário acerte novamente.
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
