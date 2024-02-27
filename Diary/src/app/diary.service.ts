import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

// header des requêtes en post, sans ça les requêtes en post ne marchent pas
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

// la façon la plus simple de déclarer une classe comme étant un service  est d'utiliser de decorateur @injectable
// au décorateur on passe un objet de configuration avec une clé provided in et la valeur root. ça explique a angular
// que le service doit être enregistré à la racine du projet, il n'y aura donc pas d'autres instances de ce service
// en effet cela permet de nous assurer qu'il y aura une seule instance de ce service
// et donc toute l'appli partagera les mêmes données et la même logique
@Injectable({
  providedIn: 'root'
})

export class DiaryService {
  API_URL = "http://localhost:8080"
  ALL_NOTES = "/notes"
  ONE_NOTE = "/note"

  // injection de la classe HttpClient dans la classe via le constructeur pour permettre les requetes Http
  constructor(private HttpClient: HttpClient) { }

  async getNotes() {
    return await lastValueFrom(this.HttpClient.get(this.API_URL + this.ALL_NOTES));
  }

  async getOneNote(id:Number) {
    return await lastValueFrom(this.HttpClient.get(this.API_URL + this.ONE_NOTE + "/" + id));
  }

  async updateNote(title:String, date:any, priority: any, noteText:String, notaBene:String, id:Number) {
    let body = {
      "title": title,
      "date": date,
      "priority": priority,
      "noteText": noteText,
      "notaBene": notaBene
    };
    console.log("body: ", body)
    return await lastValueFrom(this.HttpClient.put(this.API_URL + this.ONE_NOTE + "/" + id, body));
  }

  async deleteNotes(id:Number) {
    return await lastValueFrom(this.HttpClient.delete(this.API_URL + this.ONE_NOTE + "/" + id));
  }

  async sendNotes(title:String, date:any, priority: any, noteText:String, notaBene:String) {
    let body = {
      "title": title,
      "date": date,
      "priority": priority,
      "noteText": noteText,
      "notaBene": notaBene
    };
    return await lastValueFrom(this.HttpClient.post(this.API_URL + this.ONE_NOTE, body, httpOptions));
  }
}
