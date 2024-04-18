import { Account } from './account'
import { Session } from './session'
import { File } from './file'
import { Employee } from './employee'
import { Department } from './department'
import { Holiday } from './holiday'
import { Training } from './training'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class User {
	@ApiProperty({ type: String })
	id: string

	@ApiPropertyOptional({ type: String })
	name?: string

	@ApiPropertyOptional({ type: String })
	email?: string

	@ApiPropertyOptional({ type: Date })
	emailVerified?: Date

	@ApiPropertyOptional({ type: String })
	image?: string

	@ApiProperty({ type: Date })
	createdAt: Date

	@ApiProperty({ type: Date })
	updatedAt: Date

	@ApiPropertyOptional({ type: String })
	passwordHash?: string

	@ApiProperty({ isArray: true, type: () => Account })
	accounts: Account[]

	@ApiProperty({ isArray: true, type: () => Session })
	sessions: Session[]

	@ApiProperty({ isArray: true, type: () => File })
	files: File[]

	@ApiPropertyOptional({ type: () => Employee })
	employee?: Employee

	@ApiPropertyOptional({ type: () => Department })
	Department?: Department

	@ApiPropertyOptional({ type: String })
	departmentid?: string

	@ApiProperty({ isArray: true, type: () => Holiday })
	HolidaysRequested: Holiday[]

	@ApiProperty({ isArray: true, type: () => Holiday })
	HolidaysApproved: Holiday[]

	@ApiProperty({ isArray: true, type: () => Training })
	Training: Training[]
}
