import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { OffsetPaginationArgs } from './dto/offset-pagination.dto';

@Injectable()
export class UsersService {

  constructor(
    private readonly prisma: PrismaService
  ) {}

  async create(userDto: CreateUserInput) {
    const excitingUser = await this.prisma.user.findUnique({
      where: {email: userDto.email}
    });
    if(excitingUser) throw new ForbiddenException('User already with this email excited!')
    const password = await bcrypt.hash(userDto.password, +process.env.CRYPT_SALT);
    const user = await this.prisma.user.create({
      data: {
        name: userDto.name,
        email: userDto.email,
        password: password,
        role: userDto.role,
      }
    })
    return user
  }

  async findAll(args: OffsetPaginationArgs) {
    return this.prisma.user.findMany({
      take: args.limit,
      skip: args.offset,
      include: {
        viewedPosts: {
          include: {
            post: true
          }
        }
      }
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {id: id},
      include: {
        viewedPosts: {
          include: {
            post: true
          }
        }
      }
    });
    if(!user) throw new NotFoundException('User not found');
    return user
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {email: email}
    });
    if(!user) throw new NotFoundException('User not found');
    return user
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const excitingUser = await this.prisma.user.findUnique({
      where: {id: id}
    });
    if(!excitingUser) throw new NotFoundException('User not found')
    const user = await this.prisma.user.update({
      where: {id},
      data: {
        name: updateUserInput?.name ? updateUserInput.name : excitingUser.name,
        email: updateUserInput?.email ? updateUserInput.email : excitingUser.email,
        role: updateUserInput?.role ? updateUserInput.role : excitingUser.role,
      }
    })

    return user
  }

  async remove(id: number) {
    const excitingUser = await this.prisma.user.findUnique({
      where: {id: id}
    });
    if(!excitingUser) throw new NotFoundException('User not found');
    const res = await this.prisma.user.delete({
      where: {id}
    })
    return {
      message: `User ${res.email} has been removed`
    }
  }
}
