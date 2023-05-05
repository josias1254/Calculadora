import { Component, DoCheck, HostListener} from '@angular/core';

@Component({
	selector: 'app-check-sample',
	templateUrl: './check-sample.component.html',
	styleUrls: ['./check-sample.component.css'],
})
export class CheckSampleComponent implements DoCheck {
	// Calculadora

	tela = '';
	ultima = '';
	ficou: number[] = [];
	um: any[] = [];
	dois: any[] = [];
	resultado: number = 0;
	foi: boolean = false;
	substituir: boolean = false;
	limpar: boolean = false;
	apagar: boolean = false;
	porcento:number = 0;
	a: boolean = false;


	// 0 - vazio
	// 1 - soma
	// 2 - menos
	// 3 - multiplicacao
	// 4 - divisão
	// 5 - porcentagem

	operacao: number = 0;
	sinal: string = '';

	// Escuta os sinais de operações

	op(op: number) {
		switch (op) {
			case 1:
				this.operacao = 1;
				this.sinal = '+';
				break;

			case 2:
				this.operacao = 2;
				this.sinal = '-';
				break;

			case 3:
				this.operacao = 3;
				this.sinal = '*';
				break;

			case 4:
				this.operacao = 4;
				this.sinal = '/';
				break;

			case 5:
			this.porcentagem();

			break
		}

		this.ficou = this.um;

	}

	// Calcula o que foi armazenado com base nos sinais escolhidos

porcentagem(){
	if (this.dois.length !== 0){
	if (this.operacao !== 0) {
		let resto = +this.ficou.join('').replace(",", ".");
		let numDois = +this.dois.join('').replace(",", ".");
		let numUm = +this.um.join('').replace(",", ".");

		switch (this.operacao) {
			case 1:
				this.porcento = numUm * (numDois / 100);
				break;
			case 2:
				this.porcento = numUm * (numDois / 100);
				break;
			case 3:
				this.porcento = (numDois / 100) ;
				break
			case 4:
				this.porcento = (numDois / 100) ;
				break
		}






		this.dois = this.porcento
		.toString()
		.split(',');
		this.substituir = false;
		this.ficou = [];
		this.sinal = '%'
	}

}
}

	operar() {
		if (this.operacao !== 0) {

			this.sinal = '=';
			let resto = +this.ficou.join('').replace(",", ".");
			let numUm = +this.um.join('').replace(",", ".");
			let numDois = +this.dois.join('').replace(",", ".");

			if (this.ficou.length > 0){
				numDois = numUm
			}


			switch (this.operacao) {
				case 1:
					this.resultado = numUm + numDois ;
					break;
				case 2:
					this.resultado = numUm -  numDois ;
					break;
				case 3:
					this.resultado = numUm  * numDois ;
					break
				case 4:
					this.resultado = numUm / numDois ;
					break
			}

			this.resultado = +this.resultado.toFixed(2);
			this.substituir = false;
			this.operacao = 0;
			this.ficou = [];
		}


	}

	// Função "Clear"

	c() {
		this.foi = false;
		this.operacao = 0;
		this.um = [];
		this.dois = [];
		this.sinal = '';
		this.ultima = '';
		this.ficou = [];
		this.substituir = false;
		this.a = false;

	}

	// Função "Clear Entry"

	ce() {
		if (this.foi === false){
		switch (this.sinal) {
			case '':
				this.um = [];
				break;
				default:
					this.ficou = [];
					this.dois = [];
					this.apagar = true;
					break
		}}else {
			this.c()
		}
	}

	// Backspace
	backs() {
		if (this.foi === false) {
			switch (this.sinal) {
				case '':
					this.um.pop();
					break;
				default:
					this.dois.pop();
					break;
			}
		} else {
			this.foi = false;
			this.ultima = '';
			this.dois = [];
			this.um = this.resultado
				.toString()
				.split(',');
			this.operacao = 0;
			this.limpar = true;
		}
	}

	// Mostra os números na tela

	ngDoCheck() {




		if (this.foi === false) {
			switch (this.sinal) {
				case '':
					this.tela = this.um.join('').replace(".", ",").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
					this.ultima = '';
					break;
				case '=':

if (this.a === false){
	this.ultima += this.tela.replace(".", "a") + this.sinal;
} else {
	this.ultima += this.sinal;
	this.a = false;
}


					if (this.resultado % 1 != 0){
					this.tela = this.resultado.toFixed(2).toString().replace(".", ",").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
				} else {
					this.tela = this.resultado.toString().replace(".", ",").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
				}
					this.foi = true;
					this.sinal = '';
					break;
				case '%':
					this.ultima += this.dois.join('').replace(".", ",");
					this.tela = this.dois.join('').replace(".", ",");
					this.ficou = []
					this.a = true;
					break;
				default:
					this.ultima = this.um.join('').replace(".", ",") + this.sinal;
					if (this.substituir === false) {
						this.tela = this.um.join('').replace(".", ",").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
					} else {

						this.tela = this.dois.join('').replace(".", ",").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
					}

					break;
			}


			if (this.apagar === true){
				this.tela = '';
				this.apagar = false;
			}
			if (this.tela === ''){
				this.tela = '0';
			}
			if (this.um.length === 1 && this.um[this.um.length - 1] === ','){
				this.um = [0 , ',']
				this.tela = this.um.join('')
			}

			if (this.dois.length === 1 && this.dois[this.dois.length - 1] === ','){
				this.dois = [0 , ',']
				this.tela = this.dois.join('')
			}

		} else {


			this.um = this.resultado
			.toString()
			.split(',');
			this.ultima = this.resultado.toString().replace(".", ",") + this.sinal;
			this.ficou = this.um;
			this.foi = false;
			this.dois = [];
		}

	}

	// Escuta os números


 // Teclado
	@HostListener('document:keydown')
  onDocumentKeydown() {
		this.operar()
  }


// UI

	entra(caractere:any) {

		if ( this.tela === '0'){
			this.limpar = true
		}
		if (this.foi === false) {
			if (this.operacao === 0) {
				if (this.limpar === true) {
					this.um = [];
					this.um.push(caractere);
					this.limpar = false;
				} else {
					this.um.push(caractere);
				}
			} else {
				this.dois.push(caractere);
				this.substituir = true;
				this.ficou = [];
			}
		} else {
			this.c();
			this.um.push(caractere);
		}}

	}

