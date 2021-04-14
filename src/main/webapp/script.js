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

// Implementation of Google Map
let map;

function initMap() {
  const school = { lat: 35.65694851772671, lng: -97.47422897682051 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: school,
    zoom: 16,
  });
  new google.maps.Marker({
    position: school,
    map,
    title: "Hello World!",
  });
  const geocoder = new google.maps.Geocoder();
  document.getElementById("submit").addEventListener("click", () => {
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  const address = document.getElementById("address").value;
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK") {
      resultsMap.setCenter(results[0].geometry.location);
      new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location,
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

//Datastore Code:
/** Fetches tasks from the server and adds them to the DOM. */
function loadTutors() {
    fetch('/list-tutors').then(response => response.json()).then((tasks) => {
        const taskListElement = document.getElementById('task-list');
        tasks.forEach((task) => {
            taskListElement.appendChild(createTaskElement(task));
        })
    });
}

/** Creates an element that represents a task, including its delete button. */
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
    const addressElement = document.createElement('span');
    addressElement.innerText = task.address;

    const deleteButtonElement = document.createElement('button');
    deleteButtonElement.innerText = 'Delete';
    deleteButtonElement.addEventListener('click', () => {
        deleteTutors(task);

        // Remove the task from the DOM.
        taskElement.remove();
    });

    taskElement.appendChild(fnameElement);
    taskElement.appendChild(lnameElement);
    taskElement.appendChild(mailElement);
    taskElement.appendChild(phoneElement);
    taskElement.appendChild(addressElement);
    taskElement.appendChild(deleteButtonElement);
    return taskElement;
}

/** Tells the server to delete the task. */
function deleteTutors(task) {
    const params = new URLSearchParams();
    params.append('id', task.id);
    fetch('/delete-tutors', {method: 'POST', body: params});
}
