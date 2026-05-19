// ============================================
// CAREPLUS CONNECT — consultas.js
// Lógica da página de gerenciamento de consultas
// ============================================

// ── PAINEL INTERATIVO ──
// Alterna entre os formulários de agendar / remarcar / cancelar
// e controla o estado visual (ativo) dos cards de ação.
function alternarAbasConsultas(acaoDesejada) {
  const painelPai   = document.getElementById('painel-interativo-consultas');
  const formAgendar = document.getElementById('form-consulta-agendar');
  const formRemarcar = document.getElementById('form-consulta-remarcar');
  const formCancelar = document.getElementById('form-consulta-cancelar');

  const cardAgendar = document.getElementById('btn-acao-agendar');
  const cardRemarcar = document.getElementById('btn-acao-remarcar');
  const cardCancelar = document.getElementById('btn-acao-cancelar');

  const mapa = {
    'agendar':  { form: formAgendar,  card: cardAgendar  },
    'remarcar': { form: formRemarcar, card: cardRemarcar },
    'cancelar': { form: formCancelar, card: cardCancelar }
  };

  const alvo = mapa[acaoDesejada];
  if (!alvo) return;

  // Se clicou no card já ativo → fecha o painel (toggle)
  if (alvo.card.classList.contains('ativo')) {
    alvo.card.classList.remove('ativo');
    alvo.form.classList.add('d-none');
    painelPai.style.display = 'none';
    return;
  }

  // Reseta todos os cards e formulários
  [cardAgendar, cardRemarcar, cardCancelar].forEach(c => c.classList.remove('ativo'));
  [formAgendar, formRemarcar, formCancelar].forEach(f => f.classList.add('d-none'));

  // Ativa o card e formulário selecionados
  alvo.card.classList.add('ativo');
  alvo.form.classList.remove('d-none');
  painelPai.style.display = 'block';

  // Rola suavemente até o painel
  setTimeout(() => {
    painelPai.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 50);
}

// ── FEEDBACK DE FORMULÁRIO ──
// Exibe um toast de confirmação após o envio de cada formulário.
function enviarFormulario(tipo) {
  const mensagens = {
    'agendar':  'Solicitação de agendamento enviada com sucesso! ✔',
    'remarcar': 'Sua consulta foi remarcada com sucesso! ✔',
    'cancelar': 'Cancelamento efetuado. Verifique seu e-mail corporativo. ✔'
  };

  exibirToast(mensagens[tipo] || 'Operação realizada com sucesso!');

  // Fecha o painel após o envio
  const cardAtivo = document.querySelector('.card-acao.ativo');
  if (cardAtivo) {
    const acaoAtiva = cardAtivo.id.replace('btn-acao-', '');
    setTimeout(() => alternarAbasConsultas(acaoAtiva), 400);
  }
}

// ── TOAST DE NOTIFICAÇÃO ──
// Aparece na parte inferior da tela por 3 segundos
function exibirToast(mensagem) {
  const toast = document.getElementById('toast-confirmacao');
  const textoToast = document.getElementById('toast-mensagem');
  if (!toast || !textoToast) return;

  textoToast.textContent = mensagem;
  toast.classList.add('visivel');

  setTimeout(() => toast.classList.remove('visivel'), 3500);
}

// ── INICIALIZAÇÃO (DOM pronto) ──
document.addEventListener('DOMContentLoaded', () => {

  // ── AÇÃO VINDA DO DASHBOARD ──
  // Se o usuário clicou em um card de ação no dashboard,
  // a ação fica salva no sessionStorage. Aqui lemos e abrimos o painel correto.
  const acaoPendente = sessionStorage.getItem('consultas_acao_pendente');
  if (acaoPendente) {
    sessionStorage.removeItem('consultas_acao_pendente'); // Consome o valor (single-use)
    alternarAbasConsultas(acaoPendente);
  }

  // ── CARDS ROTATIVOS ──
  let slideAtual = 0;
  const totalSlides = 5;

  function irParaSlide(indice) {
    document.getElementById('slide-' + slideAtual).classList.remove('ativo');
    document.querySelectorAll('.ponto-navegacao')[slideAtual].classList.remove('ativo');
    slideAtual = indice;
    document.getElementById('slide-' + slideAtual).classList.add('ativo');
    document.querySelectorAll('.ponto-navegacao')[slideAtual].classList.add('ativo');
  }

  function proximoSlide() {
    irParaSlide((slideAtual + 1) % totalSlides);
  }

  let rotacaoAutomatica = setInterval(proximoSlide, 4000);

  document.querySelectorAll('.ponto-navegacao').forEach((ponto, indice) => {
    ponto.addEventListener('click', () => {
      clearInterval(rotacaoAutomatica);
      irParaSlide(indice);
      rotacaoAutomatica = setInterval(proximoSlide, 4000);
    });
  });

  // ── MODAL DE RECOMPENSAS ──
  const modalRecompensas = document.getElementById('modal-recompensas');
  const btnFecharModal   = document.getElementById('btn-fechar-modal');

  if (btnFecharModal) {
    btnFecharModal.addEventListener('click', () => {
      modalRecompensas.classList.remove('ativo');
      document.body.style.overflow = '';
    });
  }

  // Fecha ao clicar no overlay escurecido
  if (modalRecompensas) {
    modalRecompensas.addEventListener('click', (e) => {
      if (e.target === modalRecompensas) {
        modalRecompensas.classList.remove('ativo');
        document.body.style.overflow = '';
      }
    });
  }

  // Fecha o modal com a tecla Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalRecompensas?.classList.contains('ativo')) {
      modalRecompensas.classList.remove('ativo');
      document.body.style.overflow = '';
    }
  });

});