//Bauplan für unsere Notiz
class Note {
    title;
    content;
    createdAt;

    /** hilfe um Datentypen zu identifizieren
     * @param {string} title
     * @param {string} content
     * @param {Date} createdAt
     */
    constructor(title, content, createdAt) {
        this.title = title; //den Eigenschaften werden die Parametern aus () zugewiesen, sie stellen dann das neue Objekt
        //dar wenn es erstellt wurde (Erinnerung: Objekt ist eine Ansammlung von Eigenschaften)
        this.content = content;
        this.createdAt = createdAt;
    }
}

/**
 * @param {Note} note
 * @returns {ChildNode}
 */

//Hier wird HTML code dynamisch (=während der Laufzeit) erzeugt, weshalb unsere Funktion 'render' genannt wird
function render(note) //Die Funktion hat als Parameter das Objekt note, weil wir 2 Eigenschaften (date woanders)
// im Objekt note nutzen, um dort unsere Werte abzulegen
{
    //Konstante Variable deklariert (als Referenz) mit einer Methode als Wert, die div Element erzeugt???
    const element = document.createElement('div') //div Element erzeugen
    // im div verschachtelt:
    element.innerHTML = `<div class="container"> 
               <div class="row">
                   <div class="col-md-6">
                       <div class="actions">
                           <button type="button" class="btn btn-default btn-lg save">Save</button>
                           <button type="button" class="btn btn-default btn-lg delete">Delete</button>
                       </div>
                           <div>
                               <input class="title" type="text" name="title" placeholder="Titel" value="${note.title}">
                           </div>
        
                           <div>
                               <textarea class="content" name="content" placeholder="  Content" rows="7">${note.content}</textarea>
                           </div>
                       </div>
                 
               </div>
           </div>`;

    const $title = element.querySelector('.title');
    const $content = element.querySelector('.content')

    //hier selecten wir ein Element und sagen, dass das Programm schauen soll, wann ein spezielles Event (hier der Mausklick)
    //beim Element passiert
    element.querySelector('.save').addEventListener('click', event => {
        //wenn der Mausklick auf den SaveButton eintritt, lösen wir hier ein benutzerdefiniertes Event aus names 'save-note'
        document.dispatchEvent(new CustomEvent('save-note', {
            detail: { // detail: als Eigenschaft, um benutzerdefinierte Daten zu vergeben
                note: note,//???
                changed_title: $title.value, //Eigenschaft mit keyword changend_title bekommt input vom input html-element durch Attribut .value
                changed_content: $content.value,//genau wie bei changed_content
            }
        }));

    });
    return element.firstChild;
}

//eine Ojekt welches die voher definierte Klasse Note sowie Funktion render besitzt, einfach um das Ding im nächste Schritt
//exportieren zu können (wir könnten auch beide Dinge einzeln importieren, was aber bissl aufwändiger wäre)
const NoteComponent = {
    Note,
    render
};

//wir können nur Sachen importieren, die wir zum Export freigegeben haben!
export default NoteComponent;