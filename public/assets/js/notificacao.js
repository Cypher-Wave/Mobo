document.getElementById('notificacao-icone').addEventListener('click', function() {
    const caixaNotificacao = document.getElementById('caixa-notificacao');
    caixaNotificacao.style.display = caixaNotificacao.style.display === 'block' ? 'none' : 'block';
});

function fecharCaixa() {
    document.getElementById('caixa-notificacao').style.display = 'none';
}

function excluirNotificacao(botao) {
    const item = botao.closest('.notificacao-item');
    item.remove();

    // Atualiza o contador de notificações
    const badge = document.getElementById('notificacao-badge');
    const lista = document.getElementById('lista-notificacoes');
    badge.textContent = lista.children.length;
}

function gerarAlerta(mensagem) {
    alert(`Alerta: ${mensagem}`);
}
