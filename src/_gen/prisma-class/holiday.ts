import { User } from './user'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class Holiday {
	@ApiProperty({ type: String })
	id: string

	@ApiProperty({ type: Date })
	createdAt: Date

	@ApiProperty({ type: Date })
	updatedAt: Date

	@ApiProperty({ type: () => User })
	requestedByUser: User

	@ApiProperty({ type: String })
	requestedByUserId: string

	@ApiProperty({ type: Date })
	dateFrom: Date

	@ApiProperty({ type: Date })
	dateTo: Date

	@ApiProperty({ type: Number })
	days: number

	@ApiProperty({ type: Date })
	requestedAt: Date

	@ApiPropertyOptional({ type: Date })
	approvedAt?: Date

	@ApiPropertyOptional({ type: () => User })
	approvedByUser?: User

	@ApiPropertyOptional({ type: String })
	approvedByUserId?: string

	@ApiPropertyOptional({ type: String })
	description?: string
}
