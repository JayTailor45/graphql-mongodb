import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepo: Repository<Lesson>,
  ) {}

  async getLessons(): Promise<Lesson[]> {
    return this.lessonRepo.find();
  }

  async getLesson(id: string): Promise<Lesson> {
    return this.lessonRepo.findOne({ where: { id } });
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const {name, startDate, endDate} = createLessonInput;
    const lesson = this.lessonRepo.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students: [],
    });
    return this.lessonRepo.save(lesson);
  }

  async assignStudentsToLesson(lessonId: string, studentIds: string[]): Promise<Lesson> {
    const lesson = await this.lessonRepo.findOne({where: {id: lessonId}});
    lesson.students = [...lesson.students, ...studentIds];
    return this.lessonRepo.save(lesson);
  }
}
