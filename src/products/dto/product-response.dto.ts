import { ApiProperty } from "@nestjs/swagger";
import { Product } from "../entities/product.entity";

export class ProductResponseDto {
  @ApiProperty({ example: "3000" })
  kCal: number;
  products: Product[];
}
