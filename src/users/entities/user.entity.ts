import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsString,
  IsNumber,
  MinLength,
  IsObject,
  IsArray,
} from "class-validator";
import { hashPassword } from "src/common/helpers";

export type UserDocument = UserEntity & Document<UserEntity>;

@Schema()
export class UserEntity {
  @ApiProperty({ example: "5d51694802b2373622ff553a" })
  @IsString()
  _id: string;
  @Prop({
    type: String,
    required: [true, "User name is required"],
  })
  @ApiProperty({ example: "Nic" })
  @IsString()
  name: string;
  @Prop({
    type: String,
    required: [true, "Email is required"],
    index: true,
    unique: true,
  })
  @ApiProperty({ example: "user@gmail.com" })
  @IsEmail()
  email: string;
  @Prop({
    type: String,
    required: [true, "Password is required"],
  })
  @ApiProperty({ example: "Pas123" })
  @IsString()
  @MinLength(6)
  password: string;
  @Prop({
    type: String,
    default: null,
  })
  @IsString()
  token: string;
  @Prop({ type: String, index: true, unique: true })
  @IsString()
  verificationToken: string;
  @Prop({
    type: Boolean,
    default: true,
  })
  @IsBoolean()
  verify: boolean;
  @Prop({ type: Number })
  @ApiProperty({ example: 150 })
  @IsNumber()
  height: number;
  @Prop({ type: Number })
  @ApiProperty({ example: 18 })
  @IsNumber()
  age: number;
  @Prop({ type: Number })
  @ApiProperty({ example: 60 })
  @IsNumber()
  currentWeight: number;
  @Prop({ type: Number })
  @ApiProperty({ example: 50 })
  @IsNumber()
  desiredWeight: number;
  @Prop({ type: [Boolean] })
  @ApiProperty({ example: [null, true, false, false, false] })
  @IsArray()
  bloodType: boolean[];
  @ApiHideProperty()
  validPassword: Function;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity).set(
  "versionKey",
  false,
);

UserSchema.pre("save", async function save(next) {
  try {
    this.password = await hashPassword(this.password);
    return next();
  } catch (err) {
    return next(err);
  }
});
