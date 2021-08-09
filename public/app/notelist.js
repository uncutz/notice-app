//Klasse NoteList wird erstellt für die Liste von Notizen die wir auf unserer Website abbilden wollen
import NoteComponent from "./note.js";

class NoteList {

    /**
     * @param {NoteComponent.Note[]} notes
     */

    //ach ja... eine Klasse hat immer immer immer einen Konstruktor
    //hier ist die Methode zum konstruieren eines Array-Elements (Platz in der Liste) notes für unsere Array Liste
    constructor(notes = []) {
        /**
         * @type {NoteComponent.Note[]}
         */
        this.notes = notes // das Array-Element hat eine Eigenschaft notes, die mit den Eigenschaften des Parameters Notes gefüllt wird???
    }

    /**
     * @param {NoteComponent.Note} note
     */
    delete(note)
    {
        const index = this.notes.indexOf(note);

        this.notes.splice(index, 1);
    }

    toJSON()
    {
        const list = [];

        for(let i = 0; i < this.notes.length; i++)
        {
            /**
             * @type {Note}
             */
            const note = this.notes[i];

            list.push({
                title: note.title,
                content: note.content,
                created_at: note.createdAt.toISOString()
            });
        }

        return JSON.stringify(list);
    }

    /**
     * @param {string} json
     * @return {NoteList}
     */
    static fromJSON(json){
        const list = JSON.parse(json);

        const noteList = new NoteList();
        for(let i = 0; i < list.length; i++)
        {
            const record = list[i];

            noteList.notes.push(
                new NoteComponent.Note(
                    record.title,
                    record.content,
                    new Date(record.created_at)
                )
            );
        }

        return noteList;
    }
}









/**
 * @param {NoteList} noteList
 * @returns {ChildNode}
 */

//html code wird dynamisch erzeugt
function render(noteList) {

    const element = document.createElement('div');
    element.innerHTML = `<div class="container">
                            <div class="row bar ml-5 mr-5">
                                <div class="col-8 actions">
                                    <button type="button" class="btn btn-sm btn-default add">add</button>
                                </div>
                                <div class="col-4">
                                    <p class="titel">Notice<span class="title-it">It</span></p>                   
                               </div>
                               </div>
                               <div class="row"></div>
                                    <ul class="list"></ul>
                               </div>
                            </div>`;
    //map???

    const list = element.querySelector('.list');
    document.addEventListener('render-note-list', function () { //Funktion
        list.innerHTML = ''; //???

        for(let i=0; i < noteList.notes.length; i++)
        {
            const note = noteList.notes[i];
            list.appendChild(renderNote(note));
        }
    });

    element.querySelector('.add').addEventListener('click', function () {
        document.dispatchEvent(new CustomEvent('add-note', {
            detail: {//benutzerdefinierte Daten/Infos zum Eventtrigger hinzufügen, also was passiert da?
                noteList: noteList//???
            }
        }));
    })

    return element.firstChild; //Pseudo Element

}

/**
 * @param {Note} note
 * @returns {ChildNode}
 */
function renderNote(note) {

    const element = document.createElement('div');
    element.innerHTML = `<li class="note">
                <span class="title">${note.title}</span>
                <span class="actions">
                    <button class="btn btn-sm btn-default edit">edit</button>
                    <button class="btn btn-sm btn-default delete">delete</button>
                </span>
            </li>`;

    element.querySelector('.edit').addEventListener('click', function (){
        document.dispatchEvent(new CustomEvent('edit-note', {
            detail: {//benutzerdefinierte Daten/Infos zum Eventtrigger hinzufügen, also was passiert da?
                note: note//???
            }
        }));
    });

    element.querySelector('.delete').addEventListener('click', function (){
        document.dispatchEvent(new CustomEvent('delete-note', {
            detail: {//benutzerdefinierte Daten/Infos zum Eventtrigger hinzufügen, also was passiert da?
                note: note//???
            }
        }));
    });

    return element.firstChild;
}

const NoteListComponent = {
    render,
    NoteList,
};

export default NoteListComponent;

