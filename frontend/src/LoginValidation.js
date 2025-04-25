function Validation(values) {
    let errors = {};

    // Email patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nsuEmailPattern = /^[^\s@]+@northsouth\.edu$/;

    // Email validation
    if (!values.email.trim()) {
        errors.email = "Email is required";
    } else if (!emailPattern.test(values.email)) {
        errors.email = "Invalid email format";
    } else if (!nsuEmailPattern.test(values.email)) {
        errors.email = "Please use a valid NSU email (e.g., example@northsouth.edu)";
    }

    // Password validation (just checks if it's not empty now)
    if (!values.password.trim()) {
        errors.password = "Password is required";
    }

    return errors; // Return the errors object
}

export default Validation;
