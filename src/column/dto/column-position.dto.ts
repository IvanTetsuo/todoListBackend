import { ApiProperty } from "@nestjs/swagger";

export class ColumnPositionDto {
    @ApiProperty({example: [1, 3, 5, 7], description: 'В массиве желаемый порядок id колонок'})
    readonly positions: number[];
}