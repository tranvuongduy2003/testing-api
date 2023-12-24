import { Service } from 'typedi';
import { DB } from '@database';
import { CreateCategoriesDto } from '@/dtos/categories.dto';
import { Categories } from '@/interfaces/categories.interface';

@Service()
export class CategoryService {
  public async CreateCategory(dto: CreateCategoriesDto): Promise<Categories> {
    const createCategory: Categories = await DB.Categories.create(dto);
    return createCategory;
  }

  public async FindAllCategory(): Promise<Categories[]> {
    const allCategory: Categories[] = await DB.Categories.findAll();
    return allCategory;
  }
}
