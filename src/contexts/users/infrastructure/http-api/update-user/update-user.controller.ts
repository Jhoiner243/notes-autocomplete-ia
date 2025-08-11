import { Body, Controller, Put } from '@nestjs/common';
import { V1_USERS } from '../route.constants';
import { UpdateUserDtoHttp } from './update-user.http.dto';

@Controller(V1_USERS)
export class UpdateUserController {
  @Put('/update-user')
  async update(@Body() _dto: UpdateUserDtoHttp): Promise<{ message: string }> {
    return { message: 'Not implemented' };
  }
}
