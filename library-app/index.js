let myLibrary = [];
let bookGrid = document.querySelector('#books-grid');

// load any local data 
restoreState();

let storageButton = document.querySelectorAll('#storageButton');
let storageType; 
let newBookButton = document.getElementById('newBookButton');
let newBookForm = document.getElementById('newBookList');
let submitButton = document.getElementById('submit');
let read = document.querySelector('#checkbox');
let inputs = document.querySelectorAll('.styledInput');

let markAsRead = document.querySelectorAll('.read');
let deleteBtns = document.querySelectorAll('.delete');

// Book object
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author; 
    this.pages = pages; 
    this.read = read; 
}

// adds the book object into the myLibrary array
function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
  // do stuff here
}

// Set the storage type
storageButton.forEach((button) => {
    button.addEventListener('click', () => {
        storageType = button.innerHTML;
        console.log(storageType);
        document.getElementById('storageType').remove();
        newBookButton.classList.toggle('hidden');
        bookGrid.style.display = 'block';
    })
})

// Show form to make new book
newBookButton.addEventListener('click', () => {
    newBookForm.classList.toggle('hidden');
})

// Handles book creation and insertion into the DOM 
submitButton.addEventListener('click', (e) => {
    e.preventDefault(); 

    // set up all the fields for book 
    let title = inputs[0].value
    let author = inputs[1].value
    let pages = inputs[2].value
    this.read = read.checked;

    // Create a new book with fields and add it to library
    let book = new Book(title, author, pages, this.read);
    myLibrary.push(book);

    // Clear out the form from DOM 
    clearFormInputs(); 

    // Hide the form 
    newBookForm.classList.toggle('hidden');  

    // get Book HTML and insert into DOM 
    insertBookHTML(book);

    // Add events for the book HTML
    let index = document.querySelectorAll('.bookCards').length-1
    console.log('the index is', index);
    createEvents(document.querySelectorAll('.bookCards')[index], index);
    

})

// Clears the Form after a new books gets created
function clearFormInputs() {
    inputs[0].value = "";
    inputs[1].value = "";
    inputs[2].value = "";
    read.checked = false;
}

// Inserts styled HTML into the DOM 
function insertBookHTML(book) {
    let bookHTML = bookCardHTML(book);
    bookGrid.insertAdjacentHTML('beforeend', bookHTML);
    return bookHTML;
}

// Returns styled HTML card with proper book fields 
function bookCardHTML(book) {
    book.read ? a = true : a = false; 
    return `
    <div class="bookCards" data-index=${myLibrary.length-1}>
        <div class="banner">
            <div class="delete"></div>
        </div>

        <div class="body">
            <span class="title" style="font-family: 'Akaya Telivigala', cursive;">${book.title}<small style="font-weight: 100; font-family: sans-serif;"> <i>by</i> </small> </small>
            <div class="author"> <small>———— ${book.author} </small> </div>

            <span style="font-family: 'Indie Flower', cursive;">${book.pages} ${book.pages == 1 ? "Page" : "Pages"}</span>
        </div>

        <div class="statusContainer">
            Status: <i class="status" style="color: ${book.read ? "rgb(92, 182, 3)" : "rgb(218, 0, 0)"} ; ">${book.read ? "Read" : "Not Read"}</i>
        </div>

        <div class="read" style="border: 1px solid ${a ? "rgb(177, 0, 0)" : "rgb(92, 182, 3)" }; background: ${a ? "linear-gradient(rgba(177, 0, 0,0.4),rgba(177, 0, 0,0.7) 50%, rgba(177, 0, 0) 50%, rgba(177, 0, 0) 100%)" : "linear-gradient(rgba(92, 182, 3,0.4),rgba(92, 182, 3,0.7) 50%, rgba(92, 182, 3) 50%, rgba(92, 182, 3) 100%)" }">
            ${book.read ? "Mark as Unread" : "Mark as Read"}
        </div>
    </div> 
    `
}

