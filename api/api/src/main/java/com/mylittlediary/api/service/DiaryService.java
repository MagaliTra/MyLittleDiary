package com.mylittlediary.api.service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

//Ne pas oublier d'importer la classe Note
import com.mylittlediary.api.model.Note;
import com.mylittlediary.api.repository.DiaryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// pont entre le controller qui receptionne les requête et fournit une rep
//  et le repository qui lui  communique avec la BDD
@Service
public class DiaryService {

    // Il faut injecter une instance de DiaryRepository. 
    @Autowired
    private DiaryRepository diaryRepository;

    //  chaque méthode a pour unique objectif d’appeler une méthode de DiaryRepository.
    public List<Note> getNotes () {
        // retrouve toutes les instances de type Note et tu les ajoutes dans la liste notes et tu retourne la liste
        List<Note>notes = new ArrayList<> ();
        diaryRepository.findAll().forEach(note ->{
            notes.add(note);
        });
        return notes;
    }

    public Note getNote(long id) {
        return diaryRepository.findById(id).orElse(null);
    }

    public void deleteNote(long id) {
        diaryRepository.deleteById(id);
    }

    
    public void addNote (Note note) {
        diaryRepository.save(note);
    }
     

    public void updateNote (Note note, long id) {
        Optional<Note> noteToUpdateOptional = diaryRepository.findById(id);
        if (noteToUpdateOptional.isPresent()) {
            Note noteToUpdate = noteToUpdateOptional.get();

            noteToUpdate.setDate(note.getDate());
            noteToUpdate.setNotaBene(note.getNotaBene());
            noteToUpdate.setNoteText(note.getNoteText());
            noteToUpdate.setPriority(note.getPriority());
            noteToUpdate.setTitle(note.getTitle());
            
            diaryRepository.save(noteToUpdate);
        }
    }
}
