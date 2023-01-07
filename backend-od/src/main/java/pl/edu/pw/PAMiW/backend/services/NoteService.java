package pl.edu.pw.PAMiW.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import pl.edu.pw.PAMiW.backend.entities.Note;
import pl.edu.pw.PAMiW.backend.repositories.NoteRepository;
import pl.edu.pw.PAMiW.backend.utils.Status;

import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteService {
    private final NoteRepository noteRepository;
    private final HashingService hashingService;
    public Note save(Note note) {
        if(note.getIsProtected())
            note.setPassword(hashingService.getHash(note.getPassword()));
        return noteRepository.save(note);
    }

    public Collection<Note> findAll() {
        return noteRepository.findAll();
    }

    public String findById(Long id, String keycloakId, String password) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Note not found"));
        if(note.getStatus().equals(Status.PUBLIC) && note.getIsProtected()){
            String hash = hashingService.getHash(password);
            if(hashingService.verifyPassword(password, note.getPassword())){
                return note.getNote();
            } else {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
            }
        } else if(note.getStatus().equals(Status.PRIVATE) && !note.getIsProtected()) {
            if(keycloakId.equals(note.getKeycloakId())) {
                return note.getNote();
            } else {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
            }
        } else if(note.getStatus().equals(Status.PRIVATE) && note.getIsProtected()) {
            String hash = hashingService.getHash(password);
            if(keycloakId.equals(note.getKeycloakId()) && hashingService.verifyPassword(password, note.getPassword())) {
                return note.getNote();
            } else {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
            }
        } else {
            return note.getNote();
        }
    }

    public List<Note> findAllNotesOfUser(String keycloakId) {
        return noteRepository.findAll().stream()
                .filter(note -> note.getKeycloakId().equals(keycloakId)).toList();
    }

    public List<Note> findAllPublicNotes() {
        return noteRepository.findAll().stream().filter( note -> note.getStatus().equals(Status.PUBLIC)).toList();
    }

    public Boolean checkIfProtected(Long id) {
        return noteRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Note not found")).getIsProtected();
    }
}
