import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Cv } from '../cv/entities/cv.entity';
import { Skill } from '../skill/entities/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cv, Skill])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
