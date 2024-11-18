import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { randEmail, randFullName, randUuid } from '@ngneat/falso';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CvService } from '../cv/cv.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cvService: CvService
  ) {}

  async createFakeUser(): Promise<User> {
    return await this.userRepository.manager.transaction(async (manager) => {
      const newUser = new User();
      newUser.username = randFullName();
      newUser.email = randEmail();
      newUser.password = randUuid();
      const savedUser = await manager.save(newUser);
      const cv = await this.cvService.createFakeCv(savedUser);
      await manager.save(cv);
      return savedUser;
    });
  }

  create(createUserDto: CreateUserDto): Promise<User> {
      const newUser = new User();
      newUser.username = createUserDto.username;
      newUser.email = createUserDto.email;
      newUser.password = createUserDto.password;
      return this.userRepository.save(newUser);
    }

  findAll() {
    return this.userRepository.find();
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
