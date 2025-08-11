import { PrismaService } from '../../../../../../infraestructure/prisma/prisma.service';
import { Injectable } from '../../../../../shared/dependency-injection/custom-injectable';
import { UserCreateDto } from '../create-user.http-dto';

@Injectable()
export class UserCreateRepository {
  constructor(private prisma: PrismaService) {}
  async createUser(user: UserCreateDto) {
    await this.prisma.user.create({
      data: user,
    });
  }
}
