import React, {useEffect, useState} from 'react';
import {useKeycloak} from "@react-keycloak/web";
import { notesApi } from '../../api/notesApi';
import AddingModal from '../../components/AddingModal';
import NotesList from '../../components/NotesList';
import { Box } from '@mui/material';

function PublicNotes() {
    const {keycloak} = useKeycloak()
    const [publicNotes, setPublicNotes] = useState([])
    useEffect(() => {
        notesApi.getAllPublic(keycloak.token).then((res) => {
            setPublicNotes(res.data)
        })
    }, [])
    const updateNotes = () => {
        notesApi.getAllPublic(keycloak.token).then((res) => {
            setPublicNotes(res.data)
        })
    }
    return <>
    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
        <AddingModal updateNotes={updateNotes}/>
        <NotesList notes={publicNotes}></NotesList>
    </Box>
    </>
}

export default PublicNotes;