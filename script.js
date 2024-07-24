const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

addBookToLibrary('test book 1', 'test author 1', 100, true);
addBookToLibrary('test book 2', 'test author 2', 100, true);
addBookToLibrary('test book 3', 'test author 3', 300, false);
addBookToLibrary('test book 4', 'test author 4', 400, false);

const bookCards = document.querySelector('.book-cards')

myLibrary.forEach(function addBook(book) {
    const bookCard = document.createElement('div');
    const title = document.createElement('div');
    const author = document.createElement('div')
    const pages = document.createElement('div')
    const read = document.createElement('button')
    const remove = document.createElement('button')
    const readText = readMessage(book.read);

    bookCard.classList.add('book-card');
    title.classList.add('title');
    author.classList.add('author');
    pages.classList.add('pages');
    read.classList.add('toggle-read');
    remove.classList.add('remove');

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = `${book.pages} pages`;
    read.textContent = readText;
    remove.textContent = 'Remove';

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(read);
    bookCard.appendChild(remove);

    bookCards.append(bookCard);
})

function readMessage(status) {
    return status ? 'Read' : 'Not read';
}