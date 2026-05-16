document.addEventListener('DOMContentLoaded', () => {

       // Banco de dados
    const consultasFake = [
        { id: 1, medico: "Dra. Bianca Benevucci", especialidade: "Cardiologia", crm: "SP-123456", data: "2026-05-15T15:00:00", clinica: "Hospital Sírio Libanês", endereco: "Bela Vista, SP", status: "Agendada" },
        { id: 2, medico: "Dr. Mauro Ribeiro", especialidade: "Pediatria", crm: "SP-654321", data: "2026-03-19T10:30:00", clinica: "Clínica Infantil Care", endereco: "Cerqueira César, SP", status: "Cancelada" },
        { id: 3, medico: "Dr. Carlos Eduardo", especialidade: "Ortopedia", crm: "SP-998877", data: "2026-04-10T14:00:00", clinica: "OrtoCare SP", endereco: "Vila Olímpia, SP", status: "Remarcada" },
        { id: 4, medico: "Dra. Ana Silva", especialidade: "Dermatologia", crm: "SP-112233", data: "2026-02-05T09:00:00", clinica: "Derma Plus", endereco: "Itaim Bibi, SP", status: "Agendada" },
        { id: 5, medico: "Dr. João Paulo", especialidade: "Oftalmologia", crm: "SP-554433", data: "2026-05-20T16:00:00", clinica: "Visão Total", endereco: "Consolação, SP", status: "Perdida" },
        { id: 6, medico: "Dr. Fernando Costa", especialidade: "Neurologia", crm: "SP-776655", data: "2026-01-10T11:00:00", clinica: "Neuro Centro", endereco: "Paulista, SP", status: "Realizada" }
    ];

    const listaConsultas = document.getElementById('lista-consultas');
    const botoesFiltro = document.querySelectorAll('.card-filtro');
    const modalConsulta = document.getElementById('modal-consulta');
    const containerGps = document.getElementById('container-gps'); // Pega a div dos botões GPS

    // Renderiza as consultas na tela
    function renderizarConsultas(filtroStatus = "Todas") {
        if (!listaConsultas) return;
        listaConsultas.innerHTML = "";

        let consultasFiltradas = consultasFake;
        if (filtroStatus !== "Todas") {
            consultasFiltradas = consultasFake.filter(c => c.status === filtroStatus);
        }

        consultasFiltradas.forEach(consulta => {
            const dataObj = new Date(consulta.data);

            const dataExtenso = dataObj.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
            const hora = dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

            const div = document.createElement('div');
            div.className = 'item-consulta';

            // o ícone do boneco em vez das iniciais
            div.innerHTML = `
                <div class="item-esquerda">
                    <div class="avatar-medico"><i class="bi bi-person-fill"></i></div>
                    <div class="info-medico">
                        <strong class="nome-medico">${consulta.medico}</strong>
                        <span class="especialidade">${consulta.especialidade}</span>
                        <div class="data-hora">
                            <span><i class="bi bi-calendar3"></i> ${dataExtenso}</span>
                            <span><i class="bi bi-clock"></i> ${hora}</span>
                        </div>
                    </div>
                </div>
                <div class="item-direita">
                    <span class="pilula-status status-${consulta.status.toLowerCase()}">${consulta.status}</span>
                </div>
            `;

            // Evento para abrir o modal
            div.addEventListener('click', () => abrirModalDetalhes(consulta, dataExtenso, hora));
            listaConsultas.appendChild(div);
        });

        atualizarContadores();
    }

    // Atualiza os números nos botões
    function atualizarContadores() {
        if (document.getElementById('count-todas')) {
            document.getElementById('count-todas').innerText = consultasFake.length;
            document.getElementById('count-agendada').innerText = consultasFake.filter(c => c.status === 'Agendada').length;
            document.getElementById('count-remarcada').innerText = consultasFake.filter(c => c.status === 'Remarcada').length;
            document.getElementById('count-cancelada').innerText = consultasFake.filter(c => c.status === 'Cancelada').length;
            document.getElementById('count-perdida').innerText = consultasFake.filter(c => c.status === 'Perdida').length;
            document.getElementById('count-realizada').innerText = consultasFake.filter(c => c.status === 'Realizada').length;
        }
    }
    

    // Modal
    function abrirModalDetalhes(consulta, data, hora) {
        document.getElementById('modal-medico').innerText = consulta.medico;
        document.getElementById('modal-especialidade-crm').innerText = `${consulta.especialidade} | CRM: ${consulta.crm}`;
        document.getElementById('modal-datahora').innerText = `${data} às ${hora}`;
        document.getElementById('modal-local').innerHTML = `<strong>${consulta.clinica}</strong><br><span style="font-size: 13px; color: #777;">${consulta.endereco}</span>`;

        const badgeStatus = document.getElementById('modal-status');
        badgeStatus.className = `pilula-status status-${consulta.status.toLowerCase()}`;
        badgeStatus.innerText = consulta.status;

        // Regra do GPS: Mostra só se for agendada
        if (consulta.status === 'Agendada') {
            containerGps.style.display = 'flex';
        } else {
            containerGps.style.display = 'none';
        }

        modalConsulta.classList.add('mostrar');
    }

    document.getElementById('btn-fechar-detalhes').addEventListener('click', () => {
        modalConsulta.classList.remove('mostrar');
    });

    modalConsulta.addEventListener('click', (e) => {
        if (e.target === modalConsulta) modalConsulta.classList.remove('mostrar');
    });

    // Lógica de clique nos Filtros
    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', () => {
            botoesFiltro.forEach(b => b.classList.remove('ativo'));
            botao.classList.add('ativo');
            renderizarConsultas(botao.getAttribute('data-status'));
        });
    });


    renderizarConsultas();
});