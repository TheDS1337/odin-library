const myLibrary = [];

function Book(title, author, publishingYear, numOfPages, read)
{
    if( !new.target ) {
        throw Error("This function can only be used as a Book object constructor.");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.publishingYear = publishingYear;
    this.numOfPages = numOfPages;
    this.read = read;
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
        tableHeaderRead.textContent = book.read ? 'yes' : 'no';
        tableRow.appendChild(tableHeaderRead);

        tableElement.appendChild(tableRow);
    }

    bodyElement.insertBefore(tableElement, bodyElement.firstChild);
}

addBookToLibrary("Crime and Punishment (Russian)", "Fyodor Dostoevsky", 1866, 527);
addBookToLibrary("The C Programming Language (2nd Edition)", "Dennis M. Ritchie, Brian W. Kernighan", 1988, 272, true);

const bodyElement = document.querySelector("body");
const newBookButtonElement = document.querySelector("button");

newBookButtonElement.addEventListener("click", event => {
    console.log("Button clicked!");
});

displayBooks();