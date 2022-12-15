import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { NotesService } from "./notes.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { appConstants } from "src/constants";
import {
  ApiParam,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiQuery,
} from "@nestjs/swagger";
import { Auth } from "src/auth/decorators/auth.decorator";
import { EmptyResponseInterceptor } from "src/common/interceptors/empty-response.interceptor";
import { User } from "src/auth/decorators/user.decorator";
import { UserEntity } from "src/users/entities/user.entity";
import { Types } from "mongoose";
import { NotesQuery } from "./dto/notes-query.dto";
import { Note } from "./entities/note.entity";
import { DeleteNoteDto } from "./dto/delete-note.dto";

@Auth()
@ApiTags("notes")
@Controller("api/notes")
@ApiResponse({ status: 404, description: appConstants.notFoundError })
@UseInterceptors(EmptyResponseInterceptor)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  /**
   * енд-поінт на додавання з'їденого продукту у конкретний день
   */
  @ApiCreatedResponse({
    type: Note,
  })
  @Post()
  @ApiResponse({ status: 400, description: appConstants.missingFieldsError })
  create(@User() user: UserEntity, @Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(user._id, createNoteDto);
  }

  /**
   * енд-поінт на отримання всієї інформації щодо конкретного дня
   */
  @ApiOkResponse({
    type: [Note],
  })
  @Get()
  findAll(@User() user: UserEntity, @Query() query: NotesQuery) {
    const date = query.date ? query.date : Date.now();
    return this.notesService.findAll(user._id, date);
  }

  /**
   * енд-поінт для видалення з'їденого продукту в конкретний день
   */
  @ApiOkResponse({
    type: Note,
  })
  @Delete(":id")
  remove(@User() user: UserEntity, @Param("id") deleteNoteDto: DeleteNoteDto) {
    return this.notesService.remove(user._id, deleteNoteDto.id);
  }
}
