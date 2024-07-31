class Library {
    #library = [];

    addBook(_title, _author, _pages, _read) {
        this.#library.push(new Book(_title, _author, _pages, _read));
    }

    removeBook(i) {
        this.#library.splice(i, 1);
    }

    getBooks() {
        return this.#library;
    }

    getBook(index) {
        return this.#library[index];
    }
}

const myLibrary = new Library();

class Book {
    constructor(_title, _author, _pages, _read) {
        this.title = _title;
        this.author = _author;
        this.pages = _pages; 
        this.read = _read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

class Display {
    constructor(library) {
        this.library = library;
        //main dom selectors
        this.bookCards = document.querySelector('.book-cards');
        this.addBook = document.querySelector(".add-book");
        this.dialog = document.querySelector('dialog');
        
        //form dom selectors
        this.cancelButton = document.querySelector('.cancel');
        this.submitButton = document.querySelector('.submit');
        this.titleInput = document.querySelector('#title')
        this.authorInput = document.querySelector('#author')
        this.pagesInput = document.querySelector('#pages')
        this.readInput = document.getElementsByName('readStatus')
        this.form = document.querySelector("form");

        //add main listeners
        this.addBook.addEventListener("click", this.addBookOpen)  
        this.dialog.addEventListener('close', this.closeDialog)
    }

    addBookOpen = () => {
        this.titleInput.value = ''
        this.authorInput.value = ''
        this.pagesInput.value = ''
        this.readInput[0].checked = true;
        this.readInput[1].checked = false;
        this.dialog.showModal(); 
    }

    closeDialog = () => {
        if (this.dialog.returnValue === 'submit') {
            const newTitle = this.form.title.value;
            const newAuthor = this.form.author.value;
            const newPages = this.form.pages.value;
            let newStatus = this.form.readStatus.value;
            if (newStatus === 'false') {
                newStatus = false;
            }
            this.library.addBook(newTitle, newAuthor, newPages, newStatus);
            this.clearBooks();
            this.displayBooks();
        }
    }

    clearBooks = () => {
        let sibling = this.dialog.nextSibling
        while (sibling) {
            this.dialog.nextSibling.remove();
            sibling = this.dialog.nextSibling
        }
    }

    displayBooks = () => {
        this.clearBooks();

        this.library.getBooks().forEach((book, index) => {
            const bookCard = this.createBookCard(book, index);
            this.bookCards.append(bookCard);
        })
    }

    createBookCard = (book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-index-number', index);

        const title = this.createBookElement('div', 'title', book.title);
        const author = this.createBookElement('div', 'author', book.author);
        const pages = this.createBookElement('div', 'pages', book.pages);
        const read = this.createBookElement('button', `toggle-read ${book.read}`, 
        this.readMessage(book.read));
        const remove = this.createBookElement('button', 'remove', 'Remove')

        read.dataset.indexNumber = index;
        remove.dataset.indexNumber = index;

        read.addEventListener('click', this.toggleReadStatus);
        remove.addEventListener('click', this.removeBook);

        bookCard.append(title, author, pages, read, remove);
        return bookCard;
    }

    createBookElement = (elementType, className, textContent) => {
        const element = document.createElement(elementType);
        element.className = className;
        element.textContent = textContent;
        return element;
    }

    readMessage = (status) => {
        return status ? 'Read' : 'Not read';
    }

    toggleReadStatus = (e) => {
        const index = e.target.dataset.indexNumber;
        this.library.getBook(index).toggleRead();
        this.displayBooks();
    }

    removeBook = (e) => {
        const index = e.target.dataset.indexNumber;
        this.library.removeBook(index);
        this.displayBooks();
    }
}

const display = new Display(myLibrary);