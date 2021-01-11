import UserResponse from '../../database/schema/response/UserResponse'

export const EmailNotValidError: UserResponse = {
	errors: [
		{
			field: 'email',
			message: 'The given email is not a correct email address'
		}
	]
}

export const NoUsernameError: UserResponse = {
	errors: [
		{
			field: 'name',
			message: "Username doesn't exist"
		}
	]
}

export const IncorrectPasswordError: UserResponse = {
	errors: [
		{
			field: 'password',
			message: 'Incorrect Password'
		}
	]
}

export const UserAlreadyExistsError: UserResponse = {
	errors: [
		{
			field: 'name',
			message: 'A user with that name already exists'
		}
	]
}

export const PasswordLengthError: UserResponse = {
	errors: [
		{
			field: 'password',
			message: 'Password length must be greater than 2'
		}
	]
}

export const TokenExpiredError: UserResponse = {
	errors: [
		{
			field: 'token',
			message: 'Token Expired'
		}
	]
}
