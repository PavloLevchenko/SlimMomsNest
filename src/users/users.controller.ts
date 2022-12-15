import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  UseInterceptors,
  HttpCode,
} from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { LocalAuthGuard } from "../auth/guards";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entities/user.entity";
import { User } from "src/auth/decorators/user.decorator";
import {
  ApiBody,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiNoContentResponse,
} from "@nestjs/swagger";
import { Auth } from "src/auth/decorators/auth.decorator";
import { LoginDto } from "src/auth/dto/login.dto";
import { UsersService } from "./users.service";
import { appConstants } from "src/constants";
import { EmptyResponseInterceptor } from "src/common/interceptors/empty-response.interceptor";
import { UserDto } from "src/auth/dto/user.dto";
import { userConstants } from "./constants";
import { FormatUserInterceptor } from "./interceptors/format-user.interceptor";

@ApiTags("users")
@UseInterceptors(EmptyResponseInterceptor)
@Controller("api/users")
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  /**
   * Creating new user, sending confirmation email
   */
  @HttpCode(200)
  @ApiOkResponse({
    type: UserDto,
  })
  @ApiResponse({ status: 400, description: appConstants.missingFieldsError })
  @Post("register")
  @UseInterceptors(FormatUserInterceptor)
  async register(@Body() body: CreateUserDto) {
    return await this.usersService.signup(body);
  }

  /**
   * Authenticating user, sending access token
   */
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @ApiResponse({ status: 400, description: appConstants.missingFieldsError })
  @ApiBody({ type: LoginDto })
  @Post("login")
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }

  /**
   * Log out
   */
  @Auth()
  @HttpCode(204)
  @ApiNoContentResponse({ description: userConstants.successLogoutResponse })
  @Get("logout")
  async logout(@User() user: UserEntity) {
    return await this.authService.logout(user);
  }
}
