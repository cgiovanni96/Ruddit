import UserResponse from 'src/database/schema/response/UserResponse'

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
