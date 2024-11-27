// Library Array
const myLibrary = [
    new Book("The Hobbit", "J.R.R. Tolkien", 295, false),
    new Book("1984", "George Orwell", 328, true),
    new Book("To Kill a Mockingbird", "Harper Lee", 281, true),
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false)
];

// Book Constructor & Prototype
function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

Book.prototype.info = function() {
    const hasReadString = this.hasRead ? "has read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${hasReadString}`;
}

Book.prototype.toggleReadStatus = function() {
    this.hasRead = !this.hasRead;
}

function addBook(title, author, pages, hasRead) {
    myLibrary.push(new Book(title, author, pages, hasRead));
}

// Display Books
function displayBooks(bookList) {
    const libraryContainer = document.getElementById('library-container');

    libraryContainer.innerHTML = '';

    bookList.forEach((book, index) => {
        const bookDiv = document.createElement('li');
        bookDiv.classList.add('book');
        bookDiv.setAttribute('data-index', index);

        bookDiv.innerHTML = `
            ${book.info()} 
            <button class="toggle-read-btn">Toggle Read Status</button>
            <button class="remove-book-btn">Remove</button>
        `;
        libraryContainer.appendChild(bookDiv);
    });
}


// Remove Book & Toggle Read Buttons
const removeBookBtn = document.getElementById("remove-book-btn");
const libraryContainer = document.getElementById('library-container');
libraryContainer.addEventListener('click', (event) => {
    const bookIndex = event.target.parentElement.getAttribute('data-index');
    const targetBook = myLibrary[bookIndex];

    if (event.target.classList.contains('toggle-read-btn')) {
        targetBook.toggleReadStatus();
    }

    if (event.target.classList.contains('remove-book-btn')) {
        myLibrary.splice(bookIndex, 1);
    }

    displayBooks(myLibrary);
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

    addBook(title, author, pages, hasRead);

    bookDialog.close();

    formInputs.title.value = '';
    formInputs.author.value = '';
    formInputs.pages.value = '';
    formInputs.hasRead.value = false;

    displayBooks(myLibrary);
})

displayBooks(myLibrary);