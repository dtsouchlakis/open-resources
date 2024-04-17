import { User } from './user'
import { Company } from './company'
import { Training } from './training'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class File {
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

	@ApiProperty({ type: String })
	url: string

	@ApiProperty({ type: Number })
	size: number

	@ApiProperty({ type: String })
	type: string

	@ApiPropertyOptional({ type: () => Company })
	Company?: Company

	@ApiPropertyOptional({ type: String })
	companyid?: string

	@ApiPropertyOptional({ type: () => Training })
	Training?: Training

	@ApiPropertyOptional({ type: String })
	trainingid?: string
}
