import { User } from './user'
import { File } from './file'
import { ApiProperty } from '@nestjs/swagger'

export class Training {
	@ApiProperty({ type: String })
	id: string

	@ApiProperty({ type: String })
	name: string

	@ApiProperty({ type: Date })
	createdAt: Date

	@ApiProperty({ type: Date })
	updatedAt: Date

	@ApiProperty({ type: () => User })
	user: User

	@ApiProperty({ type: String })
	userId: string

	@ApiProperty({ type: Date })
	dateFrom: Date

	@ApiProperty({ type: Date })
	dateTo: Date

	@ApiProperty({ type: String })
	description: string

	@ApiProperty({ isArray: true, type: () => File })
	files: File[]
}
