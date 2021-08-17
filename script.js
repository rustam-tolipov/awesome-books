let books = [];
let i = 0;

const form = document.querySelector('.addBooks');
const bookList = document.getElementById('booksList');
const submit = document.getElementById('addBooks');

function listBooks(books) {
  return `
    <li>${books.title}</li>
    <li>${books.author}</li>
    <button type='button' id='${books.id}' class='remove-btn'>Remove</button>`;
}

const addBooks = (e) => {
  e.preventDefault();
  i += 1;
  const localBook = {
    id: i,
    title: document.getElementById('title').value,
    author: document.getElementById('author').value,
  };
  books.push(localBook);
  localStorage.setItem('BooksList', JSON.stringify(books));
  bookList.innerHTML = `${books.map(listBooks).join('')}`;
  bookList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      removeBook(e);
    }
  });
  form.reset();
};

const removeBook = (ButtonEvent) => {
  const buttonId = ButtonEvent.target.id;
  books = books.filter((y) => y !== books[books.findIndex((x) => x.id === parseInt(buttonId, 10))]);
  localStorage.setItem('BooksList', JSON.stringify(books));
  bookList.innerHTML = `${books.map(listBooks).join('')}`;
};

const checkLocalStorage = () => {
  const dataGet = localStorage.getItem('BooksList');
  const data = JSON.parse(dataGet);
  if (data) {
    books = data;
    if(books.length > 0){
      i = books[books.length - 1].id;
    }
  }
  bookList.innerHTML = `${books.map(listBooks).join('')}`;
  bookList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      removeBook(e);
    }
  });
};

window.addEventListener('DOMContentLoaded', checkLocalStorage);
submit.addEventListener('submit', addBooks);
