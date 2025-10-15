// Funções do jogo:
// exibirTextoNaTela() – Atualiza textos no HTML
// exibirMensagemInicial() – Mostra o título e a mensagem de início
// verificarChute() – Compara o chute com o número secreto e dá feedback
// gerarNumeroAleatorio() – Gera um número aleatório sem repetir
// limparCampo() – Limpa o campo de entrada
// reiniciarJogo() – Reinicia o jogo e desativa o botão "Tentar de novo"

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    // Altera o conteúdo de uma tag (ex: h1, p)
    let campo = document.querySelector(tag);    
    campo.innerHTML = texto;
}

function exibirMensagemInicial() {
    // Mostra a mensagem inicial do jogo
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    // Pega o valor digitado no input
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        // Acertou o número
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); // Ativa botão de reinício
    } else {
        // Dica: número maior ou menor
        let mensagem = chute > numeroSecreto ? 'O número secreto é menor' : 'O número secreto é maior';
        exibirTextoNaTela('p', mensagem);
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    // Gera número entre 1 e o limite (sem repetir)
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let totalSorteados = listaDeNumerosSorteados.length;

    if (totalSorteados == numeroLimite) {
        // Se todos os números já foram sorteados, reinicia a lista
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        // Se número já foi sorteado, tenta novamente
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    // Limpa o campo de entrada
    let chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    // Recomeça o jogo com novo número
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); // Desativa botão de reinício
}
