export function getCorByNote (note: number): string {
    if (note >= 8) {
        return '#05FF00'; 
    } else if (note >= 6) {
        return '#FFFF99'; 
    } else {
        return '#FF5964'; 
    }
};