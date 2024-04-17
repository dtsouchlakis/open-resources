import { User } from './user'
import { Department } from './department'
import { Company } from './company'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class Employee {
	@ApiProperty({ type: String })
	id: string

	@ApiProperty({ type: Date })
	createdAt: Date

	@ApiProperty({ type: Date })
	updatedAt: Date

	@ApiPropertyOptional({ type: () => User })
	user?: User

	@ApiProperty({ type: String })
	email: string

	@ApiProperty({ type: String })
	firstName: string

	@ApiProperty({ type: String })
	lastName: string

	@ApiProperty({ type: Date })
	dateOfBirth: Date

	@ApiPropertyOptional({ type: String })
	gender?: string

	@ApiPropertyOptional({ type: String })
	title?: string

	@ApiProperty({ type: Date })
	hiredAt: Date

	@ApiPropertyOptional({ type: Date })
	lastDayWorkedAt?: Date

	@ApiProperty({ type: String })
	mobile: string

	@ApiPropertyOptional({ type: String })
	phone?: string

	@ApiPropertyOptional({ type: String })
	address?: string

	@ApiPropertyOptional({ type: String })
	positionTitle?: string

	@ApiPropertyOptional({ type: () => Department })
	department?: Department

	@ApiPropertyOptional({ type: String })
	departmentId?: string

	@ApiPropertyOptional({ type: () => Employee })
	manager?: Employee

	@ApiPropertyOptional({ type: String })
	managerId?: string

	@ApiPropertyOptional({ type: String })
	image?: string

	@ApiPropertyOptional({ type: String })
	bio?: string

	@ApiPropertyOptional({ type: Number })
	holidayAllowance?: number

	@ApiPropertyOptional({ type: () => Employee })
	subordinate?: Employee

	@ApiPropertyOptional({ type: String })
	subordinateId?: string

	@ApiPropertyOptional({ type: () => Company })
	Company?: Company

	@ApiPropertyOptional({ type: String })
	companyid?: string

	@ApiPropertyOptional({ type: String })
	userId?: string
}
