import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsObject,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";

export type ProductDocument = Product & Document<Product>;

@Schema()
export class Product {
  @ApiProperty({ example: "5d51694802b2373622ff553b" })
  @IsString()
  _id: Types.ObjectId;
  @Prop({
    type: [String],
    required: true,
  })
  @ApiProperty({ example: ["Eggs"] })
  @IsArray()
  @ValidateNested({ each: true })
  categories: string[];
  @Prop({
    type: Number,
    default: 100,
    required: true,
  })
  @ApiProperty({ example: 100 })
  @IsNumber()
  weight: number;
  @Prop({
    type: [{ ru: { type: String }, ua: { type: String } }],
    required: true,
  })
  @ApiProperty({
    example: {
      ru: "Яйцо куриное (желток сухой)",
      ua: "Яйце куряче (жовток сухий)",
    },
  })
  @IsObject()
  title: string;
  @Prop({
    type: Number,
    required: true,
  })
  @ApiProperty({ example: 623 })
  @IsNumber()
  calories: number;
  @Prop({
    type: () => Boolean,
    default: null,
  })
  @ApiProperty({ example: [null, true, false, false, false] })
  @IsArray()
  @ValidateNested({ each: true })
  groupBloodNotAllowed: boolean[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
