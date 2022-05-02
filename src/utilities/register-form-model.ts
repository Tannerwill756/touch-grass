export default {
    formId: "registerForm",
    formField: {
        username: {
            name: "username",
            label: "Username:",
            requiredErrorMsg: "Username is required",
        },
        address: {
            name: "address",
            label: "Polygon Adress:",
            requiredErrorMsg: "Polygon Wallet Address is required",
        },
        password: {
            name: "password",
            label: "Password:",
            requiredErrorMsg: "Password is required",
        },
        passwordConfirm: {
            name: "passwordConfirm",
            label: "Confirm Password:",
            requiredErrorMsg: "Passwords must match",
        }
    }
}