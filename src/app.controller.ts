import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { Request as ExResuest } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Request() req: ExResuest): string {
    return this.appService.getHello();
  }
}
