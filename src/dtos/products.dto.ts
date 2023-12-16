import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public desc: string;

  @IsNumber()
  public price: number;

  @IsNumber()
  public importPrice: number;

  @IsString()
  @IsNotEmpty()
  public brandName: string;

  @IsOptional()
  @IsNumber()
  public categoryId?: number;

  @IsNumber()
  public sold: number;

  @IsString({ each: true })
  public images: string[];

  @IsNumber()
  public inventory: number;
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public desc: string;

  @IsNumber()
  @IsOptional()
  public price: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public brandName: string;

  @IsNumber()
  @IsOptional()
  public categoryId?: number;

  @IsNumber()
  @IsOptional()
  public quantity: number;

  @IsNumber()
  @IsOptional()
  public sold: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  public images: string[];

  @IsNumber()
  public inventory: number;
}
