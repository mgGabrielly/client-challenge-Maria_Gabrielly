// Home.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoteBox from '../../components/NoteBox';
import instance from '../../services/api';
import Swal from 'sweetalert2';

export default function Home() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        axios.get(`${instance.defaults.baseURL}/results`)
        .then(response => {
            if (response.status === 200) {
                setData(response.data);
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
        })
    }, []);

    return (
        <div>
            <h1>Meu Aplicativo React</h1>
            {data.map((item: any) => (
                <NoteBox key={item.id} bimester={item.bimester} discipline={item.discipline} note={item.note} createdAt={item.createdAt} />
            ))}
        </div>
    );
};

