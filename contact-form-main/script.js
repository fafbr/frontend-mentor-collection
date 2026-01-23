const form = document.getElementById("contactForm");
const successToast = document.getElementById("successToast");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  const textInputs = ["firstName", "lastName", "message"];

  textInputs.forEach((id) => {
    const input = document.getElementById(id);
    const parent = input.closest(".form-control");

    if (input.value.trim() === "") {
      parent.classList.add("error");
      isValid = false;
    } else {
      parent.classList.remove("error");
    }
  });

  const emailInput = document.getElementById("email");
  const emailParent = emailInput.closest(".form-control");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(emailInput.value.trim())) {
    emailParent.classList.add("error");
    isValid = false;
  } else {
    emailParent.classList.remove("error");
  }

  const queryTypeContainer = document.querySelector(".radio-group").closest(".form-control");
  const querySelected = document.querySelector(
    'input[name="queryType"]:checked',
  );

  if (!querySelected) {
    queryTypeContainer.classList.add("error");
    isValid = false;
  } else {
    queryTypeContainer.classList.remove("error");
  }

  const consentInput = document.getElementById("consent");
  const consentParent = consentInput.closest(".form-control");

  if (!consentInput.checked) {
    consentParent.classList.add("error");
  } else {
    consentParent.classList.remove("error");
  }

  if (isValid) {
    successToast.classList.remove("hidden");

    form.reset();

    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      successToast.classList.add("hidden");
    }, 5000);
  }
});
