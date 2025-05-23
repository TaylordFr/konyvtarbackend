import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async rent(id: number){
      const selectedBook = await this.db.book.findUnique({
        where: {
          id: id
        }
      })

      if(!selectedBook){
        throw new HttpException("No book found!", HttpStatus.NOT_FOUND)
      }

      const now = new Date(Date.now())
      const oneWeekLater = new Date(now.getTime() + 7 * 24 *60 * 60 * 1000);
      const alreadyRented = await this.db.rental.findFirst({
        where: {
          book_id: id,
          start_date: {
            lte: now
          },
          end_date: {
            gte: now
          }
        }
      })

      console.log(alreadyRented)

      if(alreadyRented){
        throw new HttpException("Book already rented!", HttpStatus.CONFLICT)
      }

      const newRental = await this.db.rental.create({
        data: {
          start_date: now,
          end_date: oneWeekLater,
          book_id: id
        }
      })
      

      console.log("Book rented successfully!")
      return newRental;
  }
}
