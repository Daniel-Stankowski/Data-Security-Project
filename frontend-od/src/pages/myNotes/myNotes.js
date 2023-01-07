import React, {useEffect, useState} from 'react';
import {useKeycloak} from "@react-keycloak/web";
import { notesApi } from '../../api/notesApi';
import { Box } from '@mui/material';
import AddingModal from '../../components/AddingModal';
import NotesList from '../../components/NotesList';

function MyNotes() {
    const {keycloak} = useKeycloak()
    const [myNotes, setMyNotes] = useState([])
    useEffect(() => {
        notesApi.getUserNotes(keycloak.subject, keycloak.token).then((res) => {
            setMyNotes(res.data)
        })
    }, [])
    const updateNotes = () => {
        notesApi.getUserNotes(keycloak.subject, keycloak.token).then((res) => {
            setMyNotes(res.data)
        })
    }
    return <>
    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
        <AddingModal updateNotes={updateNotes}/>
        <NotesList notes={myNotes}></NotesList>
    </Box>
    </>
}

export default MyNotes;