// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

// Implementation of Google Map
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 35.65694851772671, lng: -97.47422897682051 },
    zoom: 16,
styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ],    
  });
}

//Datastore Code:
/** Fetches tasks from the server and adds them to the DOM. */
function loadTasks() {
    fetch('/list-tutors').then(response => response.json()).then((tasks) => {
        const taskListElement = document.getElementById('task-list');
        tasks.forEach((task) => {
            taskListElement.appendChild(createTaskElement(task));
        })
    });
}

function createTaskElement(task) {
    const taskElement = document.createElement('li');
    taskElement.className = 'task';

    const fnameElement = document.createElement('span');
    fnameElement.innerText = task.fname;
    const lnameElement = document.createElement('span');
    lnameElement.innerText = task.lname;
    const mailElement = document.createElement('span');
    mailElement.innerText = task.mail;
    const phoneElement = document.createElement('span');
    phoneElement.innerText = task.phone;
    const zipElement = document.createElement('span');
    zipElement.innerText = task.zip;

    const deleteButtonElement = document.createElement('button');
    deleteButtonElement.innerText = 'Delete';
    deleteButtonElement.addEventListener('click', () => {
        deleteTask(task);

        // Remove the task from the DOM.
        taskElement.remove();
    });

    taskElement.appendChild(fnameElement);
    taskElement.appendChild(lnameElement);
    taskElement.appendChild(mailElement);
    taskElement.appendChild(phoneElement);
    taskElement.appendChild(zipElement);
    taskElement.appendChild(deleteButtonElement);
    return taskElement;
}