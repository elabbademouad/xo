import React from 'react';
import Cell from './cell';
import Player from './player';
import './game.css';

class Game extends React.Component{

    constructor(){
        super();
        this.state = {'grid':[], 'scores':""};
        this.playerX = new Player("Mouad", "cell-x");
        this.playerO = new Player("Yahya", "cell-o");
        this.gameOver = false;
        this.init = this.init.bind(this);
        this.init();
    }

    init(){
        var grid = [];
        for (let i = 0; i < 3; i++) {
            var cell = [];
            for (let j = 0; j < 3; j++) {
                cell.push(new Cell(i, j, "cell"))
            }
            grid.push(cell);
        }
        this.state.grid = grid;

        this.currentPlayer = this.playerX;
    }

    onClick(param){
        if(!this.gameOver){
            if(param.className == "cell"){
                var items=this.state.grid;
                var selectedCell=items[param.x][param.y];
                selectedCell.className = this.currentPlayer.className;
                this.currentPlayer.cells.push(param);
                
                
                this.setState({'grid':items});
                this.gameOver = this.checkResult();
                this.currentPlayer = (!this.gameOver && this.currentPlayer == this.playerX) ? this.playerO : this.playerX;
            }
        }
        else{
            this.reset();
            this.updateScore();
        }
    }

    reset(){

    }

    updateScore(){
        this.currentPlayer.score++;
        this.setState({"Score":"Player O Score : " + this.playerO.score + ", Player Y Score : " + this.playerX.score})
    }

    checkResult(){
        var cells = this.currentPlayer.cells;  
        var cpD1 = 0;
        var cpD2 = 0;
            for (let i = 0; i < cells.length; i++) {
                var cpX = 0;
                var cpY = 0;


                for(let j = 0; j < cells.length; j++){
                    if(cells[i].x == cells[j].x) cpX++;
                    if(cells[i].y == cells[j].y) cpY++;
                }
    
                if(cells[i].y == cells[i].x) cpD1++;
                if(2-cells[i].y == cells[i].x) cpD2++;
            }
            if(cpX==3 ||cpY==3 || cpD1==3 ||cpD2 ==3 )
                return true;
            return false;
            
    }

    display(){
        const element = this.state.grid.map((row,index)=>
            <tr key={index}>
                {row.map((cell,index2)=>
                    <td key={index2} >
                        <div onClick={this.onClick.bind(this, cell)} className={'cell ' + cell.className}>
                        </div>
                    </td>
                )}
            </tr>
        );
        return element;
    }

    render(){
        return (
            <div>
            <h1>{this.state.scores}</h1>
                <p>{this.currentPlayer.name}, Your turn right now.</p>
                <table>{this.display()}</table>
                
            </div>
        );
    }


}



export default Game;