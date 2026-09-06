const form = document.getElementById('inquiry-form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Remove previous validation errors
    clearValidationErrors();

    let isValid = true;
    let firstInvalidField = null;

    // Get all required fields
    const requiredFields = form.querySelectorAll(
        'input[required], select[required], textarea[required]'
    );

    requiredFields.forEach((field) => {

        // Trim text values
        const value = field.value.trim();

        if (value === '') {
            showError(field, 'This field is required.');

            isValid = false;

            if (!firstInvalidField) {
                firstInvalidField = field;
            }
        }
    });


    // Email validation
    const emailField = form.querySelector('input[type="email"]');

    if (emailField && emailField.value.trim() !== '') {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailField.value.trim())) {

            showError(
                emailField,
                'Please enter a valid email address.'
            );

            isValid = false;

            if (!firstInvalidField) {
                firstInvalidField = emailField;
            }
        }
    }


    // Phone validation
    const phoneField = form.querySelector(
        'input[type="tel"], input[name="phone"]'
    );

    if (phoneField && phoneField.value.trim() !== '') {

        // Allows +, spaces, -, brackets and numbers
        const phonePattern =
            /^[+]?[0-9\s\-()]{7,20}$/;

        if (!phonePattern.test(phoneField.value.trim())) {

            showError(
                phoneField,
                'Please enter a valid phone number.'
            );

            isValid = false;

            if (!firstInvalidField) {
                firstInvalidField = phoneField;
            }
        }
    }


    // If validation failed
    if (!isValid) {

        if (firstInvalidField) {
            firstInvalidField.focus();
        }

        return;
    }


    // =========================================
    // FORM IS VALID - SUBMIT TO WEB3FORMS
    // =========================================

    const formData = new FormData(form);

    // If access_key is not already present in your HTML,
    // uncomment the following line and add your key.
    //
    // formData.append(
    //     "access_key",
    //     "YOUR_ACCESS_KEY"
    // );


    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;


    try {

        const response = await fetch(
            "https://api.web3forms.com/submit",
            {
                method: "POST",
                body: formData
            }
        );


        const data = await response.json();


        if (response.ok) {

            alert(
                "Success! Thank you for your interest in doing business with us. We truly appreciate your enquiry and will get in touch with you shortly."
            );

            form.reset();

            clearValidationErrors();

        } else {

            alert(
                "Error: " + data.message
            );
        }


    } catch (error) {

        console.error(error);

        alert(
            "Something went wrong. Please check all the text fields and submit again."
        );


    } finally {

        submitBtn.textContent = originalText;

        submitBtn.disabled = false;

    }

});


// =========================================
// SHOW VALIDATION ERROR
// =========================================

function showError(field, message) {

    field.classList.add('input-error');


    // Create error message
    const errorElement = document.createElement('div');

    errorElement.className = 'validation-error';

    errorElement.textContent = message;


    // Insert error after field
    field.parentNode.appendChild(errorElement);
}


// =========================================
// CLEAR VALIDATION ERRORS
// =========================================

function clearValidationErrors() {

    // Remove error class
    const errorFields =
        form.querySelectorAll('.input-error');

    errorFields.forEach((field) => {
        field.classList.remove('input-error');
    });


    // Remove error messages
    const errorMessages =
        form.querySelectorAll('.validation-error');

    errorMessages.forEach((error) => {
        error.remove();
    });
}