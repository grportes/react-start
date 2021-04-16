export default obj => {
    if (obj) {
        if (typeof obj === 'string')
            return /^true$/i.test(obj.toLowerCase().trim());
    }
    return false;
};