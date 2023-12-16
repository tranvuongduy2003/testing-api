import { Service } from 'typedi';
import { DB } from '@database';
import { CreateReviewDto } from '@/dtos/reviews.dto';
import { HttpException } from '@/exceptions/httpException';
import { Reviews } from '@interfaces/reviews.interface';

@Service()
export class ReviewService {
  public async findAllReviews(): Promise<Reviews[]> {
    const allReviews: Reviews[] = await DB.Reviews.findAll();
    return allReviews;
  }

  public async findAllReviewsById(productId: number) {
    const findAllReviewsId: Reviews[] = await DB.Reviews.findAll({
      where: {
        productId: productId,
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: DB.User,
          attributes: ['fullname', 'avatar'],
        },
      ],
    });

    const ratingPoint = await DB.Reviews.findAll({
      attributes: [
        [DB.Sequelize.fn('floor', DB.Sequelize.col('rating')), 'level'],
        [
          DB.Sequelize.literal(`round(
          count(*) / 
          (select count(*) from reviews r2 where r2.product_id = ${productId})
          ,2)`),
          'percents',
        ],
      ],

      where: {
        productId: productId,
      },
      group: ['level'],
    });

    if (!findAllReviewsId) throw new HttpException(409, "Id doesn't exist");
    return {
      ratingPoint,
      reviews: findAllReviewsId,
    };
  }

  public async createReview(reviewData: CreateReviewDto) {
    await DB.Reviews.create(reviewData);
    const allProductReviews = await this.findAllReviewsById(reviewData.productId);

    return allProductReviews;
  }

  public async updateReview(reviewId: number, reviewData: CreateReviewDto): Promise<Reviews> {
    const findReview: Reviews = await DB.Reviews.findByPk(reviewId);
    if (!findReview) throw new HttpException(409, "Review doesn't exist");

    await DB.Reviews.update(reviewData, { where: { id: reviewId } });

    const updatedReview: Reviews = await DB.Reviews.findByPk(reviewId);
    return updatedReview;
  }

  public async deleteReview(reviewId: number): Promise<Reviews> {
    const findReview: Reviews = await DB.Reviews.findByPk(reviewId);
    if (!findReview) throw new HttpException(409, "Review doesn't exist");

    await DB.Reviews.destroy({ where: { id: reviewId } });

    return findReview;
  }
}
