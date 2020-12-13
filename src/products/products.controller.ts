import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './products.service';

@Controller('products')
export class ProductsController {

  constructor(private readonly productService: ProductService) {

  }

  // @Get()
  // getAll(@Req() req: Request, @Res() res: Response): string {
  //   return 'Get all!';
  // }

  @Get()
  getAll() {
    return this.productService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id): string {
    return this.productService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-control', 'none')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
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
