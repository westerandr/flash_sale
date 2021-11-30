import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/auth/role.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    const adminUsersFound = await this.repo.find({ role: Role.Admin });
    if (adminUsersFound.length === 0) {
      console.log('No Admin Users Found');
      console.log('Creating Admin Acc');

      const adminUser = await this.repo.create({
        email: this.configService.get('ADMIN_EMAIL'),
        firstName: this.configService.get('ADMIN_FIRST_NAME'),
        lastName: this.configService.get('ADMIN_LAST_NAME'),
        role: Role.Admin,
        password: this.configService.get('ADMIN_PASSWORD'),
      });
      await this.repo.save(adminUser);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.repo.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.repo.findOne(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.repo.findOne({ email });
  }

  async create(user: CreateUserDto): Promise<User> {
    const { email, firstName, lastName, password, role } = user;

    const userExists = await this.repo.findOne({ email });
    if (userExists) {
      throw new ConflictException('User already exists');
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.repo.create({
      email,
      firstName,
      lastName,
      role: role || Role.User,
      password: hashedPassword,
    });

    return await this.repo.save(newUser);
  }

  async update(id: number, user: Partial<CreateUserDto>): Promise<User> {
    const userToUpdate = await this.repo.findOne(id);
    if (!userToUpdate) {
      throw new ConflictException('User does not exist');
    }

    const { password } = user;
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    await this.repo.update(
      id,
      password
        ? {
            ...user,
            password: hashedPassword,
          }
        : user,
    );
    return await this.repo.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const userToDelete = await this.repo.findOne(id);
    if (!userToDelete) {
      throw new ConflictException('User does not exist');
    }
    await this.repo.delete(id);
  }
}
