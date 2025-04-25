function Validation(values) {
    let errors = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nsuEmailPattern = /^[^\s@]+@northsouth\.edu$/;
    const nsuIdPattern = /^\d{7}$/;

    // Name validation
    if (!values.name.trim()) {
        errors.name = "Name is required";
    } else if (values.name.length < 3) {
        errors.name = "Name must be at least 3 characters";
    }

    // NSU ID validation
    if (!values.nsuId) {
        errors.nsuId = "NSU ID is required";
    } else if (!nsuIdPattern.test(values.nsuId)) {
        errors.nsuId = "NSU ID must be exactly 7 digits";
    }

    // Email validation
    if (!values.email) {
        errors.email = "Email is required";
    } else if (!emailPattern.test(values.email)) {
        errors.email = "Invalid email format";
    } else if (!nsuEmailPattern.test(values.email)) {
        errors.email = "Please use your NSU email (example@northsouth.edu)";
    }

    // Password validation
    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }

    return errors;
}

export default Validation;
