import { ApiProperty } from "@nestjs/swagger";

export class TaskPositionDto {
    @ApiProperty({example: [1, 3, 5, 7], description: 'В массиве желаемый порядок id задач'})
    readonly positions: number[];
}