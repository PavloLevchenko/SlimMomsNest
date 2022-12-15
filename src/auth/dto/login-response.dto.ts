import { PartialType } from "@nestjs/swagger";
import { UserDto } from "./user.dto";

export class LoginResponseDto extends PartialType(UserDto) {
  token: string;
}
