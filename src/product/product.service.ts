import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(product: Partial<Product>): Promise<Product> {
    return this.productRepository.save(product);
  }

  async findAll(
    page: number,
    limit: number,
    sortBy?: string,
    sortDirection?: 'ASC' | 'DESC',
    isNew?: boolean,
    categoryId?: number
  ): Promise<{ results: number; startIndex: number; endIndex: number; products: Product[] }> {
    const offset = (page - 1) * limit; // Cálculo para pular registros

    const queryBuilder = this.productRepository.createQueryBuilder('product');

    // Filtra produtos novos (isNew)
    if (isNew !== undefined) {
      queryBuilder.andWhere('product.is_new = :isNew', { isNew });
    }

    // Filtra por ID da categoria
    if (categoryId) {
      queryBuilder
        .innerJoinAndSelect('product.category', 'category')
        .andWhere('category.id = :categoryId', { categoryId });
    }

    // Ordenação
    if (sortBy) {
      queryBuilder.orderBy(`product.${sortBy}`, sortDirection || 'ASC');
    }

    queryBuilder.skip(offset).take(limit); // Aplica a paginação

    const [products, total] = await queryBuilder.getManyAndCount(); // Retorna produtos e total de registros

    const endIndex = Math.min(page * limit, total);
    const startIndex = offset + 1;

    return { results: total, startIndex, endIndex, products };
  }

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id }, relations: ['category'] });
  }

  update(id: number, updateProductData: Partial<Product>): Promise<Product> {
    return this.productRepository.save({ ...updateProductData, id });
  }

  delete(id: number): Promise<void> {
    return this.productRepository.delete(id).then(() => undefined);
  }
}
