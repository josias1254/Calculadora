import { Component } from '@angular/core';
import { CalculadoraComponent } from "./Calculadora/Calculadora.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Calculadora';
	isAliveCheckSample:boolean = true;
}
