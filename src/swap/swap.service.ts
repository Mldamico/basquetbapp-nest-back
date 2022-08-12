import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SwapService {
  constructor(private prismaService: PrismaService) {}
}
