export function formatDate(dateString: string) {
    const inputDate = new Date(dateString);

    if (!isNaN(inputDate.getTime())) {
        const day = String(inputDate.getUTCDate()).padStart(2, '0');
        const month = String(inputDate.getUTCMonth() + 1).padStart(2, '0'); 
        const year = inputDate.getUTCFullYear();

        const dateFormatted = `${day}/${month}/${year}`;
        return dateFormatted;
    }
    
    return dateString;
}
