import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randUserName, randEmail, randPassword, randJobTitle, randFullName, randNumber, randText, rand } from '@ngneat/falso';
import { User } from '../user/entities/user.entity';
import { Cv } from '../cv/entities/cv.entity';
import { Skill } from '../skill/entities/skill.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
    
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}

  async seed() {
    await this.seedUsers();
    await this.seedSkills();
    await this.seedCvs();
  }

  async seedUsers() {
    const users = Array.from({ length: 5 }).map(() => {
      return this.userRepository.create({
        username: randUserName(),
        email: randEmail(),
        password: randPassword(),
      });
    });
    await this.userRepository.save(users);
    console.log('Users seeded');
  }

  async seedSkills() {
    const skills = Array.from({ length: 10 }).map(() => {
      return this.skillRepository.create({
        designation: randJobTitle(),
      });
    });
    await this.skillRepository.save(skills);
    console.log('Skills seeded');
  }

  async seedCvs() {
    const users = await this.userRepository.find();
    const skills = await this.skillRepository.find();
  
    const cvs = Array.from({ length: 10 }).map(() => {
      const randomUser = rand(users);
      const randomSkills = rand(skills, { length: randNumber({ min: 1, max: 3 }) });
      
      return this.cvRepository.create({
        name: randomUser.username,
        firstname: randomUser.username,
        age: randNumber({ min: 18, max: 65 }),
        cin: randNumber({ min: 9000000, max: 13000000 }),
        job: randJobTitle(),
        path: '/cv/path/to/file.pdf',
        user: randomUser,
        skills: randomSkills, 
      });
    });
  
    await this.cvRepository.save(cvs);
    console.log('CVs seeded');
  }
  
}