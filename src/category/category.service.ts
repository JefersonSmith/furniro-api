import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  create(category: Partial<Category>): Promise<Category> {
    return this.categoryRepository.save(category);
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOne({ where: { id } });
  }

  update(id: number, updateCategoryData: Partial<Category>): Promise<Category> {
    return this.categoryRepository.save({ ...updateCategoryData, id });
  }

  delete(id: number): Promise<void> {
    return this.categoryRepository.delete(id).then(() => undefined);
  }
}
