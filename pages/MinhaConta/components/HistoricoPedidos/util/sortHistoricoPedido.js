const sortHistoricoPedido = (historico) => {

    historico.sort((a, b) => {
        if (a.dataPedido && b.dataPedido) {
            const dataPedidoA = a.dataPedido.includes("T") ? a.dataPedido.split("T")[0].split("-").join("") : a.dataPedido.split(" ")[0].split("-").reverse().join("")
            const dataPedidoB = b.dataPedido.includes("T") ? b.dataPedido.split("T")[0].split("-").join("") : b.dataPedido.split(" ")[0].split("-").reverse().join("")
            return dataPedidoB.localeCompare(dataPedidoA)
        }

        return 0
    })
};

export default sortHistoricoPedido;