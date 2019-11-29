import List from './lib/list.js';
import { el, empty } from './lib/helpers.js';


function fetchJSONFile(path, callback) {
  const httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function request() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        const data = JSON.parse(httpRequest.responseText);
        if (callback) callback(data);
      }
    }
  };
  httpRequest.open('GET', path);
  httpRequest.send();
}

function displayJSONData(type) {
  const page = document.querySelector('body');
  const buttonContainer = document.getElementById('buttons');
  const listContainer = document.querySelector('ul');
  fetchJSONFile('lectures.json', (data) => {
    Object.keys(data.lectures).forEach((key) => {
      const buttons = el('button', data.lectures[key].category);
      buttons.setAttribute('id', data.lectures[key].category);
      const element = el('li', el('div', el('img'), el('p', (data.lectures[key].category).toUpperCase()), el('h1', data.lectures[key].title)));
      if (Object.prototype.hasOwnProperty.call(data.lectures[key], 'thumbnail')) {
        element.querySelector('img').setAttribute('src', data.lectures[key].thumbnail);
      }
      if (!document.getElementById(data.lectures[key].category)) {
        buttonContainer.appendChild(buttons);
      }
      if (type === 'css' && (data.lectures[key].category === 'css')) {
        listContainer.appendChild(element);
      } else if (type === 'html' && (data.lectures[key].category === 'html')) {
        listContainer.appendChild(element);
      } else if (type === 'javascript' && (data.lectures[key].category === 'javascript')) {
        listContainer.appendChild(element);
      } else if (type !== 'css' && type !== 'html' && type !== 'javascript') {
        listContainer.appendChild(element);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const listContainer = document.querySelector('ul');
  empty(listContainer);
  displayJSONData();
});

document.addEventListener('click', (e) => {
  const listContainer = document.querySelector('ul');
  const activeFilters = document.getElementsByClassName('active');
  if (e.target && e.target.id === 'css') {
    empty(listContainer);
    e.target.classList.toggle('active');
  }
  if (e.target && e.target.id === 'html') {
    empty(listContainer);
    e.target.classList.toggle('active');
  }
  if (e.target && e.target.id === 'javascript') {
    empty(listContainer);
    e.target.classList.toggle('active');
  }
  if (activeFilters.length >= 1) {
    for (let i = 0; i < activeFilters.length; i += 1) {
      displayJSONData(activeFilters[i].id);
    }
  } else {
    displayJSONData();
  }
});


// SVÆÐI FYRIR FYRIRLESTUR.HTML
