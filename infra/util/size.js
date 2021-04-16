const size = itens => {
    return (itens && typeof itens === 'object' && itens.size)
        ? itens.size
        : (itens && typeof itens === 'object' && itens.length) ? itens.length : 0;
};

export default size;