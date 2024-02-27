package com.mylittlediary.api.repository;
//Ne pas oublier d'importer la classe Note
import com.mylittlediary.api.model.Note;
import org.springframework.data.repository.CrudRepository;

public interface DiaryRepository extends CrudRepository <Note, Long> {
//il prend en parametre la donnée que je veux manipuler et le type de mon id   
}

//  The CrudRepository provides sophisticated CRUD functionality for the entity class that is being managed.
// CrudRepository est une interface fournie par Spring. Elle fournit des méthodes pour manipuler notre entité.
// Ainsi, on peut utiliser les méthodes définies par l’interface CrudRepository (deleteById(ID id), findAll(), etc).
// @Repository est une annotation Spring pour indiquer que la classe est un bean, 
// et que son rôle est de communiquer avec une source de données (en l'occurrence la base de données).

// L'interface ne contient pas de code:C’est là toute la puissance du composant Spring Data JPA !
//  Il nous permet d’exécuter des requêtes SQL, sans avoir besoin de les écrire.
//  L'interface fait une requête à la base de données, 
// et le résultat nous est retourné sous forme d’instance de la classe (en l'occurence ici la classe Note)
//  l'interface se servira de notre classe entité.