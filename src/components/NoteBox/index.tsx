// NoteBox.tsx
import React, { useEffect } from 'react';
import { formatDate } from '../../utils/FormatDate';
import { getCorByDisciplina } from '../../utils/ColorByDiscipline';
import { getCorByNote } from '../../utils/ColorByNote';
import { getVectorByNote } from '../../utils/VectorByNote';
import styles from './NoteBox.module.scss';
import Swal from 'sweetalert2';
import axios from 'axios';
import instance from '../../services/api';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

interface DynamicNoteBoxProps {
    id: string;
    bimester: string;
    discipline: string;
    note: number;
    createdAt: string;
}

const NoteBox: React.FC<DynamicNoteBoxProps> = ({ id, discipline, note, createdAt }) => {
    const corDiscipline = getCorByDisciplina(discipline);
    const dateFormatted = formatDate(createdAt);
    const corNote = getCorByNote(note);
    const vector = getVectorByNote(note);

    const handleDelete = (id: string) => {
        Swal.fire({
            title: 'Deseja realmente excluir?',
            text: "Se você excluir, não será possível recuperar.",
            color: '#FFFFFF',
            icon: 'question',
            iconColor: '#FF5964',
            showDenyButton: true,
            confirmButtonText: 'Sim',
            confirmButtonColor: '#0000ff',
            denyButtonText: 'Não',
            customClass: {
                popup: `${styles.customPopup}`,
                title: `${styles.customTitle}`,
            },
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${instance.defaults.baseURL}/delete-result/${id.toString()}`)
                .then(response => {
                    console.log(response.status);
                    if (response.status === 204) {
                        showSuccessPopup();
                    } else {
                        showFaultPopup();
                    }
                })
                .catch(error => {
                    console.error('Erro na chamada da API:', error);
                    Swal.fire({
                        icon: 'warning',
                        title: 'Erro!',
                        text: 'Tente novamente mais tarde!',
                        color: '#FFFFFF',
                        confirmButtonColor: '#ef994e',
                        confirmButtonText: 'Tentar novamente',
                        customClass: {
                            popup: `${styles.customPopup}`,
                            title: `${styles.customTitle}`,
                        },
                    });
                });
            } else {
                // O usuário escolheu "não", nada é feito
            }
        });
    };

    const showSuccessPopup = () => {
        Swal.fire({
            title: 'Excluído com sucesso!',
            color: '#FFFFFF',
            icon: 'success',
            iconColor: '#00a000',
            confirmButtonColor: '#00a000',
            customClass: {
                popup: `${styles.customPopup}`,
                title: `${styles.customTitle}`,
            },
        }).then(() => {
            window.location.reload();
        });
    };

    const showFaultPopup = () => {
        Swal.fire({
            title: 'Falha na exclusão!',
            text: "Ocorreu um erro, tente novamente mais tarde.",
            color: '#FFFFFF',
            icon: 'error',
            iconColor: '#FF5964',
            confirmButtonColor: '#00a000',
            customClass: {
                popup: `${styles.customPopup}`,
                title: `${styles.customTitle}`,
            },
        });
    };

    return (
        <div className={styles.div}>
            <div className={styles.box} style={{ background: `${corDiscipline}` }}>
                <div className={styles.disciplineDate}>
                    <p className={styles.discipline}> {discipline} </p>
                    <p className={styles.date}> {dateFormatted} </p>
                </div>
                <div className={styles.note} style={{ color: `${corNote}` }}>
                    <img src={`${vector}`} className={styles.imgNote}/>
                    <p>Nota: {note}</p>
                </div>
            </div>
            <div className={styles.trash}>
                <button onClick={() => handleDelete(id)} className={styles.trashButton} data-tooltip-id="my-tooltip-styles" data-tooltip-content="Remover">
                    <img src="/trash.png" alt="Delete" />
                </button>
                <Tooltip id="my-tooltip-styles" className={styles.tooltip}/>
            </div>
        </div>
    );
};

export default NoteBox;
