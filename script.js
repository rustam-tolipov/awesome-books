/* eslint-disable no-undef */
/* eslint-disable max-len */

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
    <li class="book"><p class="book-title">"${books.title}" by ${books.author}</p> <button id='${books.id}' class="remove-btn btn">Remove</button>`;

  setItemFunc = () => {
    localStorage.setItem('BooksList', JSON.stringify(this.collection));
    this.bookList.innerHTML = `${this.collection.map(this.listBooks).join('')}`;
  };

  removeBook = (e) => {
    const buttonId = e.target.id;
    this.collection = this.collection.filter((y) => y !== this.collection[this.collection.findIndex((x) => x.id === parseInt(buttonId, 10))]);
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

  init = () => {
    const dataGet = localStorage.getItem('BooksList');
    const data = JSON.parse(dataGet);
    if (data) {
      this.collection = data;
    }
    this.setItemFunc();
    this.removeButtonEventListener();
  };
}

const bookCol = new BookCollection();
bookCol.listBooks(bookCol.collection);

const openList = document.querySelector('.first-page');
const listPage = document.getElementById('list');
const openAddNew = document.querySelector('.add-book');
const addNewPage = document.getElementById('addNew');
const openContact = document.querySelector('.contact');
const contactPage = document.getElementById('contact');
const currentTime = document.getElementById('currentTime');

function Time() {
  const luxonTime = luxon.DateTime.now();
  currentTime.innerHTML = luxonTime.toLocaleString(luxon.DateTime.DATETIME_MED);
}
const myTime = setInterval(Time, 1000);

function openMainPage() {
  openList.classList.remove('hidden');
  openList.classList.add('flex');
}

function openAddNewBookPage() {
  openAddNew.classList.add('flex');
  openAddNew.classList.remove('hidden');
}

function openContactPage() {
  openContact.classList.add('flex');
  openContact.classList.remove('hidden');
}

listPage.addEventListener('click', openMainPage);
addNewPage.addEventListener('click', openAddNewBookPage);
contactPage.addEventListener('click', openContactPage);
