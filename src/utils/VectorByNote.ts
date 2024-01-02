export function getVectorByNote (note: number): string {
    if (note >= 8) {
        return '/vectorNotaGreen.png'; 
    } else if (note >= 6) {
        return 'vectorNotaYellow.png'; 
    } else {
        return 'vectorNotaRed.png'; 
    }
};