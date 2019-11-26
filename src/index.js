import List from './lib/list.js';
import { el } from './lib/helpers.js';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
  const mainContainer = document.getElementById('content');
  fetchJSONFile('lectures.json', (data) => {
    console.log(data);
    const listContainer = document.querySelector('ul');
    Object.keys(data.lectures).forEach((key) => {
      const element = el('li', el('div', el('img'), el('div',data.lectures[key].category), el('div', data.lectures[key].slug)));
      if (data.lectures[key].hasOwnProperty('thumbnail')) {
        element.querySelector('img').setAttribute('src', data.lectures[key].thumbnail);
      }
      listContainer.appendChild(element);
    });
  });
  if (isLecturePage) {

  } else {
    const list = new List();
    list.load();
  }
});

function fetchJSONFile(path, callback) {
  const httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
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

function displayJSONData(data) {
  for (const item in data) {
    console.log(item);
  }
}
