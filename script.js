/**
 * Script principal do Petshop Amigo Fiel - Fase 2
 * Implementa funções temporais, cálculo dinâmico de serviços e validação de formulário.
 */

// 1. Função Temporal: Relógio em tempo real e status de funcionamento (Aula 8/9)
function atualizarRelogioStatus() {
    const elementoRelogio = document.getElementById('relogio-dinamico');
    const agora = new Date();
    const hora = agora.getHours();
    const dataFormatada = agora.toLocaleDateString('pt-BR');
    const horaFormatada = agora.toLocaleTimeString('pt-BR');

    // Horário de funcionamento: 08h às 19h
    const statusLoja = (hora >= 8 && hora < 19) 
        ? "🟢 Aberto agora (08h às 19h)" 
        : "🔴 Fechado no momento (Agendamento online disponível 24h)";

    elementoRelogio.textContent = `${dataFormatada} - ${horaFormatada} | ${statusLoja}`;
}

// Atualiza o relógio a cada 1 segundo (1000ms)
setInterval(atualizarRelogioStatus, 1000);
atualizarRelogioStatus();

// 2. Cálculo dinâmico do valor do serviço selecionado
const servBanho = document.getElementById('servBanho');
const servTosa = document.getElementById('servTosa');
const teleBusca = document.getElementById('teleBusca');
const entregaLocal = document.getElementById('entregaLocal');
const valorEstimadoEl = document.getElementById('valorEstimado');

function calcularValorTotal() {
    let total = 0;
    if (servBanho.checked) total += 50;
    if (servTosa.checked) total += 35;
    if (teleBusca.checked && total > 0) total += 20;

    valorEstimadoEl.textContent = `Valor Estimado: R$ ${total.toFixed(2).replace('.', ',')}`;
    return total;
}

// Escuta mudanças nas opções de serviço e tele-busca
[servBanho, servTosa, teleBusca, entregaLocal].forEach(el => {
    el.addEventListener('change', calcularValorTotal);
});

// 3. Processamento e validação do formulário de cadastro e agendamento
document.getElementById('formAgendamento').addEventListener('submit', function(event) {
    event.preventDefault();

    const nomeCliente = document.getElementById('nomeCliente').value.trim();
    const cpfCliente = document.getElementById('cpfCliente').value.trim();
    const emailCliente = document.getElementById('emailCliente').value.trim();
    const telefoneCliente = document.getElementById('telefoneCliente').value.trim();
    const enderecoCliente = document.getElementById('enderecoCliente').value.trim();
    const nomePet = document.getElementById('nomePet').value.trim();
    const racaPet = document.getElementById('racaPet').value.trim();
    const idadePet = document.getElementById('idadePet').value;
    const dataHora = document.getElementById('dataHoraAgendamento').value;
    const resultadoDiv = document.getElementById('resultadoAgendamento');

    // Validação de campos obrigatórios e seleção de pelo menos um serviço
    const servicosEscolhidos = [];
    if (servBanho.checked) servicosEscolhidos.push("Banho");
    if (servTosa.checked) servicosEscolhidos.push("Tosa");

    if (!nomeCliente || !cpfCliente || !emailCliente || !telefoneCliente || !enderecoCliente || !nomePet || !racaPet || !idadePet || !dataHora) {
        alert("Por favor, preencha todos os campos obrigatórios marcados com *.");
        return;
    }

    if (servicosEscolhidos.length === 0) {
        alert("Selecione pelo menos um serviço (Banho ou Tosa) para agendar.");
        return;
    }

    const metodo = teleBusca.checked ? "Tele-Busca" : "Entrega no Local";
    const totalFinal = calcularValorTotal();
    const dataFormatada = new Date(dataHora).toLocaleString('pt-BR');

    // Exibe confirmação dinâmica na tela
    resultadoDiv.className = "mt-4 alert alert-success";
    resultadoDiv.innerHTML = `
        <h4 class="alert-heading">✅ Agendamento Confirmado com Sucesso!</h4>
        <p><strong>Cliente:</strong> ${nomeCliente} (CPF: ${cpfCliente})</p>
        <p><strong>Pet:</strong> ${nomePet} (${racaPet}, ${idadePet} ano(s))</p>
        <p><strong>Serviços:</strong> ${servicosEscolhidos.join(' + ')} | <strong>Modalidade:</strong> ${metodo}</p>
        <p><strong>Data e Horário:</strong> ${dataFormatada}</p>
        <hr>
        <p class="mb-0 fw-bold">Total a pagar: R$ ${totalFinal.toFixed(2).replace('.', ',')}</p>
    `;
});