/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable max-len */

class BookCollection {
  constructor() {
    this.i = 0;
    this.form = document.querySelector('.addBooks');
    this.bookList = document.getElementById('booksList');
    this.submit = document.getElementById('addBooks');
    this.welcome = document.getElementById('hideWelcome');
    this.firstPage = document.querySelector('.section1');
    this.addNewPage = document.querySelector('.section2');
    this.contactPage = document.querySelector('.section3');
    this.list = document.getElementById('list');
    this.addNew = document.getElementById('addNew');
    this.contact = document.getElementById('contact');
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

  addNavEventListeners = () => {
    list.addEventListener('click', () => {
      this.firstPage.classList.remove('hidden');
      this.addNewPage.classList.add('hidden');
      this.contactPage.classList.add('hidden');
      this.welcome.classList.add('hidden');
      this.welcome.classList.add('hidden');
      this.list.style.color = 'blue';
      this.addNew.style.color = 'black';
      this.contact.style.color = 'black';
    });

    this.addNew.addEventListener('click', () => {
      this.addNewPage.classList.remove('hidden');
      this.firstPage.classList.add('hidden');
      this.contactPage.classList.add('hidden');
      this.welcome.classList.add('hidden');
      this.addNew.style.color = 'blue';
      this.list.style.color = 'black';
      this.contact.style.color = 'black';
    });

    this.contact.addEventListener('click', () => {
      this.contactPage.classList.remove('hidden');
      this.firstPage.classList.add('hidden');
      this.addNewPage.classList.add('hidden');
      this.welcome.classList.add('hidden');
      this.contact.style.color = 'blue';
      this.list.style.color = 'black';
      this.addNew.style.color = 'black';
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
    this.addNavEventListeners();
  };
}

const bookCol = new BookCollection();
bookCol.listBooks(bookCol.collection);

const Time = () => {
  const luxonTime = luxon.DateTime.now();
  currentTime.innerHTML = luxonTime.toLocaleString(luxon.DateTime.DATETIME_MED);
};

const myTime = setInterval(Time, 1000);
