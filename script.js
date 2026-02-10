onst fullName = document.querySelector("#full-name");
const email = document.querySelector("#email");
const order = document.querySelector("#order-no");
const code = document.querySelector("#product-code");
const quantity = document.querySelector("#quantity");
const complaintDescription = document.querySelector("#complaint-description");
const solutionDescription = document.querySelector("#solution-description");

const form = document.querySelector("#form");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const orderRegex = /^2024\d{6}$/;
  const codeRegex = /^[a-zA-Z]{2}\d{2}-[a-zA-Z]{1}\d{3}-[a-zA-Z]{2}\d$/;

function validateForm() {
  const checkedComplaints = document.querySelectorAll("input[name='complaint']:checked");
  const selectedSolution = document.querySelectorAll("input[name='solutions']:checked");
  
  const formBool = {
    "full-name": fullName.value.trim(" ") === "" ? false : true,
    "email": emailRegex.test(email.value),
    "order-no": orderRegex.test(order.value),
    "product-code": codeRegex.test(code.value),
    "quantity": quantity.value > 0 || quantity.value === Math.floor(quantity.value) ? true : false,
    "complaints-group": [...checkedComplaints].map(checkbox =>  checkbox.value).length  === 0 ? false : true,
    "solutions-group": [...selectedSolution].map(solution =>solution.value).length === 0 ? false : true,
  }

  if ([...selectedSolution].map(solution => solution.value).includes("other")) {
    formBool["solution-description"] = solutionDescription.value.length < 20 ? false : true;
  } 
  if ([...checkedComplaints].map(checkbox =>  checkbox.value).includes("other")) {
    formBool["complaint-description"] = complaintDescription.value.length < 20 ? false : true;
  }

  return formBool;
}

function isValid(object) {
  for (const item in object) {
    if (object[item]) {
      continue;
    } else {
      return false;
    }
  }  
  return true;
} 

form.addEventListener("submit", (e) => {
  // console.log(validateForm());
  if(isValid(validateForm())) {
    console.log("valid");
  } else {
    console.log("invalid");
  }
  // console.log(isValid(validateForm()));
});

fullName.addEventListener("change", (e) => {
  e.target.value.trim(" ") === "" ? fullName.style.borderColor = "red" : fullName.style.borderColor = "green";
})

email.addEventListener("change", (e) => {
  emailRegex.test(e.target.value) ? email.style.borderColor = "green" : email.style.borderColor = "red";
})

order.addEventListener("change", (e) => {
  orderRegex.test(e.target.value) ? order.style.borderColor = "green" : order.style.borderColor = "red";
})

code.addEventListener("change", (e) => {
  codeRegex.test(e.target.value) ? code.style.borderColor = "green" : code.style.borderColor = "red";
})

quantity.addEventListener("change", (e) => {
  (e.target.value > 0 && Number.isInteger(Number(e.target.value))) ? quantity.style.borderColor = "green" : quantity.style.borderColor = "red";
} )

document.querySelector("#complaints-group").addEventListener("change", (e) => {
  [...document.querySelectorAll("input[name='complaint']:checked")].map(checkbox =>  checkbox.value).length  === 0 ? document.querySelector("#complaints-group").style.borderColor = "red" : document.querySelector("#complaints-group").style.borderColor = "green";
})

document.querySelector("#solutions-group").addEventListener("change", (e) => {
  [...document.querySelectorAll("input[name='solutions']:checked")].map(checkbox =>  checkbox.value).length  === 0 ? document.querySelector("#solutions-group").style.borderColor = "red" : document.querySelector("#solutions-group").style.borderColor = "green";
})

complaintDescription.addEventListener("change", (e) => {
  e.target.value.length < 20 ? complaintDescription.style.borderColor = "red" : complaintDescription.style.borderColor = "green";
});

solutionDescription.addEventListener("change", (e) => {
  e.target.value.length < 20 ? solutionDescription.style.borderColor = "red" : solutionDescription.style.borderColor = "green";
});
