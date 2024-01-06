export function formatDate(date) {

    // Get the year, month, day, hour, minute, and second
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');

    // Create the formatted string
    const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

    return formattedDate;
}