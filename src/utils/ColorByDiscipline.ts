export function getCorByDisciplina (discipline: string): string {
    const corMapping: Record<string, string> = {
      Biologia: '#CC4090',
      Artes: '#05A2C2',
      Geografia: '#C26719',
      Sociologia: '#9B19C2',
    };
    return corMapping[discipline] || '#0A8D5E';
};