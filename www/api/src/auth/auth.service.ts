import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import configuration from "src/config/configuration";
import { bcryptSalt } from "src/utils/constants";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password?: string): Promise<any> {
    const user = await this.userService.findOne({ username });
    if (!user || !user._id) {
      throw new HttpException("User not exist", HttpStatus.NOT_FOUND);
    }

    if (
      !user.password ||
      !password ||
      !bcrypt.compareSync(password, user.password)
    ) {
      throw new HttpException("Wrong password", HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, userId: user._id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: configuration().jwt.secret,
      }),
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
      },
    };
  }

  async profile(user: any) {
    if (user && user.userId) {
      const userFound = await this.userService.findOne({ _id: user.userId });
      if (userFound && userFound._id) {
        return {
          _id: userFound._id,
          username: userFound.username,
          email: userFound.email,
          name: userFound.name,
        };
      }
    }
    throw new UnauthorizedException();
  }

  async updateProfile(user: any, updateData: any) {
    if (user && user.userId) {
      const userFound = await this.userService.findOne({ _id: user.userId });
      if (userFound && userFound._id) {
        await this.userService.findOneAndUpdate(user.userId, {
          email: updateData.email || userFound.email,
          name: updateData.name || userFound.name,
        });
        return {
          _id: userFound._id,
          username: userFound.username,
          email: updateData.email || userFound.email,
          name: updateData.name || userFound.name,
        };
      }
    }
    throw new UnauthorizedException();
  }

  async updatePassword(user: any, updateData: any) {
    if (user && user.userId) {
      const userFound = await this.userService.findOne({ _id: user.userId });
      if (userFound && userFound._id) {
        if (!updateData.currentPassword || !updateData.newPassword) {
          throw new HttpException("Current password or new password missing!", HttpStatus.BAD_REQUEST);
        }
        if (!bcrypt.compareSync(updateData.currentPassword, userFound.password)) {
          throw new HttpException("Current password not correct!", HttpStatus.BAD_REQUEST);
        }
        await this.userService.findOneAndUpdate(user.userId, {
          password: bcrypt.hashSync(
            updateData.newPassword,
            bcryptSalt
          ),
        });
        return true;
      }
    }
    throw new UnauthorizedException();
  }
}
