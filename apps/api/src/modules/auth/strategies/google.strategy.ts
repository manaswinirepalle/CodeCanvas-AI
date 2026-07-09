import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(config: ConfigService) {
    super({
      clientID: config.get('GOOGLE_CLIENT_ID', ''),
      clientSecret: config.get('GOOGLE_CLIENT_SECRET', ''),
      callbackURL: `${config.get('NEXT_PUBLIC_API_URL', 'http://localhost:4000')}/api/v1/auth/google/callback`,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { name, emails, photos, id } = profile;
    const user = {
      id,
      emails,
      displayName: name?.givenName
        ? `${name.givenName} ${name.familyName || ''}`.trim()
        : profile.displayName,
      photos,
      accessToken,
    };
    done(null, user);
  }
}
