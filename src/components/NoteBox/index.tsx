// NoteBox.tsx
import React from 'react';
import { formatDate } from '../../utils/FormatDate';

interface DynamicNoteBoxProps {
    bimester: string;
    discipline: string;
    note: number;
    createdAt: string;
}

const getCorByDisciplina = (discipline: string): string => {
    const corMapping: Record<string, string> = {
      Biologia: '#CC4090',
      Artes: '#05A2C2',
      Geografia: '#C26719',
      Sociologia: '#9B19C2',
    };
    return corMapping[discipline] || '#0A8D5E';
};

export const NoteBox: React.FC<DynamicNoteBoxProps> = ({ bimester, discipline, note, createdAt }) => {
    const cor = getCorByDisciplina(discipline);
    const dateFormatted = formatDate(createdAt);

    return (
        <div style={{ border: `5px solid ${cor}`, padding: '10px', marginBottom: '10px' }}>
            <p>Bimestre: {bimester}</p>
            <p>Disciplina: {discipline}</p>
            <p>Nota: {note}</p>
            <p>Data: {dateFormatted}</p>
        </div>
    );
};

export default NoteBox;
