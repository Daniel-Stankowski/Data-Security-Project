import AddIcon from '@mui/icons-material/Add';
import { Button, Checkbox, Fab, FormControl, FormControlLabel, FormHelperText, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useKeycloak } from '@react-keycloak/web';
import { notesApi } from '../api/notesApi';

function AddingModal(props) {
    const {keycloak} = useKeycloak()
    const [openModal, setOpenModal] = useState(false)
    const [inputNote, setInputNote] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const [passwordChecked, setPasswordChecked] = useState(false)
    const [privateChecked, setPrivateChecked] = useState(false)

    const handleInputNoteChange = (event) => {
        if(event.target.value === '') {
            setPasswordChecked(false)
            setPrivateChecked(false)
        }
        setInputNote(event.target.value)
        
    }

    const handleInputPasswordChange = (event) => {
        setInputPassword(event.target.value)
    }

    const handlePasswordCheckedChange = (event) => {
        setPasswordChecked(event.target.checked)
        setInputPassword('')
    }

    const handlePrivateCheckedChange = (event) => {
        setPrivateChecked(event.target.checked)
    }



    const addNote = () => {
        let noteToSend = {
            note: inputNote,
            keycloakId: keycloak.subject,
            password: passwordChecked ? inputPassword : null,
            status: privateChecked ? 'PRIVATE' : 'PUBLIC',
            isProtected: inputPassword === '' ? false : true
        }
        notesApi.create(noteToSend, keycloak.token).then((res) => {
            props.updateNotes()
        })
        handleCloseModal()
    }

    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vh',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        maxHeight: "70vh"
    };
    const handleCloseModal = () => {
        setOpenModal(false)
        setInputNote('')
        setInputPassword('')
        setPrivateChecked(false)
        setPasswordChecked(false)
    }
    const handleOpenModal = () => {
        setOpenModal(true)
    }
    return <>
    <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx ={styleModal}>
            <FormControl sx={{gap: 3, display: 'flex', alignItems: "center"}}>
                <FormHelperText id="helper">Input note details</FormHelperText>
                <TextareaAutosize value={inputNote} onChange={handleInputNoteChange} aria-label="note"
                 placeholder="Empty" style={{ maxHeight: "50vh",width: "80vh", minHeight: "30vh", maxWidth: "80vh", minWidth: "80vh" }} />
                <Box sx={{mt: 3,alignSelf: "flex-start", display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <FormControlLabel label="Private?" control={<Checkbox disabled={inputNote === ''} checked={privateChecked} onChange={handlePrivateCheckedChange} />}/>
                    <FormControlLabel label="Password?" control={<Checkbox disabled={inputNote === ''} checked={passwordChecked} onChange={handlePasswordCheckedChange} />}/>
                    { passwordChecked && <TextField value={inputPassword} onChange={handleInputPasswordChange} id="password" label="password" type="password"/>}
                </Box>
                <Button onClick={addNote} variant='outlined' disabled={((inputNote !== '') === (passwordChecked)) && inputPassword === ''} sx={{alignSelf: 'flex-end'}}>Submit</Button>
            </FormControl>
        </Box>
    </Modal>
    <Fab
        onClick={handleOpenModal} 
        size="large"
        edge="start"
        color="inherit"
        aria-label="add"
        sx={{position: 'fixed', top: '90%', left: '92%', background: '#AEC2BF'}}>
        <AddIcon/>
    </Fab>
    </>
}

export default AddingModal;