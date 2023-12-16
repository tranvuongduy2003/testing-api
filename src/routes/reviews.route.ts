import { Router } from 'express';
import { ReviewController } from '@/controllers/reviews.controller';
import { CreateReviewDto } from '@/dtos/reviews.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AdminCheckMiddleware, AuthMiddleware } from '@/middlewares/auth.middleware';

export class ReviewRoute implements Routes {
  public path = '/reviews';
  public router = Router();
  public review = new ReviewController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id(\\d+)`, this.review.getReviews);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateReviewDto), this.review.createReview);
    this.router.put(`${this.path}/:id(\\d+)`, AuthMiddleware, ValidationMiddleware(CreateReviewDto, true), this.review.updateReview);
    this.router.delete(`${this.path}/:id(\\d+)`, AuthMiddleware, AdminCheckMiddleware, this.review.deleteReview);
  }
}
