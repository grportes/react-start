const formataHistoricoPedido = (historico) => {

    const historicoFormatado = [];
    let pedidosMesmoID = historico[0];
    let itens = [];

    historico.map((pedido) => {
        if (pedido.nroPedido === pedidosMesmoID.nroPedido) {
            itens.push({
                idMercadoria: pedido.idMercadoria,
                codigoFoto: pedido.codigoFoto,
                descricaoCompleta: pedido.descricaoCompleta,
                vlrPrecoBase: pedido.precoUnitario,
                qtdVendida: pedido.qtdVendida,
            })

            if(!pedidosMesmoID.dataEntrega && pedido.dataEntrega) pedidosMesmoID.dataEntrega = pedido.dataEntrega
        }

        else {
            pedidosMesmoID['itens'] = itens;
            historicoFormatado.push(pedidosMesmoID);

            itens = [];
            pedidosMesmoID = pedido;

            itens.push({
                idMercadoria: pedido.idMercadoria,
                codigoFoto: pedido.codigoFoto,
                descricaoCompleta: pedido.descricaoCompleta,
                vlrPrecoBase: pedido.precoUnitario,
                qtdVendida: pedido.qtdVendida,
            })
        }
    });

    if (itens.length > 0) {
        pedidosMesmoID['itens'] = itens;
        historicoFormatado.push(pedidosMesmoID);
    }

    return historicoFormatado;
}

export default formataHistoricoPedido;