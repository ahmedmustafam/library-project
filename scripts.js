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

function addBookToLibrary(book) {
  myLibrary.push(book);
  console.log(`${book.title} has been added to library`);
}

// Testing the script

const testBook = new Book("Title", "Author", 55, "Yes");
addBookToLibrary(testBook);

const secondBook = new Book("Second", "Myself", 200, "No");
addBookToLibrary(secondBook);

const libraryDisplay = document.createElement("div");

myLibrary.forEach((book) => {
  const bookDetails = `Title: ${book.title}, Author: ${book.author}, Number of Pages: ${book.numPages}, Completed: ${book.completed}, ID: ${book.id}`;
  const bookElement = document.createElement("p");
  bookElement.textContent = bookDetails;
  libraryDisplay.appendChild(bookElement);
});

document.body.appendChild(libraryDisplay);
