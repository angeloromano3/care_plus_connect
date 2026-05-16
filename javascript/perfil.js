document.addEventListener("DOMContentLoaded", () => {
    // Botão de salvar dentro do modal
    const btnSalvar = document.querySelector(".btn-salvar-modal");
    
    // Inputs do Modal
    const inputNome = document.getElementById("inputNome");
    const inputEmail = document.getElementById("inputEmail");
    const inputTelefone = document.getElementById("inputTelefone");
    const inputDataNasc = document.getElementById("inputDataNasc");

    // Elementos de texto do Card Principal
    const perfilNome = document.getElementById("perfilNome");
    const perfilEmail = document.getElementById("perfilEmail");
    const perfilTelefone = document.getElementById("perfilTelefone");
    
    // Elementos de texto da tabela inferior (Informações Pessoais)
    const listaInfos = document.querySelectorAll(".lista-infos .item-info strong");

    btnSalvar.addEventListener("click", () => {
        
        // Atualiza o Card Principal do topo
        if (perfilNome) perfilNome.textContent = inputNome.value;
        if (perfilEmail) perfilEmail.innerHTML = `<i class="bi bi-envelope"></i> ${inputEmail.value}`;
        if (perfilTelefone) perfilTelefone.innerHTML = `<i class="bi bi-telephone"></i> ${inputTelefone.value}`;

        // Atualiza a lista detalhada de Informações pessoais
        if (listaInfos.length >= 5) {
            listaInfos[0].textContent = inputNome.value;       // Nome Completo
            listaInfos[1].textContent = inputDataNasc.value;   // Data de Nascimento
            listaInfos[3].textContent = inputTelefone.value;   // Telefone
            listaInfos[4].textContent = inputEmail.value;      // E-mail
        }

        // Fecha o modal programaticamente usando o Bootstrap
        const modalElement = document.getElementById("modalEditarPerfil");
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
            modalInstance.hide();
        }
        
        alert("Perfil atualizado com sucesso!");
    });

    // LÓGICA DE REDIRECIONAMENTO COM FILTRO 
    const cardRealizadas = document.getElementById("card-redireciona-realizadas");
    const cardAgendadas = document.getElementById("card-redireciona-agendadas");

    if (cardRealizadas) {
        cardRealizadas.addEventListener("click", () => {
            window.location.href = "historico.html?status=Realizada";
        });
    }

    if (cardAgendadas) {
        cardAgendadas.addEventListener("click", () => {
            window.location.href = "historico.html?status=Agendada";
        });
    }
});