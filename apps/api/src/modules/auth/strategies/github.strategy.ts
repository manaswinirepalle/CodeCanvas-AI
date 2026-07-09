import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(config: ConfigService) {
    super({
      clientID: config.get('GITHUB_CLIENT_ID', ''),
      clientSecret: config.get('GITHUB_CLIENT_SECRET', ''),
      callbackURL: `${config.get('NEXT_PUBLIC_API_URL', 'http://localhost:4000')}/api/v1/auth/github/callback`,
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: any,
    done: Function,
  ) {
    const { username, emails, photos, id } = profile;
    const user = {
      id: String(id),
      emails: emails || [{ value: `${username}@github.local` }],
      displayName: profile.displayName || username,
      username,
      photos,
      accessToken,
    };
    done(null, user);
  }
}
