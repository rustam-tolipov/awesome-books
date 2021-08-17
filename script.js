let books = [];
let i = 0;

const form = document.querySelector('.addBooks');
const bookList = document.getElementById('booksList');
const submit = document.getElementById('addBooks');

const listBooks = (books) => `
    <li>${books.title}</li>
    <li>${books.author}</li>
    <button type='button' id='${books.id}' class='remove-btn'>Remove</button>`;

const setItemFunc = () => {
  localStorage.setItem('BooksList', JSON.stringify(books));
  bookList.innerHTML = `${books.map(listBooks).join('')}`;
};

const removeBook = (e) => {
  const btn = e.target.id;
  books = books.filter((y) => y !== books[books.findIndex((x) => x.id === parseInt(btn, 10))]);
  // localStorage.setItem('BooksList', JSON.stringify(books));
  // bookList.innerHTML = `${books.map(listBooks).join('')}`;
  setItemFunc();
};

const removeBtn = () => {
  bookList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      removeBook(e);
    }
  });
};

const addBooks = (e) => {
  e.preventDefault();
  i += 1;
  const localBook = {
    id: i,
    title: document.getElementById('title').value,
    author: document.getElementById('author').value,
  };
  books.push(localBook);
  // localStorage.setItem('BooksList', JSON.stringify(books));
  // bookList.innerHTML = `${books.map(listBooks).join('')}`;
  setItemFunc();
  removeBtn();
  form.reset();
};

const getBooks = () => {
  const getData = localStorage.getItem('BooksList');
  const data = JSON.parse(getData);
  if (data) {
    books = data;
  }
  bookList.innerHTML = `${books.map(listBooks).join('')}`;
  removeBtn();
};

window.addEventListener('DOMContentLoaded', getBooks);
submit.addEventListener('submit', addBooks);
