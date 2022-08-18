import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StadisticsService {
  constructor(private prismaService: PrismaService) {}

  mostUsedPlays() {
    return this.prismaService.$queryRaw`
    SELECT p.name AS play_name, 
		COUNT(ufp.id)::INT AS amount FROM use_of_play ufp 
		JOIN play p ON ufp.play_id = p.id GROUP BY p.id ORDER BY play_name, amount DESC;`;
  }

  mostScoredPlays() {
    return this.prismaService.$queryRaw`
    SELECT p.name AS play_name , SUM(ufp.value)::INT AS total_points FROM use_of_play ufp
		JOIN play p on ufp.play_id = p.id 
		WHERE scored = true
		GROUP BY p.id 
		ORDER BY play_name, total_points DESC;`;
  }

  lessScoredPlays() {
    return this.prismaService.$queryRaw`
    SELECT p.name AS play_name , COUNT(ufp.id)::INT AS times_used FROM use_of_play ufp
		JOIN play p ON ufp.play_id = p.id 
		WHERE scored = true
		GROUP BY p.id 
		ORDER BY play_name, times_used DESC;
    `;
  }

  mostScoredPlayer() {
    return this.prismaService.$queryRaw`
      SELECT p.name AS play_name, pl.full_name , SUM(ufp.value)::INT AS total_points 
      FROM use_of_play ufp
      JOIN play p ON ufp.play_id = p.id 
      JOIN player pl ON pl.id = ufp.scorer_id WHERE scored = true
      GROUP BY p.id, pl.id
      ORDER BY p.name ,total_points DESC;
    `;
  }

  mostFailedPlayer() {
    return this.prismaService.$queryRaw`
    SELECT p.name AS play_name ,pl.full_name, COUNT(ufp.id)::INT AS total_shoots 
		FROM use_of_play ufp
		JOIN play p ON ufp.play_id = p.id 
		JOIN player pl on pl.id = ufp.scorer_id  
		WHERE scored = true GROUP BY p.id, pl.id ORDER BY p.name, total_shoots ASC;
      `;
  }

  mostAssisterPlayer() {
    return this.prismaService.$queryRaw`
    SELECT p.name AS play_name,  pl.full_name,  COUNT(ufp.id)::INT AS total_assist 
		FROM use_of_play ufp  
		JOIN play p ON ufp.play_id = p.id 
		JOIN player pl ON pl.id = ufp.assister_id  
		WHERE scored = true
		AND (ufp.assister_id IS NOT NULL OR ufp.scorer_id <> ufp.assister_id)
		GROUP BY p.id, pl.id ORDER BY p.name ,total_assist DESC ;
    `;
  }

  mostEffectiveAgainstOpponent() {
    return this.prismaService.$queryRaw`
    SELECT p.name, sQ1.opponent, CONCAT(ROUND((sQ1.scored*100/sQ1.total),2)::FLOAT,'%') AS efectivity
		FROM (SELECT ufp.play_id, m.opponent, sum(CASE WHEN ufp.scored = true  THEN 1 ELSE 0 END)::INT AS scored, COUNT(ufp.id)::INT AS total
		FROM use_of_play ufp JOIN match m ON m.id = ufp.match_id
		GROUP BY ufp.play_id, m.opponent) AS sQ1
		JOIN play p ON p.id = sQ1.play_id 
		ORDER BY p.name, efectivity DESC ;
    `;
  }

  lessEffectiveAssister() {
    return this.prismaService.$queryRaw`
      select p.name as play_name,
        (((select COUNT(ufpbis.id)::FLOAT from use_of_play ufpbis  
        where ufpbis.scored = true and ufpbis.play_id = p.id and ufpbis.assister_id = pl.id 
        and (ufpbis.assister_id is not null or ufpbis.scorer_id <> ufpbis.assister_id))  
        / COUNT(ufp.id)::FLOAT)::FLOAT*100)::FLOAT AS efectivity, 
        pl.full_name
        from use_of_play ufp 
        join play p on p.id = ufp.play_id  
        join player pl on pl.id = ufp.assister_id  
        where (ufp.assister_id is not null or ufp.scorer_id <> ufp.assister_id) 
        group by pl.id, p.id 
        order by play_name,efectivity ASC;
    `;
  }
}
