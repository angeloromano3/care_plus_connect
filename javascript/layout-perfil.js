document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.menu-lateral');

    if(!sidebar) return;

    // 1. Injeta o HTML do menu normalmente
    sidebar.innerHTML = `
        <a href="./perfil.html" class="menu-item">
            <i class="bi bi-person"></i>
            <div class="menu-txt">
                <strong>Meu perfil</strong>
                <span>Gerencie suas informações</span>
            </div>
        </a>

        <a href="./seguranca.html" class="menu-item">
            <i class="bi bi-shield-shaded"></i>
            <div class="menu-txt">
                <strong>Segurança</strong>
                <span>Senha e autenticação</span>
            </div>
        </a>

        <a href="./preferencias.html" class="menu-item">
            <i class="bi bi-gear"></i>
            <div class="menu-txt">
                <strong>Preferências</strong>
                <span>Idioma e aparência</span>
            </div>
        </a>

        <a href="./notificacoes.html" class="menu-item">
            <i class="bi bi-bell"></i>
            <div class="menu-txt">
                <strong>Notificações</strong>
                <span>Alertas e lembretes</span>
            </div>
        </a>
    `;

    // 2. Lógica para identificar a página ativa e adicionar a classe 'ativo'
    const links = sidebar.querySelectorAll('.menu-item');
    const paginaAtual = window.location.pathname;

    links.forEach(link => {
        // Pega o valor do href (ex: './seguranca.html') e limpa o './' para facilitar a busca
        const linkHref = link.getAttribute('href').replace('./', '');

        // Verifica se a URL atual termina com o nome do arquivo do link
        if (paginaAtual.endsWith(linkHref)) {
            link.classList.add('ativo');
        }
    });
});