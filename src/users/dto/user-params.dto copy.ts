import { PickType } from "@nestjs/swagger";
import { UserEntity } from "../entities/user.entity";

export class UserParamsDto extends PickType(UserEntity, [
  "height",
  "age",
  "currentWeight",
  "desiredWeight",
  "bloodType",
] as const) {}
