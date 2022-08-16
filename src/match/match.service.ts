import { Injectable } from '@nestjs/common';
import { Console } from 'console';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { EndMatchDto } from './dto/end-match.dto';

@Injectable()
export class MatchService {
  constructor(private prismaService: PrismaService) {}

  createMatch(dto: CreateMatchDto) {
    return this.prismaService.match.create({
      data: {
        opponent: dto.opponent,
      },
    });
  }

  endMatch(id: number, dto: EndMatchDto) {
    return this.prismaService.match.update({
      where: {
        id,
      },
      data: {
        score: dto.score,
        opponentScore: dto.score,
      },
    });
  }

  getMatch(id: number) {
    return this.prismaService.match.findFirst({
      where: { id },
    });
  }

  getMatchByPlays(id: number) {
    return this.prismaService.$queryRaw`
		SELECT result.name, result.count, result.totalConverts, result.totalPoints, result.efficiency from use_of_play up INNER JOIN
		(SELECT ufp.play_id, p.name,count(*)::int,
      COALESCE(sum(Case When ufp.scored = true then 1 Else 0 End),0)::int as totalConverts,
    	COALESCE(sum(Case When ufp.scored = true then ufp.value  Else 0 End),0)::int as totalPoints,
    	(COALESCE((sum(Case When ufp.scored = true then 1  Else 0 End)) /count(*)::float)*100)::int as efficiency
    	FROM use_of_play ufp JOIN play p ON ufp.play_id = p.id
    	WHERE ufp.match_id = ${id} GROUP BY ufp.play_id, p.name
			) as result ON result.play_id = up.play_id GROUP By up.play_id, result.play_id, result.name, result.count, result.totalConverts, result.totalPoints, result.efficiency`;
  }

  getMatchByPlayer(id: number) {
    return this.prismaService.$queryRaw`
			-- SELECT * from use_of_play up FROM (
				SELECT * from player_to_match pm LEFT JOIN player p ON pm.player_id = p.id WHERE pm.match_id =${id}
			-- ) as players WHERE up.match_id = ${id} ;
		`;

    // -- SELECT player_id, full_name,
    // -- --  COALESCE(tiempoSeg,0) as tpoSeg,
    // -- 	COALESCE(puntosTriples,0) as ptosTriples, COALESCE(triplesTotales,0) as cantTriples,
    // -- 	COALESCE(puntosDobles,0) as ptosDobles, COALESCE(doblesTotales,0) as cantDobles,
    // -- 	COALESCE(puntosSimples,0) as ptosSimples, COALESCE(simplesTotales,0) as cantSimples,
    // -- 	COALESCE(asistTotal,0) as cantAsist,
    // -- 	COALESCE(puntosTriples+puntosDobles+puntosSimples,0) as ptosTot ,
    // -- 	(case when triplesTotales=0 then null else ((puntosTriples/3)*100/triplesTotales)::int end) as eftriple,
    // -- 	(case when doblesTotales=0 then null else ((puntosDobles/2)*100/doblesTotales)::int end) as efDoble,
    // -- 	(case when simplesTotales=0 then null else (puntosSimples*100/simplesTotales)::int end) as efSimple
    // -- 	FROM
    // -- 	(SELECT pm.player_id, u.full_name FROM player_to_match pm
    // -- 	LEFT JOIN player u ON pm.player_id =u.id
    // -- 	WHERE pm.match_id = ${id}) as subQuery1
    // -- 	LEFT JOIN
    // -- 	-- (SELECT s.leaving_player_id, sum(s.time_playing) as tiempoSeg
    // -- 	-- FROM swap s join player u on s.leaving_player_id = u.id
    // -- 	-- WHERE s.match_id = ${id} group by s.leaving_player_id) as subQuery2
    // -- 	-- ON subQuery1.player_id = subQuery2.leaving_player_id
    // -- 	-- LEFT JOIN
    // -- 	(SELECT  uop.scorer_id,
    // -- 	sum(Case When uop.scored = true and uop.value = 3 Then 3 Else 0 End)::int as puntosTriples,
    // -- 	sum(Case When uop.value = 3 Then 1 Else 0 End)::int  as triplesTotales,
    // -- 	sum(Case When uop.scored = true and uop.value = 2 Then 2 Else 0 End)::int as puntosDobles,
    // -- 	sum(Case When uop.value = 2 Then 1 Else 0 End)::int  as doblesTotales,
    // -- 	sum(Case When uop.scored = true and uop.value = 1 Then 1 Else 0 End)::int as puntosSimples,
    // -- 	sum(Case When uop.value = 1 Then 1 Else 0 End)::int  as simplesTotales
    // -- 	FROM match m	join use_of_play uop on m.id = uop.match_id
    // -- 	WHERE m.id = ${id}
    // -- 	group by uop.scorer_id) as subQuery3
    // -- 	ON subQuery1.player_id = subQuery3.scorer_id
    // -- 	LEFT JOIN
    // -- 	(SELECT uop.assister_id,  count(*) as asistTotal,
    // -- 	sum(case when uop.scored then 1 else 0 end)::int as cantConvert,
    // -- 	sum(Case When uop.scored = true Then uop.value Else 0 End)::int as puntosAsist
    // -- 	FROM match m	join use_of_play uop on m.id = uop.match_id
    // -- 	WHERE m.id = ${id}
    // -- 	group by uop.assister_id) as subQuery4
    // -- 	ON subQuery1.player_id = subQuery4.assister_id
    // -- 	order by subQuery1.player_id`;
  }
}
