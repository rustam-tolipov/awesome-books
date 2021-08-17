

class BookCollection {
  constructor() {
    this.i = 0;
    this.form = document.querySelector('.addBooks');
    this.bookList = document.getElementById('booksList');
    this.submit = document.getElementById('addBooks');
    this.collection = [];
    window.addEventListener('DOMContentLoaded', this.init);
    this.form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      this.addBooks(ev);
    });
  }

  listBooks = (books) => `
    <li>${books.title}</li>
    <li>${books.author}</li>
    <button type='button' id='${books.id}' class='remove-btn'>Remove</button>`;
  
  setItemFunc = () => {
    localStorage.setItem('BooksList', JSON.stringify(this.collection));
    this.bookList.innerHTML = `${this.collection.map(this.listBooks).join('')}`;
  };
  
  removeBook = (e) => {
    const buttonId = e.target.id;
    this.collection = this.collection.filter((y) => y !== this.collection[this.collection.findIndex((x) => x.id === parseInt(buttonId, 10))]);
    // localStorage.setItem('BooksList', JSON.stringify(books));
    // bookList.innerHTML = `${books.map(listBooks).join('')}`;
    this.setItemFunc();
  };
  
  removeButtonEventListener = () => {
    this.bookList.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-btn')) {
        this.removeBook(e);
      }
    });
  };
  
  addBooks = (e) => {
    e.preventDefault();
    this.i += 1;
    const localBook = {
      id: this.i,
      title: document.getElementById('title').value,
      author: document.getElementById('author').value,
    };
    this.collection.push(localBook);
    // localStorage.setItem('BooksList', JSON.stringify(books));
    // bookList.innerHTML = `${books.map(listBooks).join('')}`;
    this.setItemFunc();
    this.removeButtonEventListener();
    this.form.reset();
  };
  
  getBooks = () => {
    const getData = localStorage.getItem('BooksList');
    const data = JSON.parse(getData);
    if (data) {
      books = data;
    }
    bookList.innerHTML = `${books.map(listBooks).join('')}`;
    this.removeButtonEventListener();
  };

  // ShowListBooks = (arr) => {
  //   const listBook = arr.map((book) => `
  //   <li>${book.title}</li>
  //   <li>${book.author}</li>
  //   <button type='button' id='${book.id}' class='remove-button'>Remove</button>`).join('');
  //   document.getElementById('bookList').innerHTML = listBook;
  // }

  // addBooks() {
  //   i += 1;
  //   const book = {
  //     id: i,
  //     title: document.getElementById('booktitle').value,
  //     author: document.getElementById('authorname').value,
  //   };
  //   this.collection = [...this.collection, book];
  //   localStorage.setItem('bookObject', JSON.stringify(this.collection));
  //   this.ShowListBooks(this.collection);
  //   document.getElementById('bookList').addEventListener('click', (e) => {
  //     if (e.target.classList.contains('remove-button')) {
  //       this.removeBooks(e);
  //     }
  //   });
  //   form.reset();
  // }

  // removeBooks(ev) {
  //   const buttonId = ev.target.id;
  //   this.collection = this.collection.filter(
  //     (y) => y !== this.collection[this.collection.findIndex(
  //       (x) => x.id === parseInt(buttonId, 10),
  //     )],
  //   );
  //   localStorage.setItem('bookObject', JSON.stringify(this.collection));
  //   this.ShowListBooks(this.collection);
  // }

  init = () => {
    const dataGet = localStorage.getItem('BooksList');
    const data = JSON.parse(dataGet);
    if (data) {
      this.collection = data;
    }
    console.log(this.collection);
    this.setItemFunc();
    this.removeButtonEventListener();
  };
}

const bookCol = new BookCollection();
bookCol.listBooks(bookCol.collection);

