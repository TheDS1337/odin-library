const myLibrary = [];

function Book(title, author, publishingYear, numOfPages)
{
    if( !new.target ) {
        throw Error("This function can only be used as a Book object constructor.");
    }

    this.title = title;
    this.author = author;
    this.publishingYear = publishingYear;
    this.numOfPages = numOfPages;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, publishingYear, numOfPages)
{
    myLibrary.push(new Book(title, author, publishingYear, numOfPages));
}

function displayBooks()
{
    const bodyElement = document.querySelector("body");
    const tableElement = document.createElement("table");

    const tableFirstRow = document.createElement("tr");    

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

    tableElement.appendChild(tableFirstRow);

    for( const book of myLibrary ) {
        const tableRow = document.createElement("tr");    

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

        tableElement.appendChild(tableRow);
    }

    bodyElement.appendChild(tableElement);
}

addBookToLibrary("The C Programming Language (2nd Edition)", "Dennis M. Ritchie, Brian W. Kernighan", 1988, 272);

displayBooks();