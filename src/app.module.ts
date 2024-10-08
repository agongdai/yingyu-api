import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthGuard } from '@/common/auth.guard';
import { Semester } from '@/semester/entities/semester.entity';
import { TaskModule } from '@/task/task.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { logger } from './common/logger.middleware';
import { ResponseInterceptor } from './common/response.interceptor';
import { CourseModule } from './course/course.module';
import { Course } from './course/entities/course.entity';
import { SemesterModule } from './semester/semester.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    CacheModule.register({
      ttl: 10000, // milliseconds
      max: 100, // maximum number of items in cache
      isGlobal: true,
    }),
    // ttl, the time to live in milliseconds, and the limit, the maximum number of requests within the ttl
    ThrottlerModule.forRoot([
      {
        ttl: 10000,
        limit: 100,
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: process.env.MYSQL_PASSWORD,
      database: 'yingyu',
      entities: [Course, User, Semester],
      synchronize: true,
    }),
    UserModule,
    CourseModule,
    TaskModule,
    AuthModule,
    SemesterModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(AppController);
    // .forRoutes({ path: 'user', method: RequestMethod.GET });
  }
}
