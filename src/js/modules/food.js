import {Random} from "../utils/random.js";

export class Food {

    radius = null;
    context = null;
    positionsCount = null;
    positionsSize = null;
    foodPosition = {
        x: 1,
        y: 1
    }

    constructor(context, positionsCount, positionsSize) {
        this.context = context;
        this.positionsCount = positionsCount;
        this.positionsSize = positionsSize;

        this.radius = this.positionsSize / 2;
    }

    setNewFoodPosition() {
        this.foodPosition = {
            x: Random.getRandomInt(1, this.positionsCount),
            y: Random.getRandomInt(1, this.positionsCount),
        }
    }


    showFood() {
        this.context.fillStyle = 'white';
        this.context.beginPath();
        this.context.arc(this.foodPosition.x * this.positionsSize - this.radius,
            this.foodPosition.y * this.positionsSize - this.radius, this.radius, 0, 2 * Math.PI);
        this.context.fill();
    }

}