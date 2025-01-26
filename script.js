document
  .getElementById("contact-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const response = await fetch("http://localhost:3000/submit-contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const result = await response.json();
    const msg = document.getElementById("msg");

    if (result.success) {
      msg.textContent = "Message sent successfully!";
      msg.style.color = "green";
    } else {
      msg.textContent = result.error || "An error occurred.";
      msg.style.color = "red";
    }

    // Clear the form
    document.getElementById("contact-form").reset();
  });
