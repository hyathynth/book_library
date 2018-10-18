const sampleBook = new Book("Bad Blood", "Lizy Holmes", 342, true);
let myLibrary = [sampleBook];

function Book(title, author, pages, read, id=0) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
    this.info = () => {
        var readString = this.read? "Read" : "Not read";
        return '<ul class="book" data-id=' + this.id + '><li><h4>' + title + '</h4></li><li>' + author + '</li><li>' + pages + ' pages</li><li>' + readString + '</li><li><button name="status" class="change">Change Status</button></li><li><button name="remove" class="delete">Delete</button></li></ul>';
    }
    this.toggle = () => {
        return this.read = !this.read;
    }
}

function addBookToLibrary() {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let page = document.getElementById('page').value;
    let read = document.getElementById('read').checked? true:false;
    let id = myLibrary.length;
    let new_book = new Book(title, author, page, read, id);
    myLibrary.push(new_book);
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('page').value = '';
}

function render() {
    var books = '';
    for (var i = 0; i < myLibrary.length; i++) {
        books += myLibrary[i].info();
    }  
    let library = document.getElementById('book_list').innerHTML = books;
}

function remove() {
    let id = event.target.parentNode.parentNode.dataset.id;
    myLibrary.splice(id, 1);
    for (var i = 0; i < myLibrary.length; i++) {
        myLibrary[i].id = i;
    }
}

function toggle() {
    let id = event.target.parentNode.parentNode.dataset.id;
    myLibrary[id].toggle();
}

render();

document.getElementById('add').addEventListener('click', function(event) {
    event.preventDefault();
    addBookToLibrary();
    render();
});

document.addEventListener('click', function(event) {
    if (event.target.className == "delete") {
        remove();
        render();
    }
});

document.addEventListener('click', function(event) {
    if (event.target.className == "change") {
        toggle();
        render();
    }
});
