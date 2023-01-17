import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector(".feedback-form input"),
  textarea: document.querySelector('.feedback-form textarea'),
};

onReloadCompleteInputs();

refs.form.addEventListener("submit", onFormSubmit);


refs.form.addEventListener('input', throttle(onFormData, 500));


function onFormData(e) {
    formData[e.target.name] = e.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onReloadCompleteInputs (params) {
    const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const email = refs.input;
    const inputMessage = refs.textarea;

    if (savedMessage) {
        email.value = savedMessage.email
        inputMessage.value = savedMessage.message;
    }
}

