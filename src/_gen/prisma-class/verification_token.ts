import { ApiProperty } from '@nestjs/swagger'

export class VerificationToken {
	@ApiProperty({ type: String })
	id: string

	@ApiProperty({ type: String })
	identifier: string

	@ApiProperty({ type: String })
	token: string

	@ApiProperty({ type: Date })
	expires: Date

	@ApiProperty({ type: Date })
	createdAt: Date

	@ApiProperty({ type: Date })
	updatedAt: Date
}
