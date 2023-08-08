import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(Student) private studentRepo: Repository<Student>,
    ) {}

    async createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
        const {firstName, lastName} = createStudentInput;
        const student = this.studentRepo.create({
            id: uuid(),
            firstName,
            lastName,
        });
        return this.studentRepo.save(student);
    }
}
