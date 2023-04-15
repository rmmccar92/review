const signupFormHandler = async function (event) {
  event.preventDefault();

  const usernameEl = document.querySelector("#username-input-signup");
  const emailEl = document.querySelector("#email-input-signup");
  const passwordEl = document.querySelector("#password-input-signup");

  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      email: emailEl.value,
      username: usernameEl.value,
      password: passwordEl.value,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/profile");
  } else {
    alert("Failed to sign up");
  }
};

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
