//ButtonCreateNote.tsx
import React, { Children, useEffect, useState } from 'react';
import axios from 'axios';
import instance from '../../services/api';
import Swal from 'sweetalert2';
import styles from './ButtonCreateNote.module.scss';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export default function ButtonCreateNote(isOpen: any, setModalOpen:any ) {
    if (isOpen) {
        console.log(isOpen);
        return (
            <div className={styles.backModal}>
                <div className={styles.modal}>
                    <div onClick={setModalOpen}>
                        X
                    </div>
                </div>
            </div>
        )
    }

    return null;
};