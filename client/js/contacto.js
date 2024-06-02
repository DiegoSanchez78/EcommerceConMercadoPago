document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");
    const messageText = document.getElementById("messageText");

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        messageText.textContent = ""; // Limpiar el mensaje anterior

        // Obtener los valores del formulario
        const formData = new FormData(contactForm);
        const name = formData.get("name");
        const email = formData.get("email");
        const message = formData.get("message");

        // Validar los campos
        if (!name || !email || !message) {
            messageText.textContent = "Please fill in all fields.";
            return;
        }

        // Enviar el formulario
        fetch("https://api.emailprovider.com/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                message,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    messageText.textContent = "Message sent successfully!";
                    contactForm.reset();
                } else {
                    messageText.textContent = "Something went wrong. Please try again later.";
                }
            })
            .catch(error => {
                console.error("Error sending message:", error);
                messageText.textContent = "Something went wrong. Please try again later.";
            });
    });
});
