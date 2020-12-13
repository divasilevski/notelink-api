import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  // @Get()
  // getAll(@Req() req: Request, @Res() res: Response): string {
  //   return 'Get all!';
  // }
  @Get()
  getAll(): string {
    return 'Get all!';
  }

  @Get(':id')
  getOne(@Param('id') id): string {
    return 'Get One ' + id;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-control', 'none')
  create(@Body() createProductDto: CreateProductDto) {
    return createProductDto.title + ' ' + createProductDto.price;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'Remove' + id;
  }

  @Put(':id') 
  update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string) {
    return id +': ' + updateProductDto.title + ' ' + updateProductDto.price
  }
}
