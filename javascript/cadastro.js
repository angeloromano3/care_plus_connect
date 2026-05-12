document.addEventListener('DOMContentLoaded', () => {

    // 1. Lógica dos Menus Dropdown (Navbar)

    const btnHamburguer = document.getElementById('btn-hamburguer');
    const menuHamburguer = document.getElementById('menu-hamburguer');

    const btnNotificacao = document.getElementById('btn-notificacao');
    const menuNotificacoes = document.getElementById('menu-notificacoes');

    // Abre/fecha o menu hambúrguer e esconde as notificações
    if (btnHamburguer && menuHamburguer) {
        btnHamburguer.addEventListener('click', (evento) => {
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

    // Fecha qualquer menu aberto ao clicar na tela
    document.addEventListener('click', (evento) => {
        if (menuHamburguer && !menuHamburguer.contains(evento.target) && !btnHamburguer.contains(evento.target)) {
            menuHamburguer.classList.remove('mostrar');
        }
        if (menuNotificacoes && !menuNotificacoes.contains(evento.target) && !btnNotificacao.contains(evento.target)) {
            menuNotificacoes.classList.remove('mostrar');
        }
    });

    // 2. Lógica do Formulário e CEP
    const cepInput = document.getElementById('cep');
    const form = document.getElementById('formCadastro');
    const btnCancelar = document.getElementById('btnCancelar');
    const requiredFields = document.querySelectorAll('.required');

    // Busca de Endereço via API do ViaCEP
    if (cepInput) {
        cepInput.addEventListener('blur', async (e) => {
            const cepValue = e.target.value.replace(/\D/g, '');

            if (cepValue.length === 8) {
                try {
                    const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
                    const data = await response.json();

                    if (!data.erro) {
                        document.getElementById('logradouro').value = data.logradouro;
                        document.getElementById('bairro').value = data.bairro;
                        document.getElementById('cidade').value = data.localidade;
                        document.getElementById('estado').value = data.uf;

                        // Remove classe de erro se existir
                        ['logradouro', 'bairro', 'cidade', 'estado'].forEach(id => {
                            const field = document.getElementById(id);
                            if (field) field.classList.remove('error');
                        });

                        document.getElementById('numero').focus();
                    } else {
                        alert('CEP não encontrado!');
                    }
                } catch (error) {
                    console.error("Erro ao buscar CEP:", error);
                }
            }
        });
    }

    // Remoção da borda vermelha ao digitar
    requiredFields.forEach(field => {
        ['input', 'change'].forEach(evt => {
            field.addEventListener(evt, () => {
                if (field.value.trim() !== '') {
                    field.classList.remove('error');
                }
            });
        });
    });

    // Validação de Envio
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let formValido = true;

            requiredFields.forEach(field => {
                if (field.value.trim() === '') {
                    field.classList.add('error');
                    formValido = false;
                } else {
                    field.classList.remove('error');
                }
            });

            if (formValido) {
                alert('Cadastro realizado com sucesso!');
                form.reset();
            } else {
                alert('Por favor, preencha todos os campos obrigatórios em vermelho.');
            }
        });
    }

    // Limpeza de formulário no botão cancelar
    if (btnCancelar) {
        btnCancelar.addEventListener('click', () => {
            if (confirm('Tem certeza que deseja cancelar? Todos os dados serão perdidos.')) {
                form.reset();
                requiredFields.forEach(field => field.classList.remove('error'));
            }
        });
    }
});