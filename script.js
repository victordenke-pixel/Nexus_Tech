// ============================================================
// NEXUS TECH - LÓGICA DA CALCULADORA DE ORÇAMENTO
// ============================================================

const serviceData = {
    celular: [
        { name: "Troca de Tela / Display", price: 80 },
        { name: "Troca de Bateria", price: 60 },
        { name: "Conserto de Conector de Carga", price: 50 },
        { name: "Banho Químico (Recuperação de Água)", price: 70 },
        { name: "Formatação e Limpeza de Sistema", price: 40 },
        { name: "Reparo em Placa (Microssoldagem)", price: 110 }
    ],
    notebook: [
        { name: "Limpeza Interna + Troca de Pasta Térmica", price: 60 },
        { name: "Formatação com Backup de Dados", price: 50 },
        { name: "Instalação / Upgrade de SSD", price: 70 },
        { name: "Troca de Teclado ou Tela", price: 80 },
        { name: "Recuperação de Dobradiça / Carcaça", price: 90 }
    ],
    computador: [
        { name: "Formatação + Instalação de Programas", price: 50 },
        { name: "Limpeza Completa + Organização de Cabos", price: 60 },
        { name: "Montagem de Peças / Upgrade", price: 70 },
        { name: "Otimização para Jogos e Trabalhos", price: 40 }
    ],
    console: [
        { name: "Limpeza Profunda + Pasta Térmica Premium", price: 80 },
        { name: "Reparo de Controle (Analógico/Drift)", price: 45 },
        { name: "Troca de Conector HDMI", price: 120 },
        { name: "Troca de HD para SSD Rapidez", price: 90 }
    ]
};

// Elementos do DOM
const deviceSelect = document.getElementById("device");
const serviceSelect = document.getElementById("service");
const deliveryCheck = document.getElementById("delivery");
const priceEl = document.getElementById("final-price");
const btnWhatsapp = document.getElementById("btn-whatsapp");

// Event Listeners
deviceSelect.addEventListener("change", updateServices);
serviceSelect.addEventListener("change", calculatePrice);
deliveryCheck.addEventListener("change", calculatePrice);
btnWhatsapp.addEventListener("click", sendToWhatsApp);

function updateServices() {
    const selectedDevice = deviceSelect.value;
    serviceSelect.innerHTML = '<option value="">-- Selecione o serviço desejado --</option>';

    if (selectedDevice && serviceData[selectedDevice]) {
        serviceData[selectedDevice].forEach((item, index) => {
            const opt = document.createElement("option");
            opt.value = index;
            opt.textContent = `${item.name} - (A partir de R$ ${item.price},00)`;
            serviceSelect.appendChild(opt);
        });
    }
    calculatePrice();
}

function calculatePrice() {
    const deviceVal = deviceSelect.value;
    const serviceIdx = serviceSelect.value;
    const hasDelivery = deliveryCheck.checked;

    if (deviceVal && serviceIdx !== "") {
        let total = serviceData[deviceVal][serviceIdx].price;
        if (hasDelivery) total += 10;
        priceEl.textContent = `R$ ${total},00`;
    } else {
        priceEl.textContent = "R$ 0,00";
    }
}

function sendToWhatsApp() {
    if (!deviceSelect.value || serviceSelect.value === "") {
        alert("Por favor, selecione o seu equipamento e o serviço primeiro!");
        return;
    }

    const deviceText = deviceSelect.options[deviceSelect.selectedIndex].text;
    const serviceObj = serviceData[deviceSelect.value][serviceSelect.value];
    const serviceText = serviceObj ? serviceObj.name : "";
    const deliveryText = deliveryCheck.checked ? "Sim (+R$10)" : "Não (Levarei na loja)";
    const priceText = priceEl.textContent;

    // Mensagem formatada de forma limpa usando Template Literals
    const msg = `Olá, equipe Nexus Tech! Fiz uma simulação pelo site:

📱 *Equipamento:* ${deviceText}
🔧 *Serviço:* ${serviceText}
🚚 *Busca em Casa:* ${deliveryText}
💰 *Valor Estimado:* ${priceText}

Gostaria de agendar para fazer o conserto!`;

    // Número correto da loja
    const whatsappNum = "5545998196588"; 
    
    // Monta a URL separadamente para garantir que não haja erros de sintaxe
    const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(msg)}`;
    
    window.open(whatsappUrl, '_blank');
}
