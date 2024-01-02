//ButtonCreateNote.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import instance from '../../services/api';
import Swal from 'sweetalert2';
import styles from './ButtonCreateNote.module.scss';

interface IModal {
    isOpen: boolean;
    setOpenModal: (isOpen: boolean) => void;
    bimester: string;
}

const disciplinas = ["Biologia", "Artes", "Geografia", "Sociologia"];

export function ButtonCreateNote({isOpen, setOpenModal, bimester} : IModal) {
    if (isOpen) {
        // const { register, handleSubmit } = useForm();
        const [nota, setNota] = useState("");
        const [disciplina, setDisciplina] = useState("");
        const [bimestre, setBimestre] = useState("");

        const handleNotaChange = (e: { target: { value: any; }; }) => {
            const value = e.target.value;
            // Garanta que o valor esteja no formato correto (número de ponto flutuante)
            if (/^\d+(\.\d{0,1})?$/.test(value)) {
                const notaFloat = parseFloat(value);
                // Garanta que a nota está no intervalo de 0 a 10
                if (!isNaN(notaFloat) && notaFloat >= 0 && notaFloat <= 10) {
                    setNota(value);
                }
            }
        };

        const handleDisciplinaChange = (selectedDisciplina: React.SetStateAction<string>) => {
            setDisciplina(selectedDisciplina);
        };

        const handleBimestreChange = () => {
            let newBimestre = "";
            if (bimester === 'Bimestre 1') {
                newBimestre = "PRIMEIRO";
            } else if (bimester === 'Bimestre 2') {
                newBimestre = "SEGUNDO";
            } else if (bimester === 'Bimestre 3') {
                newBimestre = "TERCEIRO";
            } else {
                newBimestre = "QUARTO";
            }
        
            setBimestre(newBimestre);
        };

        useEffect(() => {
            handleBimestreChange();
        }, [bimester]);

        const handleSubmit = async () => {
            if (nota && disciplina) {
                const bimester = bimestre.toString();
                const discipline = disciplina.toString();
                const note = parseFloat(nota);
                try {
                    await axios.post(`${instance.defaults.baseURL}/create-result`, {
                        bimester,
                        discipline,
                        note,
                    }).then((response) => {
                        if (response.status === 201) {
                            showSuccessPopup();
                        } else if (response.status === 405) {
                            Swal.fire({
                                title: 'Disciplina no bimestre já existe!',
                                text: 'Adicione outra nota.',
                                color: '#FFFFFF',
                                icon: 'error',
                                iconColor: '#FF5964',
                                confirmButtonColor: '#00a000',
                                customClass: {
                                    popup: `${styles.customPopup}`,
                                    title: `${styles.customTitle}`,
                                },
                            });
                        } else {
                            showFaultPopup();
                        }
                    })
                } catch (err) {
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
                }
                setNota("");
                setDisciplina("");
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Erro!',
                    text: 'Preencha todos os campos!',
                    color: '#FFFFFF',
                    confirmButtonColor: '#ef994e',
                    confirmButtonText: 'Tentar novamente',
                    customClass: {
                        popup: `${styles.customPopup}`,
                        title: `${styles.customTitle}`,
                    },
                });
            }
        };

        const showSuccessPopup = () => {
            Swal.fire({
                title: 'Adicionado com sucesso!',
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
                title: 'Falha ao adicionar!',
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

        const disciplinaCores: Record<string, string> = {
            Biologia: "#580434",
            Artes: "#034653",
            Geografia: "#572A04",
            Sociologia: "#390449",
        };

        const disciplinaSelecionadaCores: Record<string, string> = {
            Biologia: "#CC4090",
            Artes: "#05A2C2",
            Geografia: "#C26719",
            Sociologia: "#9B19C2",
        };

        return (
            <div className={styles.background}>
                <div className={styles.modal}>
                    <div className={styles.header}> 
                        <div className={styles.header}>{bimester}</div>
                        <div className={styles.close} onClick={() => setOpenModal(!isOpen)} >X</div>
                    </div>
                    {/* disciplina */}
                    <div>
                        <h4>Disciplina</h4>
                        {disciplinas.map((disciplinaOpcao) => (
                        <button className={styles.buttonDisciplina}
                        key={disciplinaOpcao}
                        onClick={() => handleDisciplinaChange(disciplinaOpcao)}
                        style={{
                            backgroundColor:
                                disciplina === disciplinaOpcao && disciplinaSelecionadaCores[disciplinaOpcao]
                                    ? disciplinaSelecionadaCores[disciplinaOpcao]
                                    : disciplinaCores[disciplinaOpcao],
                        }}
                        >
                        {disciplinaOpcao}
                        </button>
                    ))}
                    </div>
                    {/* Nota */}
                    <div>
                       <label className={styles.labelNote}>
                            <h5>Nota</h5>
                            <input className={styles.inputNote}
                            type="text"
                            value={nota}
                            onChange={handleNotaChange}
                            placeholder="7.4"
                            />
                        </label>
                    </div>
                    <button onClick={handleSubmit} className={styles.buttonModel}>Confirmar</button>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
};