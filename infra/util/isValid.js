const isValid = value => {

    if (value === undefined) return false;
    return value !== null;

};

export default isValid