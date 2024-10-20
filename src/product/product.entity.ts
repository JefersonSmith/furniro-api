import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Category } from '../category/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 10 })
  sku: string;

  @ManyToOne(() => Category, category => category.id)
  category: Category;

  @Column({ length: 250 })
  description: string;

  @Column({ length: 500 })
  large_description: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'decimal', nullable: true })
  discount_price: number;

  @Column({ nullable: true })
  discount_percent: number;

  @Column({ nullable: true })
  is_new: boolean;

  @Column({ length: 250, nullable: true })
  image_link: string;

  @Column('text', { array: true, nullable: true }) 
  other_images_link: string[];
  

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;
}
