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

  async findAll(sortBy?: string, sortDirection?: 'ASC' | 'DESC', isNew?: boolean, categoryName?: string): Promise<Product[]> {
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    // Adiciona filtro para produtos novos
    if (isNew !== undefined) {
      queryBuilder.andWhere('product.is_new = :isNew', { isNew });
    }

    // Adiciona filtro para a categoria
    if (categoryName) {
      queryBuilder
        .innerJoinAndSelect('product.category', 'category') // Certifique-se de que a relação está correta
        .andWhere('category.name = :categoryName', { categoryName });
    }

    // Adiciona ordenação
    if (sortBy) {
      queryBuilder.orderBy(`product.${sortBy}`, sortDirection || 'ASC');
    }

    return await queryBuilder.getMany(); // Retorna a lista de produtos
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
