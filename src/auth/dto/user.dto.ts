import { PickType } from "@nestjs/swagger";
import { UserEntity } from "src/users/entities/user.entity";

class User extends PickType(UserEntity, ["name"] as const) {}

export class UserDto {
  user: User;
}
