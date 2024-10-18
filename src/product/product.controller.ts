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
    @Query('sortBy') sortBy?: string, // Adiciona parâmetro de consulta para ordenação
    @Query('sortDirection') sortDirection?: 'ASC' | 'DESC', // Adiciona direção de ordenação
    @Query('isNew') isNew?: string, // Adiciona parâmetro de consulta para produtos novos
    @Query('categoryName') categoryName?: string // Adiciona filtro por nome da categoria
  ): Promise<Product[]> {
    const isNewBoolean = isNew ? isNew.toLowerCase() === 'true' : undefined; // Converte para booleano
    return this.productService.findAll(sortBy, sortDirection, isNewBoolean, categoryName); // Passa o novo parâmetro
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
