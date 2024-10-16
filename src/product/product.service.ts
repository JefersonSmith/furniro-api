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

  findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['category'] });
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
