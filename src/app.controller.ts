import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api')
  async list(@Res() response: Response): Promise<Response> {
    return response.status(HttpStatus.OK).json({ message: 'Olá TDC' });
  }

  @Get('/healthz')
  healthCheck(): string {
    return this.appService.healthCheck();
  }
}
