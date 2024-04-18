import { User } from './user'
import { Employee } from './employee'
import { Company } from './company'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class Department {
	@ApiProperty({ type: String })
	id: string

	@ApiProperty({ type: String })
	name: string

	@ApiProperty({ type: Date })
	createdAt: Date

	@ApiProperty({ type: Date })
	updatedAt: Date

	@ApiProperty({ isArray: true, type: () => User })
	users: User[]

	@ApiProperty({ isArray: true, type: () => Employee })
	employees: Employee[]

	@ApiPropertyOptional({ type: () => Company })
	Company?: Company

	@ApiPropertyOptional({ type: String })
	companyid?: string
}
