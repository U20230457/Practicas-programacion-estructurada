const btnNew = document.getElementById('btn')
const appNote = document.getElementById('app')

//cargar notas existentes al cargar la pagina
getNotes().forEach( note => {
    const noteNew = createNote(note.id, note.content)
    appNote.inserBefore(noteNew, btnNew)
});

//crear un elemento de nota con eventos y funcionalidaddes
function createNote(id, content){
    const element = document.createElement('textarea')
    element.classList.add('note')
    element.placeholder = 'crear una nota'
    element.value = content;

    element.addEventListener('dblclick', () => {
        const warning  = confirm('¿Quieres eliminar la nota?')
        if(warning){
            deleteNote(id, element)
        }
    })

    element.addEventListener('input', () => {
        updateNotes(id, element)
    })

    return element
}

function deleteNote(id, element){
    const notes = getNotes().filter((note) => note.id == id)
    saveNote(notes)
    element.remove()
}

function updateNotes(id, element) {
    const notes = getNotes();
    const targetNote = notes.find((note) => note.id === id);
}

function addNote(){
    const notes = getNotes()
    const noteObj = {
        id: Math.floor(Math.random() * 100000),
        content: ''
    }

    const noteNew = createNote(noteObj.id, noteObj.content)
    appNote.insertBefore(noteNew, btnNew)
    notes.push(noteObj)
    saveNote(notes)
}

function saveNote(notes){
    localStorage.setItem('note-app', JSON.stringify(notes))
}

function getNotes(){
    return JSON.parse(localStorage.getItem('note-app') || '[]')
}

btnNew.addEventListener('click', addNote)