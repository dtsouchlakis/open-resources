import { Account as _Account } from './account'
import { Session as _Session } from './session'
import { User as _User } from './user'
import { VerificationToken as _VerificationToken } from './verification_token'
import { File as _File } from './file'
import { Holiday as _Holiday } from './holiday'
import { Training as _Training } from './training'
import { Employee as _Employee } from './employee'
import { Department as _Department } from './department'
import { Company as _Company } from './company'

export namespace PrismaModel {
	export class Account extends _Account {}
	export class Session extends _Session {}
	export class User extends _User {}
	export class VerificationToken extends _VerificationToken {}
	export class File extends _File {}
	export class Holiday extends _Holiday {}
	export class Training extends _Training {}
	export class Employee extends _Employee {}
	export class Department extends _Department {}
	export class Company extends _Company {}

	export const extraModels = [
		Account,
		Session,
		User,
		VerificationToken,
		File,
		Holiday,
		Training,
		Employee,
		Department,
		Company,
	]
}
