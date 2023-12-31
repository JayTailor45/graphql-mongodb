import { Injectable } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { MongoRepository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepo: MongoRepository<Student>,
  ) {}

  async getStudents(): Promise<Student[]> {
    return this.studentRepo.find();
  }

  async getStudent(id: string): Promise<Student> {
    return this.studentRepo.findOne({ where: { id } });
  }

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;
    const student = this.studentRepo.create({
      id: uuid(),
      firstName,
      lastName,
    });
    return this.studentRepo.save(student);
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return this.studentRepo.find({
        where: {
            id: {
                $in: studentIds
            }
        }
    });
  }
}
