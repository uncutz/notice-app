//in der 'app.js' kommen nun note und notelist zusammen
import NoteComponent from "./app/note.js";
import NoteListComponent from "./app/notelist.js";
import Store from "./app/store.js";

const store = new Store();

function App() {

    //Datenteil: Instanziieren eines Objekts mit Anfangswerten
    this.run = async function () {

        const json = await store.getItem('notes');
        let list;
        if (json) {
            list = NoteListComponent.NoteList.fromJSON(json);
        } else {
            list = new NoteListComponent.NoteList();
        }

        const $app = document.body.querySelector('.app'); //Eine Variable in der das HTML Element
        const $notes = $app.querySelector('.notes');
        const $note = $app.querySelector('.note');
        $notes.appendChild(NoteListComponent.render(list));

        document.addEventListener('add-note', addNote);
        document.addEventListener('save-note', function (event) {
            saveNote(event, list);
        });
        document.addEventListener('edit-note', event => {
            $note.innerHTML = '';
            $note.appendChild(NoteComponent.render(event.detail.note));
        });
        document.addEventListener('delete-note', event => {
            list.delete(event.detail.note);
            storeNotes(list);
            renderNoteList();

            $note.innerHTML = '';
        });

        renderNoteList();
    }

    /**
     * @param {NoteList} noteList
     */
    function storeNotes(noteList) {
        store.setItem('notes', noteList.toJSON())
    }

    function renderNoteList() {

        document.dispatchEvent(new CustomEvent('render-note-list'));
    }

    /**
     * @param {NoteComponent.Note[]} notes
     * @returns {NoteList}
     */
    //Erstellen einer Funktion mit Parametername notes, dessen Parameter wird in Funktion NoteList eingesetzt
    function createNoteList(notes) {
        return new NoteListComponent.NoteList(notes);
    }


    /**
     * @param {CustomEvent} event
     * @param {NoteList} noteList
     */
    function saveNote(event, noteList) { //warum event als Parameter???
        event.detail.note.title = event.detail.changed_title;
        event.detail.note.content = event.detail.changed_content;

        storeNotes(noteList);
        renderNoteList();
    }

    /**
     * @param {CustomEvent} event
     */
    function addNote(event) {
        const noteList = event.detail.noteList;
        noteList.notes.push(new NoteComponent.Note('Neu', '', new Date()));

        storeNotes(noteList);
        renderNoteList();
    }
}


export default App;