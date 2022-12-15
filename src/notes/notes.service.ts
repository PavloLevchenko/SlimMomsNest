import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Schema, Document, Model, Types } from "mongoose";
import { CreateNoteDto } from "./dto/create-note.dto";
import { Note } from "./entities/note.entity";

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name)
    private notes: Model<Document<Note>>,
  ) {}

  async create(owner: string, createNoteDto: CreateNoteDto) {
    return await this.notes.create({
      ...createNoteDto,
      owner,
    });
  }

  async findAll(owner: string, date: number) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    return await this.notes.find({
      owner,
      date: {
        $gte: start,
        $lte: end,
      },
    });
  }

  async remove(owner: string, _id: Types.ObjectId) {
    return await this.notes.findOneAndRemove({ owner, _id });
  }
}
