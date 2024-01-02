// Home.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoteBox from '../../components/NoteBox';
import instance from '../../services/api';
import Swal from 'sweetalert2';
import styles from './Home.module.scss';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import {ButtonCreateNote} from '../../components/ButtonCreateNote';

export default function Home() {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModal2, setOpenModal2] = useState<boolean>(false);
    const [openModal3, setOpenModal3] = useState<boolean>(false);
    const [openModal4, setOpenModal4] = useState<boolean>(false);

    const [dataB1, setDataB1] = useState<any[]>([]); 
    const [dataB2, setDataB2] = useState<any[]>([]); 
    const [dataB3, setDataB3] = useState<any[]>([]); 
    const [dataB4, setDataB4] = useState<any[]>([]); 

    const [larguraTela, setLarguraTela] = useState(window.innerWidth);

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

    useEffect(() => {
        const handleResize = () => {
            setLarguraTela(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={styles.divGeral}> 
            <div className={styles.divHome}>
                {/* Bimestre 1*/}
                <div className={styles.background}>
                    <div className={styles.header}>
                        <h1>Bimestre 1</h1>             
                        <button onClick={() => setOpenModal(!openModal)} className={styles.releaseNote} data-tooltip-id="my-tooltip-styles" data-tooltip-content="Adicionar">
                            {larguraTela > 450 && (
                                <p>Lançar nota</p>
                            )}
                            <img src="/toAdd.png" alt="Adicionar" />
                        </button>
                        <Tooltip id="my-tooltip-styles" className={styles.tooltip}/>
                        <ButtonCreateNote isOpen={openModal} setOpenModal={setOpenModal} bimester={'Bimestre 1'}/>
                    </div>
                    <div className={styles.container}>
                        {dataB1.map((item: any) => (
                            <NoteBox key={item.id} id={item.id} bimester={item.bimester} discipline={item.discipline} note={item.note} createdAt={item.createdAt} />
                        ))}
                    </div>
                </div>
                {/* Bimestre 2*/}
                <div className={styles.background}>
                    <div className={styles.header}>
                        <h1>Bimestre 2</h1>
                        <button onClick={() => setOpenModal2(!openModal2)} className={styles.releaseNote} data-tooltip-id="my-tooltip-styles" data-tooltip-content="Adicionar">
                            {larguraTela > 450 && (
                                <p>Lançar nota</p>
                            )}
                            <img src="/toAdd.png" alt="Adicionar" />
                        </button>
                        <Tooltip id="my-tooltip-styles" className={styles.tooltip}/>
                        <ButtonCreateNote isOpen={openModal2} setOpenModal={setOpenModal2} bimester={'Bimestre 2'}/>
                    </div>
                    <div className={styles.container}>
                        {dataB2.map((item: any) => (
                            <NoteBox key={item.id} id={item.id} bimester={item.bimester} discipline={item.discipline} note={item.note} createdAt={item.createdAt} />
                        ))}
                    </div>
                </div>
                {/* Bimestre 3*/}
                <div className={styles.background}>
                    <div className={styles.header}>
                        <h1>Bimestre 2</h1>
                        <button onClick={() => setOpenModal3(!openModal3)} className={styles.releaseNote} data-tooltip-id="my-tooltip-styles" data-tooltip-content="Adicionar">
                            {larguraTela > 450 && (
                                <p>Lançar nota</p>
                            )}
                            <img src="/toAdd.png" alt="Adicionar" />
                        </button>
                        <Tooltip id="my-tooltip-styles" className={styles.tooltip}/>
                        <ButtonCreateNote isOpen={openModal3} setOpenModal={setOpenModal3} bimester={'Bimestre 3'}/>
                    </div>
                    <div className={styles.container}>
                        {dataB3.map((item: any) => (
                            <NoteBox key={item.id} id={item.id} bimester={item.bimester} discipline={item.discipline} note={item.note} createdAt={item.createdAt} />
                        ))}
                    </div>
                </div>
                {/* Bimestre 4*/}
                <div className={styles.background}>
                    <div className={styles.header}>
                        <h1>Bimestre 2</h1>
                        <button onClick={() => setOpenModal4(!openModal4)} className={styles.releaseNote} data-tooltip-id="my-tooltip-styles" data-tooltip-content="Adicionar">
                            {larguraTela > 450 && (
                                <p>Lançar nota</p>
                            )}
                            <img src="/toAdd.png" alt="Adicionar" />
                        </button>
                        <Tooltip id="my-tooltip-styles" className={styles.tooltip}/>
                        <ButtonCreateNote isOpen={openModal4} setOpenModal={setOpenModal4} bimester={'Bimestre 4'}/>
                    </div>
                    <div className={styles.container}>
                        {dataB4.map((item: any) => (
                            <NoteBox key={item.id} id={item.id} bimester={item.bimester} discipline={item.discipline} note={item.note} createdAt={item.createdAt} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

