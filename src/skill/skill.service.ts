import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { randSkill } from '@ngneat/falso';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>
  ) {}

  createFakeSkill(){
    const skill = new Skill();
    skill.designation = randSkill();
    return this.skillRepository.save(skill);
  }

  create(createSkillDto: CreateSkillDto) {
    return 'This action adds a new skill';
  }

  findAll() {
    return `This action returns all skill`;
  }

  findOne(id: number) {
    return `This action returns a #${id} skill`;
  }

  update(id: number, updateSkillDto: UpdateSkillDto) {
    return `This action updates a #${id} skill`;
  }

  remove(id: number) {
    return `This action removes a #${id} skill`;
  }
}
