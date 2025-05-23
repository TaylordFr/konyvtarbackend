import { IsNotEmpty, IsNumber, IsPositive, Min, IsInt } from "class-validator"

export class CreateBookDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  author: string
  
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  @IsInt()
  publish_year: number
  
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  @Min(1)
  page_count: number  
  
}
