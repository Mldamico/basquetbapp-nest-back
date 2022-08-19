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
      SELECT p.name AS play_name,
        (((SELECT COUNT(ufpbis.id)::FLOAT FROM use_of_play ufpbis  
        WHERE ufpbis.scored = true AND ufpbis.play_id = p.id AND ufpbis.assister_id = pl.id 
        AND (ufpbis.assister_id IS NOT NULL OR ufpbis.scorer_id <> ufpbis.assister_id))  
        / COUNT(ufp.id)::FLOAT)::FLOAT*100)::FLOAT AS efectivity, 
        pl.full_name
        FROM use_of_play ufp 
        JOIN play p ON p.id = ufp.play_id  
        JOIN player pl ON pl.id = ufp.assister_id  
        WHERE (ufp.assister_id IS NOT NULL OR ufp.scorer_id <> ufp.assister_id) 
        GROUP BY pl.id, p.id 
        ORDER BY play_name,efectivity ASC;
    `;
  }

  mostQuintetPlays() {
    return this.prismaService.$queryRaw`
     SELECT p.name AS play_name,
        CONCAT(b.full_name,', ',es.full_name,', ',al.full_name,', ',
        ap.full_name,', ',pi.full_name) AS quintet,
        COUNT(ufp.id)::INT AS amount FROM use_of_play ufp
        JOIN play p ON p.id = ufp.play_id
        JOIN player b ON b.id = ufp.point_guard_id 
        JOIN player es ON es.id = ufp.shooting_guard_id
        JOIN player al ON al.id = ufp.center_id
        JOIN player ap ON ap.id = ufp.small_forward_id 
        JOIN player pi ON pi.id = ufp.power_forward_id 
        GROUP BY p.name, play_id, b.full_name,es.full_name,al.full_name ,point_guard_id ,ap.full_name,pi.full_name, shooting_guard_id ,center_id , small_forward_id ,power_forward_id 
        ORDER BY play_name, amount DESC;
    `;
  }

  mostQuintetPoints() {
    return this.prismaService.$queryRaw`
     SELECT p.name AS play_name,
        CONCAT(b.full_name,', ',es.full_name,', ',al.full_name,', ',
        ap.full_name,', ',pi.full_name) AS quintet,
        SUM(ufp.value)::INT AS points FROM use_of_play ufp
        JOIN play p ON p.id = ufp.play_id
        JOIN player b ON b.id = ufp.point_guard_id 
        JOIN player es ON es.id = ufp.shooting_guard_id
        JOIN player al ON al.id = ufp.center_id
        JOIN player ap ON ap.id = ufp.small_forward_id 
        JOIN player pi ON pi.id = ufp.power_forward_id 
        GROUP BY p.name, play_id, b.full_name,es.full_name,al.full_name ,point_guard_id ,ap.full_name,pi.full_name, shooting_guard_id ,center_id , small_forward_id ,power_forward_id 
        ORDER BY play_name, points DESC;
    `;
  }

  mostAssistQuintets() {
    return this.prismaService.$queryRaw`
    SELECT p.name AS play_name,
        CONCAT(b.full_name,', ',es.full_name,', ',al.full_name,', ',
        ap.full_name,', ',pi.full_name) AS quintet,
        COUNT(ufp.id)::INT AS amount FROM use_of_play ufp
        JOIN play p ON p.id = ufp.play_id
        JOIN player b ON b.id = ufp.point_guard_id 
        JOIN player es ON es.id = ufp.shooting_guard_id
        JOIN player al ON al.id = ufp.center_id
        JOIN player ap ON ap.id = ufp.small_forward_id 
        JOIN player pi ON pi.id = ufp.power_forward_id 
        WHERE scored = true
        AND (ufp.assister_id IS NOT NULL OR ufp.scorer_id <> ufp.assister_id)
        GROUP BY p.name, play_id, b.full_name,es.full_name,al.full_name ,point_guard_id ,ap.full_name,pi.full_name, shooting_guard_id ,center_id , small_forward_id ,power_forward_id 
        ORDER BY play_name, amount DESC;
    `;
  }

  mostFailedQuintets() {
    return this.prismaService.$queryRaw`
    SELECT p.name AS play_name,
        CONCAT(b.full_name,', ',es.full_name,', ',al.full_name,', ',
        ap.full_name,', ',pi.full_name) AS quintet,
        COUNT(ufp.id)::INT AS amount FROM use_of_play ufp
        JOIN play p ON p.id = ufp.play_id
        JOIN player b ON b.id = ufp.point_guard_id 
        JOIN player es ON es.id = ufp.shooting_guard_id
        JOIN player al ON al.id = ufp.center_id
        JOIN player ap ON ap.id = ufp.small_forward_id 
        JOIN player pi ON pi.id = ufp.power_forward_id 
        WHERE scored = false
        GROUP BY p.name, play_id, b.full_name,es.full_name,al.full_name ,point_guard_id ,ap.full_name,pi.full_name, shooting_guard_id ,center_id , small_forward_id ,power_forward_id 
        ORDER BY play_name, amount DESC;
    `;
  }

  mostEffectiveQuintets() {
    return this.prismaService.$queryRaw`
    SELECT p.name AS play_name,
        CONCAT(b.full_name,', ',es.full_name,', ',al.full_name,', ',
        ap.full_name,', ',pi.full_name) AS quintet,
        ((SELECT COUNT(ufpbis.id)::FLOAT FROM use_of_play ufpbis
        WHERE ufpbis.scored = true AND ufpbis.play_id = p.id
        AND ufpbis.point_guard_id = b.id AND ufpbis.shooting_guard_id= es.id AND ufpbis.center_id = al.id 
        AND ufpbis.small_forward_id = ap.id AND ufpbis.power_forward_id= pi.id) 
        / COUNT(ufp.id)::FLOAT*100)::FLOAT AS effecivity FROM use_of_play ufp
        JOIN play p ON p.id = ufp.play_id
        JOIN player b ON b.id = ufp.point_guard_id 
        JOIN player es ON es.id = ufp.shooting_guard_id
        JOIN player al ON al.id = ufp.center_id
        JOIN player ap ON ap.id = ufp.small_forward_id 
        JOIN player pi ON pi.id = ufp.power_forward_id 
        GROUP BY p.name,p.id,b.id,pi.id, al.id, es.id, ap.id, play_id, b.full_name,es.full_name,al.full_name ,point_guard_id ,ap.full_name,pi.full_name, shooting_guard_id ,center_id , small_forward_id ,power_forward_id 
        ORDER BY play_name, effecivity DESC;
    `;
  }
}
