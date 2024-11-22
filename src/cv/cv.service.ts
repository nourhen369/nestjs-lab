import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';
import { randEmail, randFullName, randJobTitle, randNumber, randUuid } from '@ngneat/falso';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { SkillService } from '../skill/skill.service';

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
    return cv1; // the cv is saved in the UserService
  }

  async create(createCvDto: CreateCvDto) {
    const cv = this.cvRepository.create(createCvDto); 
    return await this.cvRepository.save(cv);
  }

  async findAll() {
    return await this.cvRepository.find(); 
  }
  
  async findOne(id: Number) {
    const cv = await this.cvRepository.findOne({
      where: { id },  
    });
    if (!cv) {
      throw new Error(`CV avec l'ID ${id} non trouvé`); 
    }
    return cv;
  }

  async update(id: number, updateCvDto: UpdateCvDto) {
    const cv = await this.cvRepository.findOne({
      where: { id },  
    });
    if (!cv) {
      throw new Error(`CV avec l'ID ${id} non trouvé`); 
    }
    Object.assign(cv, updateCvDto);
    return await this.cvRepository.save(cv); 
  }

  async remove(id: number) {
    const cv = await this.cvRepository.findOne({
      where: { id },  
    });
    if (!cv) {
      throw new Error(`CV avec l'ID ${id} non trouvé`);
    }
    await this.cvRepository.remove(cv); 
    return { message: `CV avec l'ID ${id} supprimé` }; 
  }
  
}
