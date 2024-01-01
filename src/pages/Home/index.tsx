// Home.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoteBox from '../../components/NoteBox';
import instance from '../../services/api';
import Swal from 'sweetalert2';
import styles from './Home.module.scss';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import ButtonCreateNote from '../../components/ButtonCreateNote';

export default function Home() {
    const [openModal, setOpenModal] = useState(false);

    const [dataB1, setDataB1] = useState<any[]>([]); 
    const [dataB2, setDataB2] = useState<any[]>([]); 
    const [dataB3, setDataB3] = useState<any[]>([]); 
    const [dataB4, setDataB4] = useState<any[]>([]); 

    useEffect(() => {
        try {
            axios.get(`${instance.defaults.baseURL}/results`)
            .then(response => {
                if (response.status === 200) {
                    const responseData = response.data;
                    setDataB1([]);
                    setDataB2([]);
                    setDataB3([]);
                    setDataB4([]);
                    for (const dataItem of responseData) {
                        if (dataItem.bimester === "PRIMEIRO") {
                            setDataB1(prevData => [...prevData, dataItem]);
                        } else if (dataItem.bimester === "SEGUNDO") {
                            setDataB2(prevData => [...prevData, dataItem]);
                        } else if (dataItem.bimester === "TERCEIRO") {
                            setDataB3(prevData => [...prevData, dataItem]);
                        } else if (dataItem.bimester === "QUARTO") {
                            setDataB4(prevData => [...prevData, dataItem]);
                        }
                    }
                    setDataB1(prevData => prevData.sort((a, b) => a.discipline.localeCompare(b.discipline)));
                    setDataB2(prevData => prevData.sort((a, b) => a.discipline.localeCompare(b.discipline)));
                    setDataB3(prevData => prevData.sort((a, b) => a.discipline.localeCompare(b.discipline)));
                    setDataB4(prevData => prevData.sort((a, b) => a.discipline.localeCompare(b.discipline)));
                } else {
                    Swal.fire({
                    icon: 'warning',
                    title: 'Erro!',
                    text: 'Dados não foram carregados. Tente novamente mais tarde!',
                    color: '#00247D',
                    confirmButtonColor: '#ef994e',
                    confirmButtonText: 'Tentar novamente',
                    });
                }
            });
        } catch (error) {
            console.error('Erro na chamada da API:', error);
            Swal.fire({
                icon: 'warning',
                title: 'Erro!',
                text: 'Tente novamente mais tarde!',
                color: '#00247D',
                confirmButtonColor: '#ef994e',
                confirmButtonText: 'Tentar novamente',
            });
        }
    }, []);

    return (
        <div className={styles.div}>
            {/* Bimestre 1*/}
            <div className={styles.background}>
                {/* Editar o styles: header e trashbutton */}
                <div className={styles.header}>
                    <h1>Bimestre 1</h1>
                    <button onClick={() => setOpenModal(true)} className={styles.releaseNote} data-tooltip-id="my-tooltip-styles" data-tooltip-content="Adicionar">
                        <p>Lançar Nota</p>
                        <img src="/toAdd.png" alt="Adicionar" />
                    </button>
                    <Tooltip id="my-tooltip-styles" className={styles.tooltip}/>
                    <ButtonCreateNote isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}/>
                </div>
                <div className={styles.container}>
                    {dataB1.map((item: any) => (
                        <NoteBox key={item.id} id={item.id} bimester={item.bimester} discipline={item.discipline} note={item.note} createdAt={item.createdAt} />
                    ))}
                </div>
            </div>
            {/* Bimestre 2*/}
            <div className={styles.background}>
                <h1>Bimestre 2</h1>
                <div className={styles.container}>
                    {dataB2.map((item: any) => (
                        <NoteBox key={item.id} id={item.id} bimester={item.bimester} discipline={item.discipline} note={item.note} createdAt={item.createdAt} />
                    ))}
                </div>
            </div>
            {/* Bimestre 3*/}
            <div className={styles.background}>
                <h1>Bimestre 3</h1>
                <div className={styles.container}>
                    {dataB3.map((item: any) => (
                        <NoteBox key={item.id} id={item.id} bimester={item.bimester} discipline={item.discipline} note={item.note} createdAt={item.createdAt} />
                    ))}
                </div>
            </div>
            {/* Bimestre 4*/}
            <div className={styles.background}>
                <h1>Bimestre 4</h1>
                <div className={styles.container}>
                    {dataB4.map((item: any) => (
                        <NoteBox key={item.id} id={item.id} bimester={item.bimester} discipline={item.discipline} note={item.note} createdAt={item.createdAt} />
                    ))}
                </div>
            </div>
        </div>
    );
};

