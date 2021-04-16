export default function formatDatePedido(date) {
    let d = new Date(date);

    let day = '' + d.getDate();
    if (day.length < 2) day = '0' + day;

    let month = '' + (d.getMonth() + 1);
    if (month.length < 2) month = '0' + month;

    return `${day}-${month}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
}