import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { ProductRoute } from './routes/products.route';
import { OrderRoute } from './routes/orders.route';
import { ReviewRoute } from './routes/reviews.route';
import { CategoryRoute } from './routes/categories.route';
import { OrderItemRoute } from './routes/order-items.route';
import { GeneralRoute } from './routes/general.route';
import { BrandRoute } from './routes/brands.route';

ValidateEnv();

const app = new App([
  new AuthRoute(),
  new UserRoute(),
  new ProductRoute(),
  new OrderRoute(),
  new ReviewRoute(),
  new CategoryRoute(),
  new OrderItemRoute(),
  new GeneralRoute(),
  new BrandRoute(),
]);

app.listen();
