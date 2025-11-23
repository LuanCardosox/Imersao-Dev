document.addEventListener('DOMContentLoaded', () => {
    const caixaBusca = document.getElementById('caixa-busca');
    const botaoBusca = document.getElementById('botao-busca');
    const conteudoPrincipal = document.querySelector('main');
    let dados = [];

    // Carrega os dados do arquivo JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            dados = data;
            exibirResultados(dados); // Exibe todos os itens inicialmente
        })
        .catch(error => {
            console.error('Erro ao carregar os dados:', error);
            // Exibe uma mensagem de erro para o usuário na página
            conteudoPrincipal.innerHTML = '<p class="erro">Falha ao carregar as tecnologias. Verifique o console para mais detalhes.</p>';
        });

    // Função para exibir os resultados na tela
    function exibirResultados(resultados) {
        conteudoPrincipal.innerHTML = ''; // Limpa os resultados anteriores

        if (resultados.length === 0) {
            conteudoPrincipal.innerHTML = '<p>Nenhuma tecnologia encontrada.</p>';
            return;
        }

        resultados.forEach(item => {
            const article = document.createElement('article');
            
            const link = item.link || item.link_oficial;

            article.innerHTML = `
                <h2>${item.nome}</h2>
                <p>${item.descricao}</p>
                <p><strong>Tags:</strong> ${item.tags.join(', ')}</p>
                <a href="${link}" target="_blank">Saiba mais</a>
            `;

            conteudoPrincipal.appendChild(article);
        });
    }

    // Função para realizar a busca
    function buscar() {
        const termoBusca = caixaBusca.value.toLowerCase().trim();

        if (termoBusca === '') {
            exibirResultados(dados); // Se a busca estiver vazia, mostra tudo
            return;
        }

        const resultadosFiltrados = dados.filter(item => 
            item.nome.toLowerCase().includes(termoBusca) ||
            item.tags.some(tag => tag.toLowerCase().includes(termoBusca)) ||
            item.descricao.toLowerCase().includes(termoBusca)
        );

        exibirResultados(resultadosFiltrados);
    }

    // Adiciona o evento de clique ao botão de busca
    botaoBusca.addEventListener('click', buscar);
});