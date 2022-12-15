import {
  Controller,
  Get,
  Query,
  Body,
  Patch,
} from "@nestjs/common";
import { HttpCode, Post } from "@nestjs/common/decorators";
import { ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Auth } from "src/auth/decorators/auth.decorator";
import { User } from "src/auth/decorators/user.decorator";
import { EmptyRequestValidationPipe } from "src/common/pipes/empty-body-validation.pipe";
import { appConstants } from "src/constants";
import { UserParamsDto } from "src/users/dto/user-params.dto copy";
import { UserEntity } from "src/users/entities/user.entity";
import { ProductQuery } from "./dto/product-query.dto";
import { ProductResponseDto } from "./dto/product-response.dto";
import { ProductsService } from "./products.service";

@ApiTags("products")
@Controller("api/products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * публічний енд-поінт на отримання денної норми ккал та списку нерекомендованих продуктів
   */
  @HttpCode(200)
  @ApiOkResponse({
    type: ProductResponseDto,
  })
  @Post()
  @ApiResponse({ status: 400, description: appConstants.missingFieldsError })
  findBadProducts(@Body() userParamsDto: UserParamsDto) {
    return this.productsService.findBadProducts(userParamsDto);
  }

  /**
   *  енд-поінт на пошук продуктів з БД по query-рядку
   */
  @Auth()
  @ApiOkResponse({
    type: ProductResponseDto,
  })
  @Get()
  @ApiResponse({ status: 400, description: appConstants.missingFieldsError })
  findAll(@Query(new EmptyRequestValidationPipe()) query: ProductQuery) {
    return this.productsService.findAll(query);
  }

  /**
   * приватний енд-поінт на отримання денної норми ккал та списку нерекомендованих продуктів,
   * записує надану/отриману інформацію у БД
   */
  @Auth()
  @ApiOkResponse({
    type: ProductResponseDto,
  })
  @Patch()
  @ApiResponse({ status: 400, description: appConstants.missingFieldsError })
  update(@User() user: UserEntity, @Body() updateUserParamsDto: UserParamsDto) {
    return this.productsService.findBadProductsAndSaveUserParams(
      user,
      updateUserParamsDto,
    );
  }
}
