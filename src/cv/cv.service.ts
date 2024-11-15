import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';
import { randJobTitle, randNumber } from '@ngneat/falso';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { SkillService } from 'src/skill/skill.service';
import { log } from 'console';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
    private readonly skillService: SkillService,
  ) {}

  async createFakeCv(user: User): Promise<Cv> {
    const cv1 = new Cv();
    cv1.name = user.username.split(' ')[0];
    cv1.firstname = user.username.split(' ')[1];
    cv1.age = randNumber({ min: 18, max: 60 });
    cv1.cin = randNumber({ min: 9000000, max: 13000000 });
    cv1.job = randJobTitle();
    cv1.path = '/cv/path/to/file.pdf';
    cv1.skills = [];
    const skill1 = await this.skillService.createFakeSkill();
    cv1.skills.push(skill1);
    cv1.user = user;
    return cv1;
  }

  create(createCvDto: CreateCvDto) {
    return 'This action adds a new cv';
  }

  findAll() {
    return `This action returns all cv`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cv`;
  }

  update(id: number, updateCvDto: UpdateCvDto) {
    return `This action updates a #${id} cv`;
  }

  remove(id: number) {
    return `This action removes a #${id} cv`;
  }
}
