import { Controller, Get, HttpCode } from "@nestjs/common";
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  MongooseHealthIndicator,
} from "@nestjs/terminus";

import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { appConstants } from "src/constants";

@ApiTags("app")
@Controller()
export class AppController {
  constructor(
    private healthCheck: HealthCheckService,
    private mongooseHealth: MongooseHealthIndicator,
  ) {}

  /**
   * Health Checks
   */

  @HttpCode(200)
  @ApiOkResponse({ description: appConstants.healthPathDescription })
  @Get("/healthz")
  async healthz(): Promise<HealthCheckResult> {
    return this.healthCheck.check([
      () => this.mongooseHealth.pingCheck("mongoDB"),
    ]);
  }
}
