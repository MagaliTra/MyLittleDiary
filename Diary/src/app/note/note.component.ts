import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaryService } from '../diary.service';

@Component({
	selector: 'app-note',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './note.component.html',
	styleUrl: './note.component.scss',
	providers: [DiaryService]
})

export class NoteComponent implements OnInit {
	priority!: string;
	isTheFormDisplayed!: boolean;
	createdDate!: Date;
	color!: string;
	urgentTitle! : string
	updateAttempt! : boolean;
	formButtonValue! :String;
	idToUpdate! : Number;
	modificationDate! : Date;
	formTitle!: String;
	temp!:Number;
	src! :string;
	notes : any = null;
	proverb! : string;
	urgentNoteTitle! : string;

	// Pour pouvoir utiliser un service dans un component, il faut utiliser le système d'injection de dépendances 
	// (dependency injection ou DI) que vous fournit Angular.Il faut passer un argument 
	// du type du service au constructor du component, et Angular vous mettra à disposition la bonne instance du service.
	constructor (private diaryService: DiaryService) {}

	async ngOnInit() {
		console.log("oninit")
		this.priority = '';
		this.isTheFormDisplayed = false;
		this.createdDate = new Date();
		this.color = '';
		this.urgentTitle= "";
		this.updateAttempt= false;
		this.formButtonValue= "Register my note";
		this.idToUpdate;
		this.modificationDate = new Date();
		this. formTitle= "My new note";
		this.temp;
		this.src;
		this.proverb;
		this.urgentNoteTitle = "You don't have any urgent note.";

		await this.getAllNotes();
	}

	async deleteClickHandler(noteId: Number) {
		console.log("efsfsfqsfq", noteId )
		await this.diaryService.deleteNotes(noteId);
		// pour refresh la page
		window.location.reload();
	}

	ConvertFahrenheitToCelsius (tempInFahrenheit: number) {
		return ((tempInFahrenheit - 32) * 5/9);
	}

	displayWeatherForecast() {
		let url ='https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Paris?unitGroup=us&key=KZEA3PDEWMX4YP47XCS5RTR5L&contentType=json'
		fetch(url)
		.then(response => response.json())
		.then((data) => {
			let Weather = data;
			//  Math.round() rounds to the nearest integer
			this.temp= Math.round(this.ConvertFahrenheitToCelsius(Weather.currentConditions.temp))
			let weather = document.getElementById("weather");
			let img = document.createElement('img');
			
			if (Weather.currentConditions.icon === 'partly-cloudy-day') {this.src= '../../assets/partly-cloudy-day.png'}
			else if (Weather.currentConditions.icon === 'rain') {this.src= '../../assets/rainy-day.png'}
			else if (Weather.currentConditions.icon === 'snow') {this.src= '../../assets/snowy-day.png'}
			else if (Weather.currentConditions.icon === 'cloudy') {this.src= '../../assets/cloudy-day.png'}
			else {this.src= '../../assets/clear-day.png'};
			img.src=this.src;
			weather?.appendChild(img);
			console.log('weather: ', Weather)
			console.log('icon: ', Weather.currentConditions.icon)
		})
	}

	displayProverbs () {
		//  generates a random integer between 1 and 4 (inclusive).
		let randomNumber = Math.floor(Math.random() * 4) + 1;
		if (randomNumber === 1 ) {this.proverb = 'A journey of a thousand miles begins with a single step.'}
		if (randomNumber === 2 ) {this.proverb = 'A watched pot never boils.'}
		if (randomNumber === 3 ) {this.proverb = 'Fortune favors the bold.'}
		if (randomNumber === 4 ) {this.proverb = 'When the going gets tough, the tough get going.'}
	}

