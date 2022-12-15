import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from "@nestjs/common";
import { map, Observable } from "rxjs";
import { authConstants } from "../../auth/constants";
import { UserDto } from "../../auth/dto/user.dto";

@Injectable()
export class FormatUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<UserDto> {
    return next.handle().pipe(
      map((user) => {
        if (!user) {
          throw new UnauthorizedException(authConstants.userEmptyObjectError);
        }
        return {
          user: {
            name: user.name,
          },
        };
      }),
    );
  }
}
