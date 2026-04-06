// ============================================================
// DETECÇÃO DE BANDEIRA DO CARTÃO
// ============================================================

const padroesBandeira = {
    visa:       /^4/,
    mastercard: /^5[1-5]|^2(2[2-9]|[3-6]\d|7[01]|720)/,
    elo:        /^(4011|4312|4389|4514|4573|4576|5041|5066|5067|509|6277|6362|6363|650|6516|6550)/,
};

function detectarBandeira(numero) {
    const limpo = numero.replace(/\s/g, '');
    for (const [nome, regex] of Object.entries(padroesBandeira)) {
        if (regex.test(limpo)) return nome;
    }
    return null;
}

function atualizarBandeiras(bandeira) {
    const mapa = {
        'icone-visa': 'visa',
        'icone-mc': 'mastercard',
        'icone-elo': 'elo'
    };

    // Ícones do topo: desbota os que NÃO são a bandeira ativa
    Object.keys(mapa).forEach(id => {
        const el = document.getElementById(id);
        if (bandeira === null) {
            el.classList.remove('desbotada');
        } else {
            el.classList.toggle('desbotada', mapa[id] !== bandeira);
        }
    });

    // Badge dentro do campo de número
    const badge = document.getElementById('badge-ativo');
    badge.className = 'badge-ativo'; // reset

    if (bandeira === 'visa') {
        badge.classList.add('visa');
        badge.textContent = 'VISA';
    } else if (bandeira === 'mastercard') {
        badge.classList.add('mastercard');
        badge.textContent = '';
    } else if (bandeira === 'elo') {
        badge.classList.add('elo');
        badge.textContent = 'ELO';
    }
}

// ============================================================
// FORMATAÇÃO DO NÚMERO DO CARTÃO (grupos de 4)
// ============================================================
document.getElementById('numero-cartao').addEventListener('input', function (e) {
    let valor = e.target.value.replace(/\D/g, '').substring(0, 16);
    let formatado = valor.match(/.{1,4}/g)?.join(' ') || '';
    e.target.value = formatado;
    atualizarBandeiras(detectarBandeira(formatado));
});

// ============================================================
// FORMATAÇÃO DA VALIDADE (MM/AA)
// ============================================================
document.getElementById('validade').addEventListener('input', function (e) {
    let valor = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (valor.length >= 3) {
        valor = valor.substring(0, 2) + '/' + valor.substring(2);
    }
    e.target.value = valor;
});

// ============================================================
// FORMATAÇÃO DO CEP (00000-000)
// ============================================================
document.getElementById('cep').addEventListener('input', function (e) {
    let valor = e.target.value.replace(/\D/g, '').substring(0, 8);
    if (valor.length > 5) {
        valor = valor.substring(0, 5) + '-' + valor.substring(5);
    }
    e.target.value = valor;
});