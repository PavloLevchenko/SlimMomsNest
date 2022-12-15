import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, Document, Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsDate, IsString, IsOptional } from "class-validator";

export type NoteDocument = Note & Document<Note>;

@Schema()
export class Note {
  @ApiProperty({ example: "5d51694802b2373622ff555a" })
  @IsString()
  _id: Types.ObjectId;
  @ApiProperty({ example: "6363e9842268e9c90b6e7903" })
  @Prop({ type: Types.ObjectId, ref: "User" })
  @IsString()
  owner: Types.ObjectId;
  @ApiProperty({ example: "5d51694802b2373622ff5564" })
  @Prop({ type: Types.ObjectId, ref: "Product" })
  @IsString()
  product: Types.ObjectId;
  @Prop({
    type: Date,
    default: Date.now(),
  })
  @ApiProperty({ example: Date.now() })
  @IsOptional()
  @IsDate()
  date: Date;
  @Prop({
    type: Number,
    default: 100,
  })
  @ApiProperty({ example: "100" })
  @IsOptional()
  @IsNumber()
  weight: Number;
}

export const NoteShema = SchemaFactory.createForClass(Note).set(
  "versionKey",
  false,
);
