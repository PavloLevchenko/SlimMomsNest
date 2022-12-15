import { ApiProperty } from "@nestjs/swagger";
import {
  IsOptional,
  IsString,
} from "class-validator";

export class ProductQuery {
  @ApiProperty({ example: "egg" })
  @IsString()
  @IsOptional() 
  title:string;
  @ApiProperty({ example: "cereals" })
  @IsString()
  @IsOptional() 
  category:string;
}