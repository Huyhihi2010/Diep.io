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
import Barrel from "../Tank/Barrel";
import AbstractBoss from "./AbstractBoss";

import AutoTurret from "../Tank/AutoTurret";

import { Colors, Tank } from "../../Const/Enums";
import { AIState } from "../AI";

/**
 * Class which represents the boss "Guarboss"
 */
export default class Guardian extends AbstractBoss {
    public constructor(game: GameServer) {
        super(game);

        this.name.values.name = 'Crasher Boss Pentagon';
        this.altName = 'Crasher of the Boss';
        this.style.values.color = Colors.EnemyCrasher;
        this.relations.values.team = this.game.arena;
        this.physics.values.sides = 5;
        
        for (let i = 0; i < this.physics.values.sides; ++i) {
            // Add trap launcher
//             this.trappers.push(new Barrel(this, {
//                 ...DefenderDefinition,
//                 angle: Math.PI * 2 * ((i / 4) + 1 / 6)
//             }));

            this.barrels.push(new Barrel(this, {
                angle: Math.PI * 2 * ((i / this.physics.values.sides) + 1 / this.physics.values.sides * 2),
                offset: 0,
                // Scale cuz direct
                size: 120 / (1.01 ** (75 - 1)),
                width: 91.4 / (1.01 ** (75 - 1)),
                delay: 0,
                reload: 1,
                recoil: 0,
                isTrapezoid: false,
                trapezoidDirection: 0,
                addon: "trapLauncher",
                canControlDrones: false,
                bullet: {
                    type: "trap",
                    sizeRatio: 0.8,
                    health: 7,
                    damage: 25,
                    speed: 3,
                    scatterRate: 1,
                    lifeLength: 5,
                    absorbtionFactor: 1
                }
            }));
            this.barrels.push(new Barrel(this, {
                angle: Math.PI * 2 * ((i / this.physics.values.sides) + 1 / this.physics.values.sides * 2),
                offset: 0,
                // Scale cuz direct
                size: 120 / (1.01 ** (75 - 1)),
                width: 91.4 / (1.01 ** (75 - 1)),
                delay: 0,
                reload: 0.5,
                recoil: 0,
                isTrapezoid: true,
                trapezoidDirection: 0,
                addon: null,
                droneCount: 18,
                canControlDrones: false,
                bullet: {
                    type: "drone",
                    sizeRatio: 0.6,
                    health: 7,
                    damage: 35,
                    speed: 1.7,
                    scatterRate: 1,
                    lifeLength: Infinity,
                    absorbtionFactor: 1
                }
            }));
            this.barrels.push(new Barrel(this, {
                angle: Math.PI * 2 * ((i / this.physics.values.sides) + 1 / this.physics.values.sides),
                offset: 0,
                // Scale cuz direct
                size: 120 / (1.01 ** (75 - 1)),
                width: 91.4 / (1.01 ** (75 - 1)),
                delay: 0,
                reload: 0.2,
                recoil: 0,
                isTrapezoid: true,
                trapezoidDirection: 0,
                addon: null,
                droneCount: 10,
                canControlDrones: false,
                bullet: {
                    type: "drone",
                    sizeRatio: 0.2,
                    health: 2,
                    damage: 15,
                    speed: 1.7,
                    scatterRate: 1,
                    lifeLength: 1,
                    absorbtionFactor: 1
                }
            }));
        }

//         this.barrels.push(new Barrel(this, {
//             angle: Math.PI * 0.5,
//             offset: 0,
//             // Scale cuz direct
//             size: 120 / (1.01 ** (75 - 1)),
//             width: 91.4 / (1.01 ** (75 - 1)),
//             delay: 0,
//             reload: 5,
//             recoil: 0,
//             isTrapezoid: true,
//             trapezoidDirection: 0,
//             addon: null,
//             droneCount: 18,
//             canControlDrones: true,
//             bullet: {
//                 type: "drone",
//                 sizeRatio: 0.6,
//                 health: 2.5,
//                 damage: 35,
//                 speed: 1.7,
//                 scatterRate: 1,
//                 lifeLength: Infinity,
//                 absorbtionFactor: 1
//             }
// //             size: 120 / (1.01 ** (75 - 1)),
// //             width: 91.4 / (1.01 ** (75 - 1)),
// //             delay: 0,
// //             reload: 0.5,
// //             recoil: 0,
// //             isTrapezoid: true,
// //             trapezoidDirection: 0,
// //             addon: null,
// //             droneCount: 50,
// //             canControlDrones: true,
// //             bullet: {
// //                 type: "drone",
// //                 sizeRatio: 0.6,
// //                 health: 2.5,
// //                 damage: 10,
// //                 speed: 1.7,
// //                 scatterRate: 1,
// //                 lifeLength: 1,
// //                 absorbtionFactor: 1
// //             }
//         }));
//         this.barrels.push(new Barrel(this, {
//             angle: -Math.PI * 0.5,
//             offset: 0,
//             // Scale cuz direct
//             size: 120 / (1.01 ** (75 - 1)),
//             width: 91.4 / (1.01 ** (75 - 1)),
//             delay: 0,
//             reload: 5,
//             recoil: 0,
//             isTrapezoid: true,
//             trapezoidDirection: 0,
//             addon: null,
//             droneCount: 18,
//             canControlDrones: true,
//             bullet: {
//                 type: "drone",
//                 sizeRatio: 0.6,
//                 health: 2.5,
//                 damage: 35,
//                 speed: 1.7,
//                 scatterRate: 1,
//                 lifeLength: Infinity,
//                 absorbtionFactor: 1
//             }
//         }));
//         this.barrels.push(new Barrel(this, {
//             angle: Math.PI * 2,
//             offset: 0,
//             // Scale cuz direct
//             size: 120 / (1.01 ** (75 - 1)),
//             width: 91.4 / (1.01 ** (75 - 1)),
//             delay: 0,
//             reload: 5,
//             recoil: 0,
//             isTrapezoid: true,
//             trapezoidDirection: 0,
//             addon: null,
//             droneCount: 18,
//             canControlDrones: true,
//             bullet: {
//                 type: "drone",
//                 sizeRatio: 0.6,
//                 health: 2.5,
//                 damage: 35,
//                 speed: 1.7,
//                 scatterRate: 1,
//                 lifeLength: Infinity,
//                 absorbtionFactor: 1
//             }
//         }));
        this.health.values.health = this.health.values.maxHealth = 378000;
        this.movementSpeed = 1;
        this.physics.values.size = 300;
        this.sizeFactor = 300;
    }

    protected moveAroundMap() {
        super.moveAroundMap();
        this.position.angle = Math.atan2(this.inputs.movement.y, this.inputs.movement.x)
    }

    public tick(tick: number) {
        super.tick(tick);

//         if (this.ai.state !== AIState.possessed) {
//             this.inputs.flags = 0;
//         }
        this.inputs.flags = 0;
        this.position.angle += this.ai.passiveRotation*2;
    }
}
