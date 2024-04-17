import { Employee } from './employee'
import { File } from './file'
import { Department } from './department'
import { ApiProperty } from '@nestjs/swagger'

export class Company {
	@ApiProperty({ type: String })
	id: string

	@ApiProperty({ type: String })
	name: string

	@ApiProperty({ type: Date })
	createdAt: Date

	@ApiProperty({ type: Date })
	updatedAt: Date

	@ApiProperty({ isArray: true, type: () => Employee })
	employees: Employee[]

	@ApiProperty({ isArray: true, type: () => File })
	files: File[]

	@ApiProperty({ isArray: true, type: () => Department })
	departments: Department[]

	@ApiProperty({ isArray: true, type: String })
	sectors: string[]

	@ApiProperty({ isArray: true, type: String })
	locations: string[]

	@ApiProperty({ type: String })
	telephone: string

	@ApiProperty({ type: String })
	email: string

	@ApiProperty({ type: String })
	website: string

	@ApiProperty({ type: String })
	address: string

	@ApiProperty({ type: String })
	description: string

	@ApiProperty({ type: String })
	representative: string
}
