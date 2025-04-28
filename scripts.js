const myLibrary = [];

function Book(title, author, numPages, completed) {
  if (!new.target) {
    throw Error("You must use the 'this' operator to call this function");
  }

  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.completed = completed;
  this.id = crypto.randomUUID();
}

Book.prototype.toggleReadStatus = function () {
  this.completed = this.completed === "Yes" ? "No" : "Yes";
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  console.log(`${book.title} has been added to library`);
}

const testBook = new Book("Title", "Author", 55, "Yes");
addBookToLibrary(testBook);

const libraryDisplay = document.createElement("div");

function showBooks() {
  libraryDisplay.textContent = "";
  myLibrary.forEach((book) => {
    const bookDetails = `Title: ${book.title}, Author: ${book.author}, Number of Pages: ${book.numPages}, Completed: ${book.completed}, ID: ${book.id}`;
    const bookElement = document.createElement("div");
    bookElement.textContent = bookDetails;
    bookElement.classList.toggle("books");
    bookElement.setAttribute("data-id", `${book.id}`);

    const bookButton = document.createElement("button");
    bookButton.classList.toggle("removeBook");
    bookButton.textContent = "Remove Book";
    bookButton.setAttribute("data-id", `${book.id}`);

    const readButton = document.createElement("button");
    readButton.classList.toggle("toggleread");
    readButton.textContent = "Toggle Complete Status";
    readButton.setAttribute("data-id", `${book.id}`);

    bookButton.addEventListener("click", () => {
      removeBook(book.id);
    });

    readButton.addEventListener("click", () => {
      toggleRead(book.id);
    })

    libraryDisplay.appendChild(bookElement);
    libraryDisplay.appendChild(bookButton);
    libraryDisplay.appendChild(readButton);

  });

  const libDiv = document.querySelector(".first");
  libDiv.appendChild(libraryDisplay);
}

showBooks();

function removeBook(bookId) {
  const bookIndex = myLibrary.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    myLibrary.splice(bookIndex, 1);
    showBooks();
  }
}

function toggleRead(bookId) {
  const book = myLibrary.find((book) => book.id === bookId);

  if (book) {
    book.toggleReadStatus();
    showBooks();
  }
}

const form = document.getElementById("Form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const bookTitle = document.getElementById("title").value;
  const bookAuthor = document.getElementById("author").value;
  const bookPages = parseInt(document.getElementById("numpages").value);
  const bookComplete = document.getElementById("completed").checked
    ? "Yes"
    : "No";

  addBookToLibrary(new Book(bookTitle, bookAuthor, bookPages, bookComplete));
  showBooks();
});
