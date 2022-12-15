import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class NotesQuery {
  @ApiProperty({ example: Date.now() })
  @IsNumber()
  @IsOptional()
  date: number;
}