	async update () {
		const priority = document.querySelector('input[name="priority"]:checked')?.id
		const title = document.getElementsByTagName("input")[0].value;
		if (priority === 'urgent' && title== "") {
			alert("You must add a title for urgent priority!"); 
			this.isTheFormDisplayed = true;
			return
		}
		this.updateAttempt= false;
		const noteText = document.getElementsByTagName("textarea")[0].value;
		const notaBene = document.getElementsByTagName("textarea")[1].value;
		let formerNoteRaw = await this.diaryService.getOneNote(this.idToUpdate);
		let formerNote = Object(formerNoteRaw )

		let date = formerNote.date + " - Edited on " + this.modificationDate.toDateString();
		date = date.substring(0,30) + " - Edited on " + this.modificationDate.toDateString();
		console.log("update: ", this.idToUpdate, formerNote.date, date.length)
		await this.diaryService.updateNote(title, date, priority, noteText, notaBene,  this.idToUpdate);

		window.location.reload();
	}

	async updateClickHandler(noteId: Number) {
		this.updateAttempt= true;
		this.formTitle="Edit my note"
		this.idToUpdate=noteId;
		this.formButtonValue="Edit my note"
		this.displayForm();
		let noteRaw = await this.diaryService.getOneNote(noteId);
		let note = Object(noteRaw);
		document.getElementsByTagName("input")[0].value=note.title;
		document.getElementsByTagName("textarea")[0].value=note.noteText;
		document.getElementsByTagName("textarea")[1].value= note.notaBene;

		let priority = note.priority
		if (priority == "normal") { document.getElementsByTagName('input')[1].checked= true; }
		else if (priority == "important") { document.getElementsByTagName('input')[2].checked= true; }
		else if (priority == "urgent") { document.getElementsByTagName('input')[3].checked= true; }
		console.log("updateAttemp:", this.updateAttempt, "noteText:", );
		console.log("console:", note.id, "prority: ", priority)
	}

	cancelUpdate () {
		alert("Modification cancelled!")
		window.location.reload();
	}

	async getAllNotes() {
		// AllNotes correspond au tableau d'objet que me retourne la BBD. pour chaque element de ce tableau
		//  (qui sont des objets), applique la suite du code
		let allNotes = await this.diaryService.getNotes();
		console.log("getAllNotes:", allNotes);
		for (let elmt of Object(allNotes)) {
			let divContainer =  document.createElement('div');
			divContainer.setAttribute("style", "box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; border-radius: 2rem; padding:1rem; margin-top: 1rem")

			let color;
			let priority;
			let title;
			let notaBene;
			let reminderContainer = document.getElementById("reminder");
			let reminder = document.createElement("p");
			reminder.setAttribute("style", "color:crimson")
			if (elmt.priority === "normal"|| !elmt.priority) color ="green";
			if (elmt.priority === "important") color ="orange";
			if (elmt.priority === "urgent") {
				color ="red"; 
				this.urgentNoteTitle = "Your urgent note(s):"
				reminder.innerHTML= '=> ' + elmt.title.toUpperCase();
				reminderContainer?.appendChild(reminder)
			}
			if (elmt.priority=== null) {priority = "Priority: normal"} else {priority= 'Priority: '+  elmt.priority};
			if (elmt.title==='') {title = "Untitled"} else {title=elmt.title};
			if (elmt.notaBene==='') {
				notaBene = ""
			} else {
				notaBene= "Postscriptum: " + elmt.notaBene
			}
			let div= document.createElement('div');
			div.innerHTML = `
			<p style="font-family: monospace; font-weight:bold;">${title.toUpperCase()}</p>
			<p style="font-family: monospace;">${elmt.date}</p>
			<p style="font-family: monospace; text-transform: capitalize; color: ${color}">${priority} </p>
			<p style="font-family:comic">${elmt.noteText}</p>
			<p style="font-family: monospace; color:MediumVioletRed">${notaBene}</p>
			`;
			
			const updateButton = document.createElement('Button');
			updateButton.innerText ="Edit";
			updateButton.setAttribute("style", "font-weight:bold; font-family: monospace; margin-right: 1rem")
			updateButton.addEventListener("click", ()=> { this.updateClickHandler(elmt.id); })
			const deleteButton = document.createElement('Button');
			deleteButton.innerText ="Delete";
			deleteButton.setAttribute("style", "font-weight:bold; font-family: monospace;")
			deleteButton.addEventListener("click", ()=> { this.deleteClickHandler(elmt.id); })
			divContainer.appendChild(div);
			divContainer.appendChild(updateButton);
			divContainer.appendChild(deleteButton);

			let firstChild = document.getElementById('note')?.firstChild;
			document.getElementById('note')?.insertBefore(divContainer, firstChild!);
		}
		this.displayWeatherForecast();
		this.displayProverbs ();
	}


