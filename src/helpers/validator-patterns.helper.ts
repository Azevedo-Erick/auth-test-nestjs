const helpers ={
    password:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    cpf:/^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}/
}
export default helpers;