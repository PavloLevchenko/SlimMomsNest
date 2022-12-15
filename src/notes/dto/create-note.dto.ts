import { PickType } from "@nestjs/swagger";
import { Note } from "../entities/note.entity";

export class CreateNoteDto extends PickType(Note, [
    "product",
    "date",
    "weight",
  ] as const) {}
