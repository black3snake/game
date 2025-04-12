import {Snake} from "./snake.js";
import {Food} from "./food.js";

export class Game {
    context = null;
    positionsCount = null;
    positionsSize = null;
    snake = null;
    food = null;
    score = 0;
    scoreElement = null;
    canvasElement = null;
    interval = null;
    pauseGameFlag = false;
    constructor(context, settings) {
        this.context = context;
        this.positionsCount = settings.positionsCount;
        this.positionsSize = settings.positionsSize;

        document.getElementById('start').addEventListener('click', (e) => {
            this.startGame();
        })
        document.getElementById('pause').addEventListener('click', (e) => {
            this.pauseGame();
        })
        this.canvasElement = document.getElementById('gridCanvas');
        this.scoreElement = document.getElementById('score');
    }


    startGame() {
        if (this.interval) {
            clearInterval(this.interval);
            this.score = 0;
            this.scoreElement.innerText = this.score;
        }

        this.food = new Food(this.context, this.positionsCount, this.positionsSize);
        this.snake = new Snake(this.context, this.positionsCount, this.positionsSize);
        this.food.setNewFoodPosition();
        this.interval = setInterval(this.gameProcess.bind(this), 150)

    }

    pauseGame() {
        if (!this.pauseGameFlag) {
            clearInterval(this.interval);
            this.pauseGameFlag = true;
        } else {
            this.interval = setInterval(this.gameProcess.bind(this), 150)
            this.pauseGameFlag = false;
        }

    }

    gameProcess() {
        this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.showGrid();
        this.food.showFood();
        let result = this.snake.showSnake(this.food.foodPosition);
        if (result) {
            if (result.collision) {
                this.endGame();
            } else if (result.gotFood) {
                this.score += 1;
                this.scoreElement.innerText = this.score;
                this.food.setNewFoodPosition();
            }
        }
    }

    endGame() {
        clearInterval(this.interval);

        this.context.fillStyle = 'black';
        this.context.font = 'bold 48px Arial';
        this.context.textAlign = 'center';
        this.context.fillText('Вы набрали: ' + this.score + ' очков!',
            (this.positionsCount * this.positionsSize) / 2, (this.positionsCount * this.positionsSize) / 2);

    }

    showGrid() {
        // Draw vertical lines
        for (let x = 0; x <= this.canvasElement.width; x += this.positionsSize) {
            this.context.moveTo(x, 0);
            this.context.lineTo(x, this.canvasElement.height);
        }

        // Draw horizontal lines
        for (let y = 0; y <= this.canvasElement.height; y += this.positionsSize) {
            this.context.moveTo(0, y);
            this.context.lineTo(this.canvasElement.width, y);
        }

        this.context.strokeStyle = '#ccc'; // Set the color for grid lines
        this.context.stroke(); // Draw the lines
    }
}