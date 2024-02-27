package com.mylittlediary.api.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

// annotation pour signifier que la classe représente la table. Chaque attribut represente une colonne de la table
@Entity
public class Note {
    // L’attribut id correspond à la clé primaire de la table, et est donc annoté @Id. 
    @Id
    // pour que l’id s'auto-incrémente
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "title", updatable = true)
    private String title;
    @Column(name = "date", updatable = true)
    private String date;
    @Column(name = "priority", updatable = true)
    private String priority;

    @Column(name = "noteText", updatable = true)
    private String noteText;
    @Column(name = "notaBene", updatable = true)
    private String notaBene;
    
    public Note (){
        
    }

    public Note (long id, String title, String date, String priority, String noteText, String notaBene) {
        super();
        this.id = id;
        this.title = title;
        this.date = date;
        this.priority = priority;
        this.noteText = noteText;
        this.notaBene = notaBene;
        
    }

      public long getId () {
        return id;
    }

    public void setId (long id) {
        this.id=id;
    }

    public String getTitle () {
        return title;
    }

    public void setTitle (String title) {
        this.title=title;
    }

    public String getDate () {
        return date;
    }

    public void setDate (String date) {
        this.date=date;
    }

    public String getPriority () {
        return priority;
    }

    public void setPriority (String priority) {
        this.priority=priority;
    }

     public String getNoteText () {
        return noteText;
    }

    public void setNoteText (String noteText) {
        this.noteText=noteText;
    }

     public String getNotaBene () {
        return notaBene;
    }

    public void setNotaBene (String notaBene) {
        this.notaBene=notaBene;
    }

    
}



