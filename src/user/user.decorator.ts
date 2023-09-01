// user.decorator.ts
import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data, ctx: any) => {
  console.log('context', ctx);
  const req = ctx.args[2].req;
  return req.user;
});
