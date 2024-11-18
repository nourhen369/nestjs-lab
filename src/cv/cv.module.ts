import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { SkillModule } from '../skill/skill.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Cv]),
    SkillModule
],
  controllers: [CvController],
  providers: [CvService],
  exports: [CvService],  
})
export class CvModule {}