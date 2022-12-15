import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";

@Injectable()
export class EmptyRequestValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    if (Object.keys(value).length === 0) {
      throw new BadRequestException("Request is empty");
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [Object];
    return !types.includes(metatype);
  }
}
