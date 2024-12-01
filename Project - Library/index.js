// Book Constructor & Prototype
class Book {
    constructor(title, author, pages, hasRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasRead = hasRead;
        this.id = null;
    }

    info() {
        const hasReadString = this.hasRead ? "has read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${hasReadString}`;
    };

    toggleReadStatus() {
        this.hasRead = !this.hasRead;
    };
}

class Library {
    constructor() {
        this.books = [];
        this.nextId = 1;
    }

    addBook(book) {
        book.id = this.nextId++;
        this.books.push(book);
    }

    removeBook(bookId) {
        this.books = this.books.filter(book => book.id !== Number(bookId));
    }

    getBooks() {
        return this.books;
    }

    findBook(bookId) {
        return this.books.find(book => book.id === Number(bookId));
    }
}

// Instantiate Library
const myLibrary = new Library();



// Prepopulate Library
myLibrary.addBook(new Book("The Hobbit", "J.R.R. Tolkien", 295, false));
myLibrary.addBook(new Book("1984", "George Orwell", 328, true));
myLibrary.addBook(new Book("To Kill a Mockingbird", "Harper Lee", 281, true));
myLibrary.addBook(new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false));

// Display Books
function displayBooks(bookList) {
    const libraryContainer = document.getElementById('library-container');

    libraryContainer.innerHTML = '';

    bookList.forEach((book) => {
        const bookDiv = document.createElement('li');
        bookDiv.classList.add('book');
        bookDiv.setAttribute('data-id', book.id);

        bookDiv.innerHTML = `
            ${book.info()} 
            <button class="toggle-read-btn">Toggle Read Status</button>
            <button class="remove-book-btn">Remove</button>
        `;
        libraryContainer.appendChild(bookDiv);
    });
}


// Remove Book & Toggle Read Buttons
const libraryContainer = document.getElementById('library-container');
libraryContainer.addEventListener('click', (event) => {
    const bookId = event.target.parentElement.getAttribute('data-id');

    if (event.target.classList.contains('toggle-read-btn')) {
        const targetBook = myLibrary.findBook(bookId);
        if (targetBook) {
            targetBook.toggleReadStatus();
        }
    }

    if (event.target.classList.contains('remove-book-btn')) {
        myLibrary.removeBook(bookId);
    }

    displayBooks(myLibrary.getBooks());
})

// Form Actions
const newBookBtn = document.getElementById("new-book-btn");
const bookDialog = document.getElementById("book-dialog");
const newBookSubmit = document.getElementById("new-book-submit");
const cancelBtn = document.getElementById("cancel-btn");
const formInputs = {
    title: document.getElementById("title"),
    author: document.getElementById("author"),
    pages: document.getElementById("pages"),
    hasRead: document.getElementById("has-read"),
}

newBookBtn.addEventListener("click", () => {
    bookDialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    bookDialog.close();
})

newBookSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    
    const title = formInputs.title.value;
    const author = formInputs.author.value;
    const pages = formInputs.pages.value;
    const hasRead = formInputs.hasRead.value;

    myLibrary.addBook(title, author, pages, hasRead);

    bookDialog.close();

    formInputs.title.value = '';
    formInputs.author.value = '';
    formInputs.pages.value = '';
    formInputs.hasRead.value = false;

    displayBooks(myLibrary.getBooks());
})

displayBooks(myLibrary.getBooks());