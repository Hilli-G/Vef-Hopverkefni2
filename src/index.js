//import List from './lib/list';
import { el } from './lib/helpers.js';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  fetchJSONFile('lectures.json',function(data){
    console.log(data);
    var mainContainer = document.getElementById("content");
    mainContainer.innerHTML = JSON.stringify(data);
  })
  if (isLecturePage) {

  } else {
    //const list = new List();
    //list.load();
  }
});

function fetchJSONFile(path, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4) {
          if (httpRequest.status === 200) {
              var data = JSON.parse(httpRequest.responseText);
              if (callback) callback(data);
          }
      }
  };
  httpRequest.open('GET', path);
  httpRequest.send();
}

function displayJSONData(data){
  for (const item in data) {
   console.log(item)
  }
}