	async sendNote() {
		const title = document.getElementsByTagName("input")[0].value;
		const noteText = document.getElementsByTagName("textarea")[0].value;
		const notaBene = document.getElementsByTagName("textarea")[1].value;
		const date = document.getElementById('date')?.innerText;
		const priority = document.querySelector('input[name="priority"]:checked')?.id

		await this.diaryService.sendNotes(title, date, priority, noteText, notaBene);
		console.log("sendNote:");
	}

	//fonction pour faire apparaître le formulaire en cliquant sur "New note". Vide le form si des champs sont remplis
	displayForm() {
		this.isTheFormDisplayed=true;
		this.clearForm()
	}

	// fonction pour vider le contenu du formulaire avant d'enregitrer une nouvelle note
	clearForm() {
		document.getElementsByTagName("textarea")[0].value = "";
		document.getElementsByTagName("textarea")[1].value= "";
		document.getElementsByTagName("input")[0].value = "";
		document.getElementsByTagName('input')[1].checked= false;
		document.getElementsByTagName('input')[2].checked= false;
		document.getElementsByTagName('input')[3].checked= false;
	}

	setReminder () {
		let reminderContainer = document.getElementById("reminder");
		let reminder = document.createElement("p");
		reminder.innerHTML=this.urgentTitle;
		reminderContainer?.appendChild(reminder);
		reminder?.setAttribute("style", "color:Crimson;");
	}

	//fonction qui alerte le user qu'il n'y a rien a enregistrer et qui ferme le form
	isMainFieldsEmpty() : boolean {
		let textArea0 = document.getElementsByTagName("textarea")[0];
		let textArea1 = document.getElementsByTagName("textarea")[1];
		let Input0 = document.getElementsByTagName("input")[0];
		//s'il n'y a pas de titre (input0), il n'y a pas de note (textarea0) et s'il n'y a pas de PS (textarea1)
		//Envoie une alerte, cache le formulaire et tu retourne true. Sinon retourne false
		if (textArea0.value=="" && textArea1.value=="" && Input0.value==""){
			alert("Nothing to be registered!");
			this.isTheFormDisplayed = false;
			return true ;
		}
		else {
			return false;
		}
	}

	//fonction pour créer une nouvelle note
	async createNote() {
		let isMainFieldsEmpty = this.isMainFieldsEmpty();
		if (isMainFieldsEmpty === true) return;
		let currentDateAndPriority = document.createElement('div');
		currentDateAndPriority.id = 'dateAndPriority';
		let titleContainer = document.createElement('p');
		titleContainer.setAttribute("style", "font-weight:bold; font-family: monospace")
		let title = document.getElementsByTagName("input")[0].value;
		titleContainer.innerHTML = title;

		// Je récupère l'id du boutton radio selectionné
		let radio = document.querySelector('input[name="priority"]:checked')?.id
		if (radio === 'urgent' && title== "") {
			alert("You must add a title for urgent priority!"); 
			this.isTheFormDisplayed = true;
			return
		}

		currentDateAndPriority.innerHTML =
		`<div class="newNote" >
			<p style="font-family: monospace;" id="date";>Registered on ${this.createdDate.toDateString()}</p>
			<p style="font-family: monospace; color: ${this.color}" id="priority"> Priority: ${this.priority} </p>
		</div>`;

		document.getElementById('note')?.appendChild(currentDateAndPriority);

		console.log("do i see  this priority? ", this.priority)
		await this.sendNote();
		window.location.reload();
	}
}