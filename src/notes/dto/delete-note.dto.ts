import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Types } from "mongoose";

export class DeleteNoteDto {
  @ApiProperty({ example: "5d51694802b2373622ff553b" })
  @IsString()
  id: Types.ObjectId;
}