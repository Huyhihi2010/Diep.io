/*
    DiepCustom - custom tank game server that shares diep.io's WebSocket protocol
    Copyright (C) 2022 ABCxFF (github.com/ABCxFF)
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.
    You should have received a copy of the GNU Affero General Public License
    along with this program. If not, see <https://www.gnu.org/licenses/>
*/

import Client from "../Client";
import { Colors } from "../Const/Enums";
import Dominator from "../Entity/Misc/Dominator";
import TeamBase from "../Entity/Misc/TeamBase";
import { TeamEntity } from "../Entity/Misc/TeamEntity";
import TankBody from "../Entity/Tank/TankBody";
import GameServer from "../Game";
import ArenaEntity from "../Native/Arena";


const arenaSize = 11150;
const baseSize = 3345;
const domBaseSize = baseSize / 2;
/**
 * Domination Gamemode Arena
 */
export default class DominationArena extends ArenaEntity {
    /** Blue Team entity */
    public blueTeam: TeamEntity = new TeamEntity(this.game, Colors.TeamBlue);
    /** Red Team entity */
    public redTeam: TeamEntity = new TeamEntity(this.game, Colors.TeamRed);

    public constructor(game: GameServer) {
        super(game);

        this.updateBounds(arenaSize * 2, arenaSize * 2)

        new TeamBase(game, this.blueTeam, -arenaSize + arenaSize,  -arenaSize + baseSize / 2, baseSize, arenaSize * 2);
        new TeamBase(game, this.redTeam, arenaSize - arenaSize, arenaSize - baseSize / 2, baseSize, arenaSize * 2);
        
        
        new Dominator(this, new TeamBase(game, this.redTeam, arenaSize / 2.5, arenaSize / 2.5, domBaseSize, domBaseSize, false));
        new Dominator(this, new TeamBase(game, this.redTeam, arenaSize / -2.5, arenaSize / 2.5, domBaseSize, domBaseSize, false));
        new Dominator(this, new TeamBase(game, this, 0, 0, domBaseSize*2, domBaseSize*2, false));
        new Dominator(this, new TeamBase(game, this.blueTeam, arenaSize / -2.5, arenaSize / -2.5, domBaseSize, domBaseSize, false));
        new Dominator(this, new TeamBase(game, this.blueTeam, arenaSize / 2.5, arenaSize / -2.5, domBaseSize, domBaseSize, false));
    }

    public spawnPlayer(tank: TankBody, client: Client) {
        tank.position.values.y = arenaSize * Math.random() - arenaSize;

        const x = Math.random() * arenaSize,
              y = Math.random() * baseSize;
        
        const chance = Math.random();
        
        if (chance < 0.5) {
            tank.relations.values.team = this.blueTeam;
            tank.style.values.color = this.blueTeam.team.values.teamColor;
            tank.position.values.x = -arenaSize + x;
            tank.position.values.y = -arenaSize + y;
        } else {
            tank.relations.values.team = this.redTeam;
            tank.style.values.color = this.redTeam.team.values.teamColor;
            tank.position.values.x = arenaSize - x;
            tank.position.values.y = arenaSize - y;
        }

        if (client.camera) client.camera.relations.team = tank.relations.values.team;
    }
}
