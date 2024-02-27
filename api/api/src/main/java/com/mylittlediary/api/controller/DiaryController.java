package com.mylittlediary.api.controller;

//Ne pas oublier d'importer la classe Note
import com.mylittlediary.api.model.Note;
import com.mylittlediary.api.service.DiaryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@CrossOrigin(origins = "*")
// @RestController indique à Spring d’insérer le retour de la méthode au format JSON dans le corps de la réponse HTTP. 
// Grâce à cela, les applications qui vont communiquer avec votre API accéderont au résultat de leur 
// requête en parsant la réponse HTTP.
@RestController
public class DiaryController {

    // Il faut injecter une instance de DiaryService. 
    // Cela permettra d’appeler les méthodes pour communiquer avec la base de données.
    @Autowired
    private DiaryService diaryService;

    // signifie que les requêtes HTTP de type GET à l’URL /note exécuteront le code de cette méthode.
    // il s’agit d’appeler la méthode getNotes() du service, ce dernier appellera la méthode findAll()
    //  du repository, et nous obtiendrons ainsi toutes le notes enregistrées en base de données.
    @RequestMapping("/notes")
    public List <Note> getNotes() {
        System.out.println("getNotes");
        return diaryService.getNotes();
    }

    @RequestMapping("/note/{id}")
    // @pathVariable permet de relier la requete à la l'id qui est la clé primaire
    public Note getNote(@PathVariable long id) {
        System.out.println("getNote: " + id);
        return diaryService.getNote(id);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = ("/note/{id}"))
    public void deleteNote(@PathVariable long id) {
        System.out.println("deleteNote");
        diaryService.deleteNote(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = ("/note"))
    public void addNote(@RequestBody Note note) {
        System.out.println("addNote");
        diaryService.addNote(note);
    }

    @RequestMapping(method = RequestMethod.PUT, value = ("/note/{id}"))
    public void updateNote(@RequestBody Note note, @PathVariable long id){
        diaryService.updateNote(note, id);
        System.out.println("updateNote: " + id);
    }
}


