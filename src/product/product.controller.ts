import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() product: Partial<Product>): Promise<Product> {
    return this.productService.create(product);
  }

  @Get()
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortDirection') sortDirection?: 'ASC' | 'DESC',
    @Query('isNew') isNew?: string,
    @Query('category') category?: string // Espera o ID da categoria
  ): Promise<{ results: number; startIndex: number; endIndex: number; products: Product[] }> {
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10; // Definindo um limite padrão de 10
    const isNewBoolean = isNew ? isNew.toLowerCase() === 'true' : undefined;
    const categoryNumber = category ? parseInt(category) : undefined; // Converte para número

    return this.productService.findAll(pageNumber, limitNumber, sortBy, sortDirection, isNewBoolean, categoryNumber);
  }

  @Get('/:id')
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() product: Partial<Product>): Promise<Product> {
    return this.productService.update(id, product);
  }

  @Delete('/:id')
  delete(@Param('id') id: number): Promise<void> {
    return this.productService.delete(id);
  }
}
