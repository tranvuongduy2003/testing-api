import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CreateReviewDto } from '@/dtos/reviews.dto';
import { Reviews } from '@interfaces/reviews.interface';
import { ReviewService } from '@/services/reviews.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class ReviewController {
  public review = Container.get(ReviewService);

  public getReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = Number(req.params.id);
      const findAllReviewsData = await this.review.findAllReviewsById(productId);

      res.status(200).json({ data: findAllReviewsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createReview = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const reviewData: CreateReviewDto = req.body;
      reviewData.userId = req.user.id;

      const createReviewData = await this.review.createReview(reviewData);
      res.status(201).json({ data: createReviewData, message: 'created' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public updateReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reviewId = Number(req.params.id);
      const reviewData: CreateReviewDto = req.body;
      const updateReviewData: Reviews = await this.review.updateReview(reviewId, reviewData);

      res.status(200).json({ data: updateReviewData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reviewId = Number(req.params.id);
      const deleteReviewData: Reviews = await this.review.deleteReview(reviewId);

      res.status(200).json({ data: deleteReviewData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
