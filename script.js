const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(title, author, pages, read) {
    const newEntry = new Book(title, author, pages, read);    
    myLibrary.push(newEntry);
}

const bookContainer = document.getElementById("bookContainer");

function addRemoveButton() {
    let cardDiv = document.querySelectorAll(".book-card");
    
    cardDiv.forEach((card) => {
        const newButton = document.createElement("button");
        newButton.classList.add("removeBook")
        newButton.classList.add("button")
        newButton.textContent = `Remove Book`;
        card.appendChild(newButton);
      });
}

function addToggleButton() {
    let cardDiv = document.querySelectorAll(".book-card");
    
    cardDiv.forEach((card) => {
        const newButton = document.createElement("button");
        newButton.classList.add("toggleButton")
        newButton.classList.add("button")
        newButton.textContent = `Toggle "read" status`;
        card.appendChild(newButton);
      });
}
        
function libraryLoop() {
    while (bookContainer.firstChild) {
        bookContainer.removeChild(bookContainer.firstChild);
    }
    
    myLibrary.forEach((obj, index) => {
        const card = document.createElement("div");
        card.classList.add("book-card");

        card.setAttribute('data-index', index);

        const title = document.createElement("h2");
        title.textContent = `Title: ${obj.title}`;

        const author = document.createElement("p");
        author.textContent = `Author: ${obj.author}`;

        const pages = document.createElement("p");
        pages.textContent = `Pages: ${obj.pages}`;

        const readStatus = document.createElement("p");
        readStatus.classList.add("read-Status");
        readStatus.textContent = `Read: ${obj.read}`;

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(readStatus);
    
        bookContainer.appendChild(card);
  });
  addToggleButton();
  addRemoveButton();
}

function toggleElementVisibility() {
    const formDivElement = document.getElementById("formDiv");
    
    if (formDivElement.style.display === "none" || formDivElement.style.display === "") {
      formDivElement.style.display = "grid";
    } else {
      formDivElement.style.display = "none";
    }
}
  
const newBook = document.getElementById("newBookButton");

newBook.addEventListener("click", toggleElementVisibility)

const form = document.getElementById("bookForm");

form.addEventListener("submit", function(event) {
    const formData = new FormData(form);

    event.preventDefault();

    const title = formData.get("Title");
    const author = formData.get("Author");
    const pages = formData.get("Pages");
    const readStatus = formData.get("read-status");

    addBookToLibrary(title, author, pages, readStatus);
    libraryLoop();

    form.reset();

    toggleElementVisibility();
});

document.getElementById("bookContainer").addEventListener("click", function (event) {
    const target = event.target;
    if (target.classList.contains("removeBook")) {
        const parent = target.closest('.book-card');
        const dataIndex = parent.getAttribute('data-index');

        myLibrary.splice(dataIndex, 1);
        parent.remove();
    }
});

document.getElementById("bookContainer").addEventListener("click", function (event) {
    const target = event.target;
    if (target.classList.contains("toggleButton")) {
        const parent = target.closest('.book-card');
        const dataIndex = parent.getAttribute('data-index');

        if (myLibrary[dataIndex].read === 'Read it!') {
            myLibrary[dataIndex].read = 'Not yet...';
          } else if (myLibrary[dataIndex].read === 'Not yet...') {
            myLibrary[dataIndex].read = 'Read it!';
          }
          libraryLoop();
          /*parent.querySelector('.read-Status').textContent = myLibrary[dataIndex].read;*/
        }
    });