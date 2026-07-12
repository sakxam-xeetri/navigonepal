document.addEventListener("DOMContentLoaded", () => {
  // Inject spinner styles dynamically for Formspree loading states
  const spinnerStyle = document.createElement("style");
  spinnerStyle.textContent = `
    .form-spinner {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: #fff;
      animation: form-spin 0.8s linear infinite;
      margin-right: 0.5rem;
      vertical-align: middle;
    }
    @keyframes form-spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(spinnerStyle);

  const formIds = ["volunteerForm", "proposalForm", "joinForm", "internForm"];
  formIds.forEach(id => {
    const form = document.getElementById(id);
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Check validation
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      if (!submitBtn) return;

      const originalBtnHtml = submitBtn.innerHTML;
      
      // Disable button and show spinner
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="form-spinner"></span> Submitting...';

      const formData = new FormData(form);
      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          window.location.href = "thank-you.html";
        } else {
          response.json().then(data => {
            if (data && data.errors) {
              alert("Error: " + data.errors.map(err => err.message).join(", "));
            } else {
              alert("Oops! There was a problem submitting your form. Please try again.");
            }
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHtml;
          });
        }
      })
      .catch(error => {
        alert("Oops! There was a network error. Please check your internet connection and try again.");
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      });
    });
  });
});
