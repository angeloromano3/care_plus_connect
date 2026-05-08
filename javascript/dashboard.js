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
// ── MODAL DE RECOMPENSAS ──
// Abre o modal ao clicar em "Ver Recompensas"
// Fecha ao clicar no X ou fora do modal

const modalRecompensas = document.getElementById('modal-recompensas');
const btnAbrirModal    = document.querySelector('.botao-recompensas');
const btnFecharModal   = document.getElementById('btn-fechar-modal');

// Abre o modal
btnAbrirModal.addEventListener('click', function () {
  modalRecompensas.classList.add('ativo');
  document.body.style.overflow = 'hidden';
});

// Fecha ao clicar no X
btnFecharModal.addEventListener('click', function () {
  modalRecompensas.classList.remove('ativo');
  document.body.style.overflow = '';
});

// Fecha ao clicar fora do modal (no overlay escurecido)
modalRecompensas.addEventListener('click', function (e) {
  if (e.target === modalRecompensas) {
    modalRecompensas.classList.remove('ativo');
    document.body.style.overflow = '';
  }
});
// ── CONECTAR DISPOSITIVO DE CLIMA ──
// Remove o blur ao clicar no botão e muda o texto para "Conectado"
// estado começa como desconectado
let climaConectado = false;

document.getElementById('btn-conectar-clima').addEventListener('click', function () {
  climaConectado = !climaConectado; // alterna o estado
  
  if (climaConectado) {
    // Conectou
    document.querySelector('.card-clima').classList.remove('clima-bloqueado');
    this.innerHTML = '<i class="bi bi-check-circle"></i> Conectado';
  } else {
    // Desconectou
    document.querySelector('.card-clima').classList.add('clima-bloqueado');
    this.innerHTML = '<i class="bi bi-plug"></i> Conectar dispositivo';
  }
});

