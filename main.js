// @ts-nocheck
"use strict";

document.addEventListener("DOMContentLoaded", initialize);

// Input Fields
const nameField = document.querySelector("#name");
const emailField = document.querySelector("#email");
const phoneField = document.querySelector("#phone");
const messageField = document.querySelector("#message");

const dataContainer = document.querySelector(".data-container");
const getData = document.querySelector("#get-data");
let errors = {};

function initialize() {
  const form = document.querySelector("form");

  form.addEventListener("submit", handleSubmit);
  getData.addEventListener("click", handleClick);
}

// Handle Submit
function handleSubmit(ev) {
  ev.preventDefault();

  validateFields();
  showMessages();
}

// Show error message to the user
function showMessages() {
  if (errors.name) {
    document.querySelector(".name .message-container").textContent =
      errors.name;
  } else {
    document.querySelector(".name .message-container").textContent = "";
  }

  if (errors.email) {
    document.querySelector(".email .message-container").textContent =
      errors.email;
  } else {
    document.querySelector(".email .message-container").textContent = "";
  }

  if (errors.phone) {
    document.querySelector(".phone .message-container").textContent =
      errors.phone;
  } else {
    document.querySelector(".phone .message-container").textContent = "";
  }

  if (errors.message) {
    document.querySelector(".message .message-container").textContent =
      errors.message;
  } else {
    document.querySelector(".message .message-container").textContent = "";
  }
}

// Validation function
function validateFields() {
  const nameValue = nameField.value;
  const emailValue = emailField.value;
  const phoneValue = phoneField.value;
  const messageValue = messageField.value;

  if (nameValue.length === 0) {
    errors.name = "Name field is empty!";
  } else {
    delete errors.name;
  }

  if (emailValue.length === 0) {
    errors.email = "Email field is empty!";
  } else {
    delete errors.email;
  }

  if (phoneValue.length === 0) {
    errors.phone = "Phone field is empty!";
  } else {
    delete errors.phone;
  }

  if (messageValue.length === 0) {
    errors.message = "Message field is empty!";
  } else {
    delete errors.message;
  }
}

// Fetch data from JSONPlaceholder -> TODOs.
async function fetchData(URL) {
  const result = await fetch(URL);
  const data = await result.json();
  console.log(data);
  const output = data
    .map(
      ({ id, title, completed }) =>
        `
        <div class="bg-blue-400 p-6 my-6 border-white rounded">
          <h1 class="text-2xl">Todo ${id}</h1>
          <h2 class="text-3xl">${title}</h2>
          <h3 class="text-xl">Completed: ${completed}</h3>
        </div>
        `
    )
    .join("");

  console.log(output);

  dataContainer.innerHTML = output;
}

function handleClick() {
  fetchData("https://jsonplaceholder.typicode.com/todos?_limit=3");
}
