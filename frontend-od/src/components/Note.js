import { TableCell, TableRow } from '@mui/material';
import * as React from 'react';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
function Note(props) {
    const navigate = useNavigate()
    const navigateToNote = () => {
        navigate(`/note/${props.id}`)
    }
    return (
        <TableRow>
            <TableCell>{props.id}</TableCell>
            <TableCell><IconButton><ArrowForwardIosIcon onClick={navigateToNote} ></ArrowForwardIosIcon></IconButton></TableCell>
        </TableRow>
    )
}

export default Note;