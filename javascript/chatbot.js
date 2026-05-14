const perguntas = document.querySelectorAll('.perguntas-frequentes li');
const formulario = document.querySelector('.formulario-chat');
const input = document.querySelector('.barra-chat input');
const messagesContainer = document.querySelector('.messages-container');
const cardsContainer = document.querySelector('.cards-container');
const creativeContent = document.querySelector('.creative-content');

// Quando usuario clicar em pergunta frequente, preenche o input com o texto da pergunta frequente e foca
perguntas.forEach((pergunta) => {

    pergunta.addEventListener('click', () => {
        input.value = pergunta.textContent.trim();
        input.focus();
    });

});

// Respostas prontas para o chatbot, associando palavras-chave a respostas específicas
const respostas = [
    {
        palavras: ["consulta", "agendar"],
        resposta: "Você pode agendar/remarcar/cancelar consultas na aba Consultas."
    },

    {
        palavras: ["horário", "funcionamento"],
        resposta: "Funcionamos das 08h às 18h."
    },

    {
        palavras: ["suporte", "contato"],
        resposta: "Você pode entrar em contato pelo email suporte@careplus.com."
    },

    {
        palavras: ["especialidades"],
        resposta: "Temos cardiologia, ortopedia, dermatologia e muito mais."
    },
    {
        palavras: ["carepoints", "pontos", "care points"],
        resposta: "Cada ação positiva na plataforma te rende CarePoints, que podem ser trocados por descontos e benefícios exclusivos. Por exemplo: agendar uma consulta e comparecer dentro do horário ou em caso de imprevistos cancelar com antecedência. Acumule CarePoints e aproveite vantagens incríveis!"
    },
    {
        palavras: ["oi", "olá", "bom dia", "boa tarde", "boa noite"],
        resposta: "Olá! Como posso ajudar você hoje?"
    }

];

// função para encontrar uma resposta pronta com base na mensagem do usuário, verificando se ela contém alguma das palavras-chave definidas
function encontrarResposta(mensagem) {

    mensagem = mensagem.toLowerCase(); // para evitar erros de case-sensitive, converte a mensagem para minúsculas

    for (const item of respostas) { // percorre cada item do array de respostas
        for (const palavra of item.palavras) { // percorre cada palavra-chave associada à resposta
            if (mensagem.includes(palavra)) { // verifica se a mensagem do usuário contém a palavra-chave
                return item.resposta; // se encontrar, retorna a resposta associada a essa palavra-chave
            }
        }
    }
    // Caso contrario, retorna uma resposta padrão indicando que a dúvida não foi compreendida
    return "Desculpe, não consegui entender sua dúvida.";
}

// função para gerar o horário atual formatado como HH:MM, utilizada para exibir o horário em que cada mensagem foi enviada
function gerarHorario() {
    const agora = new Date();
    return agora.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// função para criar uma mensagem no chat
function criarMensagem(texto, tipo) {

    const mensagem = document.createElement('div');

    mensagem.classList.add('message');

    if (tipo === 'usuario') {
        mensagem.classList.add('message-usuario');
    } else {
        mensagem.classList.add('message-beni');
    }

    mensagem.innerHTML = `

        <div class="message-header">

            <i class="bi ${tipo === 'usuario'
            ? 'bi-person-circle'
            : 'bi-robot'}"></i>

            <span class="message-autor">
                ${tipo === 'usuario'
            ? 'Você'
            : 'Beni'}

            </span>

        </div>

        <div class="message-content">
            <p>${texto}</p>
        </div>

        <span class="message-time">
            ${gerarHorario()}
        </span>

    `;

    messagesContainer.appendChild(mensagem);

    /* Auto scroll */

    messagesContainer.scrollTop =
        messagesContainer.scrollHeight;

}

// função para enviar a mensagem
formulario.addEventListener('submit', (e) => {

    // Impede de recarregar a página
    e.preventDefault();

    const mensagemUsuario = input.value.trim();

    //Se a mensagem do usuário estiver vazia, não faz nada
    if (mensagemUsuario === '') return;

    //Se a mensagem tiver conteudo segue:

    // Nesse trecho pegamos o messagesContainer que inicialmente vai estar oculto (display none), e adicionamos a classe active para ele ficar visivel
    messagesContainer.classList.add('active');

    // E ao mesmo tempo, escondemos o cardsContainer, que são aqueles elementos que ficam exibidos quando não tem mensagens
    cardsContainer.style.display = 'none';

    creativeContent.style.display = 'none';

    //Usamos o metodo criarMensagem utilizando o texto do input e passamos o tipo 'usuario' para criar a mensagem do usuário no chat
    criarMensagem(mensagemUsuario, 'usuario');

    // Limpa o input para a próxima mensagem, definindo o valor do input como uma string vazia
    input.value = '';

    // ENCONTRA RESPOSTA
    const resposta = encontrarResposta(mensagemUsuario);

    // DELAY SIMULANDO IA 
    setTimeout(() => {
        criarMensagem(resposta, 'beni'); //aqui passamos o tipo 'beni' para criar a mensagem da Beni no chat, utilizando a resposta encontrada
    }, 1200);

});