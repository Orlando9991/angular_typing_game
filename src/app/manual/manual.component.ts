import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { lorem } from 'faker';

@Component({
  selector: 'app-manual',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manual.component.html',
  styleUrl: './manual.component.css'
})

export class ManualComponent {
  title = 'TYPING CHALLENGE';
  randomText = '(Random Text Game) type every character';
  outputResult = '';
  inputTyping = '';
  disableTyping = true;
  finishCountDown = false;
  timer = 1000;
  currentTimer = 0;

  generateSentence(){
    this.randomText = lorem.sentence();
  }

  startCountDown(){
    this.finishCountDown = false;
    let everySecond = 10;
    this.currentTimer = this.timer-1;
    let countdown = setInterval(()=>{
      if(this.currentTimer>0){
        if(this.inputTyping == this.randomText){
          this.setSuccessTyping(true);
          this.finishGame();
          clearInterval(countdown);
          return;
        }
        this.currentTimer--;
      }else{
        this.finishGame();
        this.setSuccessTyping(false);
        clearInterval(countdown);
        return;
      }
    }, everySecond);
    this.disableTyping = false;
  }

  startGame(){
    this.generateSentence();
    this.startCountDown();
  }

  finishGame(){
    this.disableTyping = true;
    this.finishCountDown = true;
  }


  //Manual way
  onInput(input: string){
    this.inputTyping = input;
    if(this.randomText){
      const length = this.randomText.length;
      var documentSentence = document.getElementById("sentence")!;
      documentSentence.innerHTML="";

      for(let i=0; i<length; i++){
        if(!input.charAt(i)){
          this.changeCharacterColor(documentSentence, 'black', this.randomText.charAt(i));
        }else if(this.randomText.charAt(i)!=input.charAt(i)){
          this.changeCharacterColor(documentSentence, 'red', this.randomText.charAt(i));
        }else{
          this.changeCharacterColor(documentSentence, 'green', this.randomText.charAt(i));
        }
      }
    }
  }

  changeCharacterColor(parentDocument:HTMLElement, color:string, text:string){
    const spanTextColor = document.createElement("span");
    spanTextColor.innerText = text;
    spanTextColor.style.color = color;
    if(color == "green"){
      spanTextColor.style.textDecorationLine = "underline";
    }
    parentDocument.append(spanTextColor);
  }

  setSuccessTyping(success:boolean){
    if(success){
      let result = (this.randomText.length / ((this.timer - this.currentTimer)/100)).toFixed(2);
      this.outputResult = 'Success ' +result+' keys/second';
    }else{
      this.outputResult = 'Failure';
    }
  }
}

