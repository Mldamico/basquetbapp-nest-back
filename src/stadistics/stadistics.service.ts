import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StadisticsService {
  constructor(private prismaService: PrismaService) {}

  mostUsedPlays() {
    return this.prismaService.$queryRaw`
    select p.name as play_name, 
		count(ufp.id)::int as amount from use_of_play ufp 
		join play p on ufp.play_id = p.id group by p.id ORDER BY play_name, amount DESC;`;
  }

  mostScoredPlays() {
    return this.prismaService.$queryRaw`
    select p.name as play_name , SUM(ufp.value)::int as total_points from use_of_play ufp
		join play p on ufp.play_id = p.id 
		where scored = true
		group by p.id 
		order by play_name, total_points DESC;`;
  }

  lessScoredPlays() {
    return this.prismaService.$queryRaw`
      select p.name as play_name , COUNT(ufp.id)::int as times_used from use_of_play ufp
		join play p on ufp.play_id = p.id 
		where scored = true
		group by p.id 
		order by play_name, times_used DESC;
    `;
  }
}
