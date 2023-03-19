import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');

const FEEDBACK_FORM = 'feedback-form-state';

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

// function onFormInput(evt) {
//   formDataValues[evt.target.name] = evt.target.value;
//   localStorage.setItem(FEEDBACK_FORM, JSON.stringify(formDataValues));
//   console.log(formDataValues);
//   console.log(textarea);
// }

function onFormSubmit(evt) {
  evt.preventDefault();
  const {
    elements: { email, message },
  } = evt.currentTarget;
  if (email.value !== '' && message.value !== '') {
    const formDataValues = { email: email.value, message: message.value };
    console.log(formDataValues);
    localStorage.removeItem(FEEDBACK_FORM);
    evt.currentTarget.reset();
    return;
  }
  alert(`Gotta run away, all bad`);
}

function onFormInput(evt) {
  let saveForm = localStorage.getItem(FEEDBACK_FORM);
  saveForm = saveForm ? JSON.parse(saveForm) : {};
  saveForm[evt.target.name] = evt.target.value;
  localStorage.setItem(FEEDBACK_FORM, JSON.stringify(saveForm));
}

function onUpdatePage() {
  let saveData = localStorage.getItem(FEEDBACK_FORM);
  if (saveData) {
    saveData = JSON.parse(saveData);
    Object.entries(saveData).forEach(([name, data]) => {
      form.elements[name].value = data;
    });
  }
}
onUpdatePage();
