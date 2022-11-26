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

import GameServer from "../../Game";
import ArenaEntity from "../../Native/Arena";

import ShapeManager from "../../Entity/Shape/Manager";
import TankBody from "../../Entity/Tank/TankBody";
import { CameraEntity } from "../../Native/Camera";
import { Inputs } from "../../Entity/AI";
import { DevTank } from "../../Const/DevTankDefinitions";
import { Tank } from "../../Const/Enums";
import Client from "../../Client";
import Guardian from "../../Entity/Boss/Guardian";
import Guarboss from "../../Entity/Boss/Guarboss";
import FallenGura from "../../Entity/Boss/FallenGura";
import FallenSpike from "../../Entity/Misc/Boss/FallenSpike";
import FallenSpikeBoss from "../../Entity/Misc/Boss/FallenSpikeBoss";
import FallenAC from "../../Entity/Misc/Boss/FallenAC";
import FallenMegaTrapper from "../../Entity/Misc/Boss/FallenMegaTrapper";
import FallenOverlord from "../../Entity/Boss/FallenOverlord";
import FallenBooster from "../../Entity/Boss/FallenBooster";
import Summoner from "../../Entity/Boss/Summoner";
import AbstractBoss from "../../Entity/Boss/AbstractBoss";


import ArenaCloser from "../../Entity/Misc/ArenaCloser";
import TwinArenaCloser from "../../Entity/Misc/TwinArenaCloser";
import FallenArenaCloser from "../../Entity/Misc/FallenArenaCloser";
import PentaArenaCloser from "../../Entity/Misc/PentaArenaCloser";
import BoosterArenaCloser from "../../Entity/Misc/BoosterArenaCloser";
import FactoryArenaCloser from "../../Entity/Misc/FactoryArenaCloser";
/**
 * Only spawns crashers
 */
class ZeroShapeManager extends ShapeManager {
    protected get wantedShapes() {
        return 0;
    }
}


/**
 * Testing Arena
 */
export default class TestingArena extends ArenaEntity {
    protected shapes: ShapeManager = new ZeroShapeManager(this);

    public constructor(game: GameServer) {
        super(game);

        this.updateBounds(5000, 5000);
        
//         setTimeout(() => {
//             for(var i = 0; i < 2; i++) {
//                 new ArenaCloser(game);
//             }
//             for(var i = 0; i < 12; i++) {
//                 new Summoner(game);
//             }
//         }, 60000)
        setTimeout(() => {
//             new Guarboss(game);
//             new Guarboss(game);
            for(var i = 0; i < 12; i++) {
//                 new BoosterArenaCloser(game);
                new PentaArenaCloser(game);
//                 new FactoryArenaCloser(game);
            }
//             new TwinArenaCloser(game);
//             new ArenaCloser(game);
        }, 1000)
        setInterval(() => {
//             new FallenGura(game);
        }, 64000)
//         setTimeout(() => {
//             new FallenArenaCloser(game);
//         }, 64000);

        setInterval(() => {
//             new Guardian(game);
            new AbstractBoss(game);
            new FallenSpikeBoss(game);
//             new Summoner(game);
            new FallenMegaTrapper(game);
            new FallenAC(game);
            new FallenBooster(game);
            new FallenOverlord(game);
            new FallenSpike(game);
        }, 8000)

        // const tank1 = this.spawnTestTank(Tank.Booster);
        // const tank2 = this.spawnTestTank(Tank.Annihilator);

        // tank1.inputs.mouse.x = - 2 * (tank1.position.x = 10000);
        // tank1.inputs.mouse.y = (tank1.position.y = -400);
        // tank1.setVelocity(0, 0);

        // tank2.inputs.mouse.x = 2 * (tank2.position.x = 10000);
        // tank2.inputs.mouse.y = (tank2.position.y = 400);
        // tank2.setVelocity(0, 0);

        // tank1.cameraEntity.camera.statLevels[Stat.Reload] = tank1.cameraEntity.camera.statLimits[Stat.Reload];
        // tank1.cameraEntity.camera.statLevels[Stat.MovementSpeed] = tank1.cameraEntity.camera.statLimits[Stat.MovementSpeed];
        // tank2.cameraEntity.camera.statLevels[Stat.Reload] = tank2.cameraEntity.camera.statLimits[Stat.Reload];
        // tank2.cameraEntity.camera.statLevels[Stat.MovementSpeed] = tank2.cameraEntity.camera.statLimits[Stat.MovementSpeed];   

        // setTimeout(() => {
        //     tank1.inputs.movement.magnitude = 1;
        //     tank1.inputs.movement.angle = Math.PI;
        //     tank1.inputs.movement.set = () => {};
        //     tank1.inputs.flags |= InputFlags.leftclick;
        //     tank2.inputs.movement.magnitude = 1;
        //     tank2.inputs.movement.angle = Math.PI;
        //     tank2.inputs.movement.set = () => {};
        //     tank2.inputs.flags |= InputFlags.leftclick;
        // }, 10000);
    }

    public spawnPlayer(tank: TankBody, client: Client): void {
        tank.setTank(DevTank.Spectator);
    }

    private spawnTestTank(id: Tank | DevTank) {
        const testTank = new TankBody(this.game, new CameraEntity(this.game), new Inputs());
        testTank.cameraEntity.camera.player = testTank;
        testTank.setTank(id);
        testTank.cameraEntity.setLevel(45);
        return testTank;
    }
}
