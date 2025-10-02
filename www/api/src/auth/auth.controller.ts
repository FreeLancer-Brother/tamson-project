import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    const loginData = await this.authService.login(req.user);
    return {
      data: loginData,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async getProfile(@Request() req) {
    const profile = await this.authService.profile(req.user);
    return {
      data: profile,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post("profile")
  async updateProfile(@Request() req) {
    const profile = await this.authService.updateProfile(req.user, req.body);
    return {
      data: profile,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post("change-password")
  async updatePassword(@Request() req) {
    const data = await this.authService.updatePassword(req.user, req.body);
    return {
      data: data,
    };
  }
}
