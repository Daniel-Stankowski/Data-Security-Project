package pl.edu.pw.PAMiW.backend.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.PAMiW.backend.entities.Note;
import pl.edu.pw.PAMiW.backend.services.HashingService;
import pl.edu.pw.PAMiW.backend.services.NoteService;
import pl.edu.pw.PAMiW.backend.utils.RequestForNote;

import java.util.Collection;
import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "notes")
@RequiredArgsConstructor
public class NoteController {
    private final NoteService noteService;
    @GetMapping
    Collection<Long> findAllPublicNotesIds() {
        return noteService.findAllPublicNotes().stream().map(Note::getId).toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    Note create(@RequestBody Note note) {
        return noteService.save(note);
    }

    @PostMapping("/id")
    String getNoteContentById(@RequestBody RequestForNote requestForNote) {
        return noteService.findById(requestForNote.getId(),
                requestForNote.getKeycloakId(), requestForNote.getPassword());
    }

    @GetMapping("/user/{keycloakId}")
    List<Long> getUserNotesIds(@PathVariable String keycloakId) {
        return noteService.findAllNotesOfUser(keycloakId).stream().map(Note::getId).toList();
    }

    @GetMapping("/protected/{id}")
    Boolean checkIfProtected(@PathVariable Long id) {
        return noteService.checkIfProtected(id);
    }

}
