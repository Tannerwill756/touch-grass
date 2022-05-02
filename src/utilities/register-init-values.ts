import model from "./register-form-model";

const {
    formField: {
        username,
        address,
        password,
        passwordConfirm
    }
} = model

export default {
    [username.name]: '',
    [address.name]: '',
    [password.name]: '',
    [passwordConfirm.name]: ''
}