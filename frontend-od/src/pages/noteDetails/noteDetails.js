import { Box, Button, FormControl, Modal, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import { notesApi } from '../../api/notesApi';
function NoteDetails() {
    const {keycloak} = useKeycloak()
    const {id} = useParams()
    const [note, setNote] = useState(null)
    const [inputPassword, setInputPassword] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [authorized, setAuthorized] = useState(false)
    
    const handleCloseModal = () => {
        setOpenModal(false)
        setInputPassword('')
    }

    const handleInputPasswordChange = (event) => {
        setInputPassword(event.target.value)
    }

    useEffect(() => {
        notesApi.checkIfProtected(id, keycloak.token).then((res) => {
            res.data === false ? getNote(null) : setOpenModal(true)
        })
    }, [])

    const getNote = (password) => {
        let requestForNote = {
            keycloakId: keycloak.subject,
            password: password,
            id: id
        }
        notesApi.getById(requestForNote, keycloak.token).then((res) => {
            if(res.status !== 200) {
                setOpenModal(true)
            } else {
                setNote(res.data)
                handleCloseModal()
            }
        })
    }



    const styleBox = {
        bgcolor: "#AEC2BF",
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90vw',
        minHeight: '70vh',
        p: 4,
      };
      const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const submit = () => {
        getNote(inputPassword)
    }

    return <>
    <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={styleModal}>
            <FormControl sx={{gap: 3, display: 'flex', alignItems: "center"}}>
                <TextField value={inputPassword} onChange={handleInputPasswordChange}
                 id="password" label="password" type="password"/>
                 <Button onClick={submit} variant='outlined'>Submit</Button>
            </FormControl>
        </Box>
    </Modal>
    <Box sx={styleBox}>
        <ReactMarkdown>{note === null ? "" : note.toString()}</ReactMarkdown>
    </Box>
    </>
}

export default NoteDetails;