import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../../application/use-cases/create-user-use-case/create-user.use-case';
import { V1_USERS } from '../route.constants';
import { UserCreateDto } from './create-user.http-dto';

@Controller(V1_USERS)
export class CreateUserController {
  public constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post('/create-user')
  async create(@Body() user: UserCreateDto): Promise<{ message: string }> {
    console.log('CONTROLLER', user);
    await this.createUserUseCase.execute(user);
    return {
      message: 'User created',
    };
  }
}
