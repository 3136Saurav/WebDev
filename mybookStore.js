//Book Class
class Book{
    constructor(title, author){
        this.title = title
        this.author = author
    }
}

class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));

    }

    static removeBook(title){
        const books = Store.getBooks();
        console.log(title);
        books.forEach((book, index) =>{
            if(book.title === title)
                books.splice(index, 1);
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// UI class
class UI{
    static displayBooks(){
        const books =  Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `<td class="text-white">${book.title}</td>
                         <td class="text-white">${book.author}</td>
                         <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;
        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
            UI.showAlert('Book Deleted Successfully', 'success');
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 1500)
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
    }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.getElementById('book-form').addEventListener('submit', (e) => {
    // e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    if(title === '' || author === ''){
        UI.showAlert('Please fill all fields', 'danger');
    }
    else{
        const book = new Book(title, author);
        UI.addBookToList(book);  
        Store.addBook(book);         
        UI.clearFields();
        UI.showAlert('Book Added Successfully', 'success');
    }
})

document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
})