// Mark a book as read or unread 
markAsRead.forEach((btn) => {
    btn.addEventListener('click' , () => {
        let parent = btn.parentNode; 
        let status = parent.querySelector('.status')
        let indexOfParent = parent.dataset.index; 
        if (status.innerHTML == 'Read') {
            myLibrary[indexOfParent].read = false;
            status.innerText = 'Not Read';
            status.style.color = 'red';
            btn.innerText = 'Mark as Read';
            btn.style.background = 'linear-gradient(rgba(92, 182, 3,0.4),rgba(92, 182, 3,0.7) 50%, rgba(92, 182, 3) 50%, rgba(92, 182, 3) 100%)';
            btn.style.border = 'solid 1px rgb(92, 182, 3)';
        } else {
            myLibrary[indexOfParent].read = true;
            status.innerText = 'Read';
            status.style.color = 'rgb(92, 182, 3)';
            btn.innerText = 'Mark as Unread';
            btn.style.background = 'linear-gradient(rgba(177, 0, 0,0.4),rgba(177, 0, 0,0.7) 50%, rgba(177, 0, 0) 50%, rgba(177, 0, 0) 100%)';
            btn.style.border = 'solid 1px rgba(177, 0, 0)'
        }
    })
})

// Delete a book
deleteBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        let parent = btn.parentNode.parentNode;
        
        let elementIndex = parent.dataset.index;
        console.log(elementIndex);
        if (elementIndex) {
            console.log(myLibrary.length);
            myLibrary.splice(elementIndex,1);
            console.log(myLibrary.length);
        }
        // remove From DOM
        parent.remove(); 
    })  
})

// Save all books locally on window close event
window.addEventListener('unload', () => {
    if (storageType == 'Local') {
        // {title: 'someting', author: 'something', pages: '', read: ''}
        storeDataLocally(); 
    } else {
        console.log('Cloud Storage is not currently supported.');
    }
})

function storeDataLocally() {
    let currentData = '';

    for (let i = 0; i < myLibrary.length; i++) {
        currentData = currentData + JSON.stringify(myLibrary[i]) + ' '
    }

    localStorage.setItem("books", currentData);
}

function load() {
    let data = localStorage.getItem("books");
    if (data) {
        data = data.replaceAll('{', '');
        data = data.replaceAll('}', '');
        data = data.replaceAll("\"", '');
        data = data.split(' ');
        data.splice(data.length-1, 1);
        for (let i = 0; i < data.length; i++) {
            let fields = data[i].split(',')
            console.log('data', data);
            console.log('data at', data[i]);
            let bookFields = [];
            for (let j = 0; j < fields.length; j++) {
                bookFields.push(fields[j].slice(fields[j].indexOf(':')+1, fields[j].length));
            }
            bookFields[3] == "true" ? boolean = true : boolean = false;
            myLibrary.push(new Book(bookFields[0] ,bookFields[1], parseInt(bookFields[2]), boolean))
        }
        return true;

    } else {
        return false;
    }
}

// Creates events for books that will be added to the DOM 
function createEvents(book, index) {
    console.log(book);
    let deleteBtn = book.querySelector('.delete');
    deleteBtn.addEventListener('click', () => {
        myLibrary.splice(index, 1);
        book.remove(); 
    })


    let markAsRead = book.querySelector('.read');
    markAsRead.addEventListener('click', () => {
        console.log('Book is', book);
        let status = book.querySelector('.status');
        console.log('status is:', status);
        if (status.innerHTML == 'Read') {
            status.innerText = 'Not Read';
            status.style.color = 'red';
            markAsRead.innerText = 'Mark as Read';
            markAsRead.style.background = 'linear-gradient(rgba(92, 182, 3,0.4),rgba(92, 182, 3,0.7) 50%, rgba(92, 182, 3) 50%, rgba(92, 182, 3) 100%)';
            markAsRead.style.border = 'solid 1px rgb(92, 182, 3)';
        } else {
            status.innerText = 'Read';
            status.style.color = 'rgb(92, 182, 3)';
            markAsRead.innerText = 'Mark as Unread';
            markAsRead.style.background = 'linear-gradient(rgba(177, 0, 0,0.4),rgba(177, 0, 0,0.7) 50%, rgba(177, 0, 0) 50%, rgba(177, 0, 0) 100%)';
            markAsRead.style.border = 'solid 1px rgba(177, 0, 0)'
        }
    })
}

// restores state from last session 
function restoreState() {
    if (load()) {
        for (let i = 0; i < myLibrary.length; i++) {
            insertBookHTML(myLibrary[i]);
        }
        return true;
    } else {
        return false;
    }
}

