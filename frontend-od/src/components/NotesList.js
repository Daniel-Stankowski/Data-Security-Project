import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import * as React from 'react'
import Note from './Note';
import Paper from '@mui/material/Paper';

function NotesList(props) {
    return <>
        <TableContainer component={Paper} sx={{ width: '150vh', background: '#AEC2BF' }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell sx={{width: '6%'}}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.notes.map(id => <Note removeNote={props.removeNote} id={id} key={id}/>)}
                </TableBody>
            </Table>
        </TableContainer>
    </>
}

export default NotesList;