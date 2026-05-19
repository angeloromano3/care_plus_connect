// ============================================
// CAREPLUS CONNECT — login.js
// Funções da tela de login
// ============================================

// ── MOSTRAR / OCULTAR SENHA ──
// Alterna o campo de senha entre texto visível e oculto
// e troca o ícone do olho
document.getElementById('botao-olho').addEventListener('click', function () {
  const campoSenha = document.getElementById('senha');
  const iconeOlho  = document.getElementById('icone-olho');

if (campoSenha.type === 'password') {
  // Mostra a senha
  campoSenha.type = 'text';
  iconeOlho.classList.remove('bi-eye');
  iconeOlho.classList.add('bi-eye-slash');
} else {
  // Oculta a senha
  campoSenha.type = 'password';
  iconeOlho.classList.remove('bi-eye-slash');
  iconeOlho.classList.add('bi-eye');
}
});

// ── VALIDAÇÃO E ENVIO DO LOGIN ──
// Verifica se e-mail e senha foram preenchidos antes de enviar
document.getElementById('botao-entrar').addEventListener('click', function () {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  if (!email || !senha) {
    alert('Preencha e-mail e senha para continuar.');
    return;
  }

  // Aqui futuramente será feita a chamada à API de autenticação ou fazer direto no Backend
  alert('Login realizado com sucesso! ✓');
  window.location.href = 'pages/dashboard.html';
});
