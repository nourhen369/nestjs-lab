import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './skill/entities/skill.entity';
import { Cv } from './cv/entities/cv.entity';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    CvModule, 
    SkillModule, 
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql', 
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'tp-cv',
      entities: [Cv, Skill, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Cv, Skill, User]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
