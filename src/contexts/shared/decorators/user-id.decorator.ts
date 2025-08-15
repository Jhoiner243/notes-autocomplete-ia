import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

type AuthenticatedUser = {
  id: string;
};

type AuthenticatedRequest = {
  user?: AuthenticatedUser;
};

export const UserId = createParamDecorator((ctx: ExecutionContext) => {
  const request: AuthenticatedRequest = ctx.switchToHttp().getRequest();
  const user = request.user;

  if (!user || !user.id) {
    throw new InternalServerErrorException(
      'El decorador UserId se usó en una ruta sin un Guard de autenticación válido.',
    );
  }

  return user.id;
});
