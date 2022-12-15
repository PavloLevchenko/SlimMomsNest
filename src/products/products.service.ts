import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";
import { bool } from "sharp";
import { UserParamsDto } from "src/users/dto/user-params.dto copy";
import { UserEntity } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { ProductQuery } from "./dto/product-query.dto";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private products: Model<Document<Product>>,
    private usersService: UsersService,
  ) {}

  /*
  ФОРМУЛА ДЛЯ РОЗРАХУНКУ ДЕННОЇ НОРМИ КАЛОРІЙ ЖІНКАМ 
  10 * вага + 6.25 * зріст - 5 * вік - 161 - 10 * (вага - бажана вага)
  */
  static kCal(
    currentWeight: number,
    height: number,
    age: number,
    desiredWeight: number,
  ) {
    return (
      10 * currentWeight +
      6.25 * height -
      5 * age -
      161 -
      10 * (currentWeight - desiredWeight)
    );
  }

  async findBadProducts(userParams: UserParamsDto) {
    const { bloodType, currentWeight, height, age, desiredWeight } = userParams;
    const kCal = ProductsService.kCal(
      currentWeight,
      height,
      age,
      desiredWeight,
    );
    const products = await this.products.find({
      groupBloodNotAllowed: bloodType,
    });
    return { kCal, products };
  }

  async findBadProductsAndSaveUserParams(
    user: UserEntity,
    userParams: UserParamsDto,
  ) {
    this.usersService.update(user, userParams);
    return await this.findBadProducts(userParams);
  }

  async findAll({ title, category }: ProductQuery) {
    return await this.products.find({
      $or: [
        { "title.ru": { $regex: "^" + title, $options: "i" } },
        { "title.ua": { $regex: "^" + title, $options: "i" } },
        { categories: { $regex: "^" + category, $options: "i" } },
      ],
    });
  }
}
