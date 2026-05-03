// ============================================
// CAREPLUS CONNECT — dashboard.js
// Funções da tela principal (dashboard)
// ============================================

// ── CARDS ROTATIVOS ──
// Controla qual slide está visível e a rotação automática

let slideAtual = 0;          // Índice do slide visível no momento
const totalSlides = 4;       // Total de slides existentes

// Vai para um slide específico pelo índice
function irParaSlide(indice) {
  // Remove a classe "ativo" do slide e ponto atual
  document.getElementById('slide-' + slideAtual).classList.remove('ativo');
  document.querySelectorAll('.ponto-navegacao')[slideAtual].classList.remove('ativo');

  // Atualiza o índice atual
  slideAtual = indice;

  // Adiciona a classe "ativo" no novo slide e ponto
  document.getElementById('slide-' + slideAtual).classList.add('ativo');
  document.querySelectorAll('.ponto-navegacao')[slideAtual].classList.add('ativo');
}

// Avança para o próximo slide (volta ao início quando chega no último)
function proximoSlide() {
  irParaSlide((slideAtual + 1) % totalSlides);
}

// Inicia a rotação automática a cada 4 segundos (4000 milissegundos)
let rotacaoAutomatica = setInterval(proximoSlide, 4000);

// Quando o usuário clica em um ponto de navegação:
// Para o timer automático, vai para o slide clicado e reinicia o timer
document.querySelectorAll('.ponto-navegacao').forEach(function (ponto, indice) {
  ponto.addEventListener('click', function () {
    clearInterval(rotacaoAutomatica);         // Para a rotação automática
    irParaSlide(indice);                      // Vai para o slide clicado
    rotacaoAutomatica = setInterval(proximoSlide, 4000); // Reinicia o timer
  });
});
