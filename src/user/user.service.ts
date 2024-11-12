import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { randEmail, randFullName, randUuid } from '@ngneat/falso';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CvService } from 'src/cv/cv.service';
import { SkillService } from 'src/skill/skill.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cvService: CvService, 
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User();
    newUser.username = createUserDto.username;
    newUser.email = createUserDto.email;
    newUser.password = createUserDto.password;
    return this.userRepository.save(newUser);
  }

  async createFakeUser(): Promise<User> {
    const newUser = new User();
    newUser.username = randFullName();
    newUser.email = randEmail();
    newUser.password = randUuid();
    console.log(newUser.username)
    console.log(newUser.email)
    console.log(newUser.password)
    const cv = await this.cvService.createFakeCv(newUser);
    return this.userRepository.save(newUser);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}