import Category from '../models/Category';

interface Request {
  title: string;
}

export default class CreateCategoryService {
  public async execute({ title }: Request): Promise<Category> {

  }
}
