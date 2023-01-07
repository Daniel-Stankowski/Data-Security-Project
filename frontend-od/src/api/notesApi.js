import { create } from "@mui/material/styles/createTransitions";
import { backendApi } from "./backendApi";
import { bearerAuth } from "./bearerAuth";

const notesClient = backendApi('/notes')

export const notesApi = {
    getAllPublic(token) {
        return notesClient.get('', {
            headers: {'Authorization': bearerAuth(token)}
        })
    },

    getById(requestForNote, token) {
        return notesClient.post('/id', requestForNote, {
            headers: {'Authorization': bearerAuth(token)}
        })
    },

    create(note, token) {
        return notesClient.post('', note, {
            headers: {'Authorization': bearerAuth(token)}
        })
    },

    getUserNotes(keycloakId, token) {
        return notesClient.get(`/user/${keycloakId}`, {
            headers: {'Authorization': bearerAuth(token)}
          })
    },

    checkIfProtected(id, token) {
        return notesClient.get(`/protected/${id}`, {
            headers: {'Authorization': bearerAuth(token)}
        })
    }
}