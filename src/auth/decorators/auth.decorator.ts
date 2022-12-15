import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards";

export function Auth() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiResponse({
      status: 401,
      description: "Missing header with authorization token",
    }),
  );
}
