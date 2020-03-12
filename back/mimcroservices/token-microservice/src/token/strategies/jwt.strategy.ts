import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../token.service';
import { PassportStrategy } from '@nestjs/passport';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { jwtConstants } from '../../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: IJwtPayload) {
    console.log('jwt strategy validate');
    const user = await this.authService.validateUserByJwt(payload);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
