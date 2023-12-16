import { BrandService } from '@/services/brands.service';
import { Request, Response, NextFunction } from 'express';
import Container from 'typedi';

export class BrandController {
  brandService = Container.get(BrandService);

  public getBrands = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllBrandsData = await this.brandService.getBrands();

      res.status(200).json({ data: findAllBrandsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}
