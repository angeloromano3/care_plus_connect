// ============================================
// CAREPLUS CONNECT — navbar.js
// Lógica compartilhada da barra de navegação
// Importar em todas as páginas que usam a navbar
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    const btnHamburguer = document.getElementById('btn-hamburguer');
    const btnHamburguerMobile = document.getElementById('btn-hamburguer-mobile');
    const menuHamburguer = document.getElementById('menu-hamburguer');
    const btnNotificacao  = document.getElementById('btn-notificacao');
    const menuNotificacoes = document.getElementById('menu-notificacoes');

    // Abre/fecha o menu hambúrguer e esconde as notificações
    if (btnHamburguer && menuHamburguer) {
        btnHamburguer.addEventListener('click', (evento) => {
            evento.stopPropagation();
            menuHamburguer.classList.toggle('mostrar');
            if (menuNotificacoes) menuNotificacoes.classList.remove('mostrar');
        });
    }

    // Abre/fecha o menu hambúrguer mobile
    if (btnHamburguerMobile && menuHamburguer) {
    btnHamburguerMobile.addEventListener('click', (evento) => {
        evento.stopPropagation();
        menuHamburguer.classList.toggle('mostrar');
        if (menuNotificacoes) menuNotificacoes.classList.remove('mostrar');
    });
}

    // Abre/fecha o menu de notificações e esconde o hambúrguer
    if (btnNotificacao && menuNotificacoes) {
        btnNotificacao.addEventListener('click', (evento) => {
            evento.stopPropagation();
            menuNotificacoes.classList.toggle('mostrar');
            if (menuHamburguer) menuHamburguer.classList.remove('mostrar');
        });
    }

    // Fecha qualquer menu aberto ao clicar fora
    document.addEventListener('click', (evento) => {
        if (menuHamburguer &&
            (!btnHamburguer || !btnHamburguer.contains(evento.target)) &&
            (!btnHamburguerMobile || !btnHamburguerMobile.contains(evento.target)) &&
            !menuHamburguer.contains(evento.target)) {
            menuHamburguer.classList.remove('mostrar');
}
        if (menuNotificacoes && btnNotificacao &&
            !menuNotificacoes.contains(evento.target) &&
            !btnNotificacao.contains(evento.target)) {
            menuNotificacoes.classList.remove('mostrar');
        }
    });

});