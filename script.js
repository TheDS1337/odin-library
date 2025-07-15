let myLibrary = [];

class Book
{
    constructor(title, author, publishingYear, numOfPages, read) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.publishingYear = publishingYear;
        this.numOfPages = numOfPages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

function addBookToLibrary(title, author, publishingYear, numOfPages, read=false)
{
    myLibrary.push(new Book(title, author, publishingYear, numOfPages, read));
}

function displayBooks()
{
    if( myLibrary.length < 1 ) 
        return;

    let tableElement = document.createElement("table");
    let tableFirstRow = document.createElement("tr");    

    let tableHeaderID = document.createElement("th");
    tableHeaderID.textContent = "id";
    tableFirstRow.appendChild(tableHeaderID);

    let tableHeaderTitle = document.createElement("th");
    tableHeaderTitle.textContent = "Title";
    tableFirstRow.appendChild(tableHeaderTitle);

    let tableHeaderAuthor = document.createElement("th");
    tableHeaderAuthor.textContent = "Author";
    tableFirstRow.appendChild(tableHeaderAuthor);

    let tableHeaderPublishingYear = document.createElement("th");
    tableHeaderPublishingYear.textContent = "Publishing year";
    tableFirstRow.appendChild(tableHeaderPublishingYear);

    let tableHeaderNumOfPages = document.createElement("th");
    tableHeaderNumOfPages.textContent = "Number of pages";
    tableFirstRow.appendChild(tableHeaderNumOfPages);

    let tableHeaderRead = document.createElement("th");
    tableHeaderRead.textContent = "Has it been read?";
    tableFirstRow.appendChild(tableHeaderRead);

    tableFirstRow.appendChild(document.createElement("th"));

    tableElement.appendChild(tableFirstRow);

    for( const book of myLibrary ) {
        const tableRow = document.createElement("tr");    

        let tableHeaderID = document.createElement("td");
        tableHeaderID.textContent = book.id;
        tableRow.appendChild(tableHeaderID);

        let tableHeaderName = document.createElement("td");
        tableHeaderName.textContent = book.title;
        tableRow.appendChild(tableHeaderName);

        let tableHeaderAuthor = document.createElement("td");
        tableHeaderAuthor.textContent = book.author;
        tableRow.appendChild(tableHeaderAuthor);

        let tableHeaderPublishingYear = document.createElement("td");
        tableHeaderPublishingYear.textContent = book.publishingYear;
        tableRow.appendChild(tableHeaderPublishingYear);

        let tableHeaderNumOfPages = document.createElement("td");
        tableHeaderNumOfPages.textContent = book.numOfPages;
        tableRow.appendChild(tableHeaderNumOfPages);

        let tableHeaderRead = document.createElement("td");
        let toggleReadButton = document.createElement("button");

        toggleReadButton.id = book.id;
        toggleReadButton.classList.add("toggle-read-button");
        toggleReadButton.textContent = book.read ? "Read" : "Not read";

        toggleReadButton.addEventListener("click", event => {
            myLibrary = myLibrary.map(elm => {
                if( elm.id === event.target.id )
                    elm.toggleRead();
                
                return elm;
            });

            updateBooks();
        });

        tableHeaderRead.appendChild(toggleReadButton);
        tableRow.appendChild(tableHeaderRead);

        let tableHeaderRemove = document.createElement("td");
        let removeButton = document.createElement("button");

        removeButton.id = book.id;
        removeButton.classList.add("remove-button");
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", event => {
            myLibrary = myLibrary.filter(elm => elm.id !== event.target.id);
            updateBooks();
        });

        tableHeaderRemove.appendChild(removeButton);
        tableRow.appendChild(tableHeaderRemove);

        tableElement.appendChild(tableRow);
    }

    bodyElement.insertBefore(tableElement, bodyElement.firstChild);
}

function updateBooks()
{
    // Remove old one in case it exists
    const tableElement = document.querySelector("table");

    if( tableElement !== null )
        tableElement.remove();

    // Recreat the table
    displayBooks();
}

const bodyElement = document.querySelector("body");
const newBookButtonElement = document.querySelector("#new-book-button");
const dialogElement = document.querySelector("#new-book-dialog")
const formElement = document.querySelector("#new-book-dialog > form");
const cancelButtonElement = document.querySelector("#new-book-dialog button[value='cancel']");

newBookButtonElement.addEventListener("click", () => {
    formElement.reset();
    dialogElement.showModal()
});

cancelButtonElement.addEventListener("click", () => {
    dialogElement.close();
    dialogElement.returnValue = "close";
});

dialogElement.addEventListener("close", () => {
    if( dialogElement.returnValue !== 'add' )
        return;

    const formData = new FormData(formElement);
    
    addBookToLibrary(formData.get('title'),
        formData.get('author'),
        formData.get('publishing-year'),
        formData.get('number-of-pages'),
        formData.get('read') === 'true'
    );

    updateBooks();
});