// ============================================
// CAREPLUS CONNECT — navbar.js
// Criação e lógica compartilhada da navbar (CORRIGIDO)
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');

    // Se a página atual não tiver o container da navbar, interrompe a execução
    if (!navbarPlaceholder) return;

    // 1. Injeta o HTML da Barra de Navegação (ESTRUTURA CORRETA COM DROP-CONTAINERS)
    navbarPlaceholder.innerHTML = `
    <nav class="barra-navegacao">
        <div class="navbar-conteudo">

            <a href="../index.html" class="logo">
                <span class="care">Care</span><span class="plus">Plus</span> <span class="connect">Connect</span>
            </a>

            <ul class="links-navegacao">
                <li><a href="dashboard.html" id="nav-inicio">Início</a></li>
                <li><a href="#" id="nav-consultas">Consultas</a></li>
                <li><a href="historico.html" id="nav-historico">Histórico</a></li>
                <li><a href="chatbot.html" id="nav-assistente">Assistente Virtual</a></li>
            </ul>

            <div class="acoes-navbar">

                <div class="dropdown-container">
                    <button class="botao-notificacao" id="btn-notificacao" aria-label="Notificações">
                        <i class="bi bi-bell"></i>
                        <span class="ponto-notificacao"></span>
                    </button>
                    <div class="dropdown-menu menu-notificacoes" id="menu-notificacoes">
                        <div class="dropdown-header header-notificacoes">
                            <strong>Notificações</strong>
                            <span class="marcar-lidas">Marcar todas como lidas</span>
                        </div>
                        <hr>
                        <div class="lista-notificacoes">
                            <a href="#" class="item-notificacao nao-lida">
                                <div class="indicador-nao-lida"></div>
                                <div class="conteudo-notificacao">
                                    <strong>Consulta Confirmada</strong>
                                    <p>Sua consulta com Dr. Ana Silva foi confirmada.</p>
                                    <span class="tempo">Há 10 min</span>
                                </div>
                            </a>
                            <a href="#" class="item-notificacao nao-lida">
                                <div class="indicador-nao-lida"></div>
                                <div class="conteudo-notificacao">
                                    <strong>Lembrete de Saúde</strong>
                                    <p>Não se esqueça de beber água hoje!</p>
                                    <span class="tempo">Há 1 hora</span>
                                </div>
                            </a>
                        </div>
                        <hr>
                        <a href="#" class="dropdown-item ver-todas">Ver todas as notificações</a>
                    </div>
                </div>

                <div class="dropdown-container">
                    <button class="botao-hamburguer" id="btn-hamburguer" aria-label="Menu principal">
                        <i class="bi bi-list"></i>
                    </button>
                    <div class="dropdown-menu" id="menu-hamburguer">
                        <div class="dropdown-header">
                            <strong>Olá, Usuário</strong>
                            <span style="font-size: 13px; color: #777;">usuario@careplus.com</span>
                        </div>
                        <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 6px 0;">
                        
                        <a href="dashboard.html" class="dropdown-item"><i class="bi bi-house"></i> Início</a>
                        <a href="#" class="dropdown-item"><i class="bi bi-calendar-event"></i> Consultas</a>
                        <a href="historico.html" class="dropdown-item"><i class="bi bi-clock-history"></i> Histórico</a>
                        <a href="chatbot.html" class="dropdown-item"><i class="bi bi-robot"></i> Assistente Virtual</a>
                        
                        <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 6px 0;">
                        <a href="#" class="dropdown-item"><i class="bi bi-person-badge"></i> Meu Perfil</a>
                        <a href="#" class="dropdown-item"><i class="bi bi-gear"></i> Configurações</a>
                        
                        <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 6px 0;">
                        <a href="../index.html" class="dropdown-item sair" style="color: #d9534f;"><i class="bi bi-box-arrow-right"></i> Sair</a>
                    </div>
                </div>

            </div>
        </div>
    </nav>
    `;

    // 2. Lógica Inteligente para Identificar a Página Ativa (Mantida)
    const paginaAtual = window.location.pathname;

    if (paginaAtual.includes('dashboard.html')) {
        document.getElementById('nav-inicio')?.classList.add('ativo');
    } else if (paginaAtual.includes('historico.html')) {
        document.getElementById('nav-historico')?.classList.add('ativo');
    } else if (paginaAtual.includes('chatbot.html')) {
        document.getElementById('nav-assistente')?.classList.add('ativo');
    }

    // 3. Lógica de Interatividade (Dropdowns e Cliques) - CORRIGIDA E SIMPLIFICADA
    const btnHamburguer = document.getElementById('btn-hamburguer'); // ID CORRIGIDO
    const menuHamburguer = document.getElementById('menu-hamburguer');
    const btnNotificacao = document.getElementById('btn-notificacao');
    const menuNotificacoes = document.getElementById('menu-notificacoes');

    // Função única para alternar menus (evita redundância)
    function toggleMenu(menuToToggle, menuToClose) {
        if (menuToToggle) {
            menuToToggle.classList.toggle('mostrar');
        }
        if (menuToClose && menuToClose.classList.contains('mostrar')) {
            menuToClose.classList.remove('mostrar');
        }
    }

    // Abre/Fecha Menu Hambúrguer
    if (btnHamburguer && menuHamburguer) {
        btnHamburguer.addEventListener('click', (evento) => {
            evento.stopPropagation();
            toggleMenu(menuHamburguer, menuNotificacoes);
        });
    }

    // Abre/Fecha Notificações
    if (btnNotificacao && menuNotificacoes) {
        btnNotificacao.addEventListener('click', (evento) => {
            evento.stopPropagation();
            toggleMenu(menuNotificacoes, menuHamburguer);
        });
    }

    // Fecha menus ao clicar fora deles
    document.addEventListener('click', (evento) => {
        // Fecha Hambúrguer se clicar fora
        if (menuHamburguer && menuHamburguer.classList.contains('mostrar')) {
            // Se o clique NÃO foi dentro do menu E NÃO foi no botão que abre o menu
            if (!menuHamburguer.contains(evento.target) && !btnHamburguer.contains(evento.target)) {
                menuHamburguer.classList.remove('mostrar');
            }
        }
        
        // Fecha Notificações se clicar fora
        if (menuNotificacoes && menuNotificacoes.classList.contains('mostrar')) {
            if (!menuNotificacoes.contains(evento.target) && !btnNotificacao.contains(evento.target)) {
                menuNotificacoes.classList.remove('mostrar');
            }
        }
    });
});