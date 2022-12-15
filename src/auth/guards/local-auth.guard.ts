import {
  ExecutionContext,
  Injectable,
  BadRequestException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { validateSync } from "class-validator";
import { plainToInstance } from "class-transformer";
import { LoginDto } from "../dto/login.dto";
import { authConstants } from "../constants";

@Injectable()
export class LocalAuthGuard extends AuthGuard(authConstants.localStrategyName) {
  validateCredentials(body: any) {
    const credentials = plainToInstance(LoginDto, body);
    const errors = validateSync(credentials, {
      validationError: { target: false },
    });
    if (errors.length > 0) {
      throw new BadRequestException(
        errors.map((error) => {
          const msg = error.constraints
            ? Object.values(error.constraints).join(",")
            : "";
          return msg;
        }),
      );
    }
  }

  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ) {
    const request = context.switchToHttp().getRequest();
    this.validateCredentials(request.body);
    return super.handleRequest(err, user, info, context, status);
  }
}
