import { Module, NestModule, MiddlewareConsumer, RequestMethod, CacheInterceptor, CacheModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { AuditMiddleware } from '../middlewares/audit.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
    CacheModule.register({
      ttl: 5, //seconds
      max: 100, // max number of items in cache
    })
],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule  implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuditMiddleware)
      .forRoutes({ path: 'user/*', method: RequestMethod.ALL})
  }
}
