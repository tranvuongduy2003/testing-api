import { Role } from '@/interfaces/auth.interface';
import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, IsDate, IsOptional, IsBoolean, IsDateString, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  public password: string;

  @IsString()
  @MaxLength(45)
  @IsOptional()
  public fullname: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  public phone: string;

  @IsDateString()
  @IsOptional()
  public dob: Date;

  @IsOptional()
  @IsEnum(Role)
  public role?: Role;
}

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  public oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  public newPassword: string;
}

export class UpdateUserDto {
  @IsString()
  @MaxLength(45)
  @IsOptional()
  public fullname?: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  public phone?: string;

  @IsString()
  @IsOptional()
  public dob?: Date;

  @IsString()
  @IsOptional()
  public avatar?: string;
}
