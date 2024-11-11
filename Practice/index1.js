function isValidPhoneNumber(phoneNumber) {
    if (phoneNumber.length !== 10) {
        return false;
    }

    const firstDigit = phoneNumber[0];
    if (firstDigit !== '9' && firstDigit !== '8' && firstDigit !== '7') {
        return false;
    }

    for (let i = 0; i < phoneNumber.length; i++) {
        if (phoneNumber[i] < '0' || phoneNumber[i] > '9') {
            return false;
        }
    }
    return true;
}

// Example usage
const phoneNumber = "9876543210"; // Example phone number

if (isValidPhoneNumber(phoneNumber)) {
    console.log("Valid Phone Number");
} else {
    console.log("Invalid Phone Number");
}
