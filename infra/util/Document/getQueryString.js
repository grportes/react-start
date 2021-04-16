import queryString from 'query-string';

export default _ => {
    const location = document.location;
    return (location && location.search) ? queryString.parse(location.search) : null
};