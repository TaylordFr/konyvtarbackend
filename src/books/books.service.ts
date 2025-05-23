import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BooksService {

  constructor(private db: PrismaService){}

  async create(createBookDto: CreateBookDto) {
      const newBook = await this.db.book.create({
        data: createBookDto
      })

      return newBook
  }

  async findAll() {
      const allBooks = await this.db.book.findMany({
        omit:{
          created_at: true,
          updated_at: true
        }
      });

      return {
        data: allBooks
      }

  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
