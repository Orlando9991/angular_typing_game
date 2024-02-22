import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { lorem } from 'faker';

@Component({
  selector: 'app-automatic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './automatic.component.html',
  styleUrl: './automatic.component.css'
})
export class AutomaticComponent {
  title = 'TYPING CHALLENGE';
  randomText = '(Random Text Game) type every character';
  outputResult = '';
  inputTyping = '';
  successTyping = false;
  disableTyping = true;
  finishCountDown = false;
  timer = 200;
  currentTimer = 0;

  generateSentence(){
    this.randomText = lorem.sentence();
  }

  startGame(){
    this.disableTyping = false;
    this.finishCountDown = false;
    this.successTyping = false;
    this.generateSentence();
    this.startCountDown();
  }

  startCountDown(){
    let everySecond = 10;
    this.currentTimer = this.timer;
    let countdown = setInterval(()=>{
      if(this.currentTimer>0){
        if(this.successTyping){
          this.finishGame();
          clearInterval(countdown);
        }
        this.currentTimer--;
      }else{
        this.finishGame();
        this.setSuccessTyping(this.successTyping);
        clearInterval(countdown);
        return;
      }
    }, everySecond);
  }

  onInput(input: string){
    this.inputTyping = input;
    if(this.inputTyping === this.randomText){
      this.finishGame();
      this.setSuccessTyping(true);
    }
  }

  finishGame(){
    this.disableTyping = true;
    this.finishCountDown = true;
  }

  setSuccessTyping(success:boolean){
    if(success){
      this.successTyping = true;
      let result = (this.randomText.length / ((this.timer - this.currentTimer)/100)).toFixed(2);
      this.outputResult = 'Success ' +result+' keys/second';
    }else{
      this.successTyping = true;
      this.outputResult = 'Failure';
    }
  }

  compareCharacters(charInput:string, charRandom:string): string{
    let correct = "has-text-success is-underlined";
    let incorrect = "has-text-danger";

    if(!charInput){
      return "";
    }
    return charInput == charRandom ? correct : incorrect;
  }
}
