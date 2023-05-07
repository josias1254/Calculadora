import { Component, DoCheck, HostListener } from '@angular/core';
import { EventType } from '@angular/router';

@Component({
	selector: 'app-check-sample',
	templateUrl: './Calculadora.component.html',
	styleUrls: ['./Calculadora.component.css'],
})
export class CalculadoraComponent implements DoCheck {
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
	porcento: number = 0;
	a: boolean = false;

	// 0 - vazio
	// 1 - soma
	// 2 - menos
	// 3 - multiplicacao
	// 4 - divisão

	operacao: number = 0;
	sinal: string = '';

	// Escuta os sinais de operações

	op(op: number) {
		if (this.operacao === 0) {
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
					this.sinal = 'x';
					break;

				case 4:
					this.operacao = 4;
					this.sinal = '÷';
					break;
			}
		} else {
			this.operar();
		}

		this.ficou = this.um;
	}

	// Calcula o que foi armazenado com base nos sinais escolhidos

	porcentagem() {
		if (this.dois.length !== 0) {
			if (this.operacao !== 0) {
				let resto = +this.ficou.join('').replace(',', '.');
				let numDois = +this.dois.join('').replace(',', '.');
				let numUm = +this.um.join('').replace(',', '.');

				switch (this.operacao) {
					case 1:
						this.porcento = numUm * (numDois / 100);
						break;
					case 2:
						this.porcento = numUm * (numDois / 100);
						break;
					case 3:
						this.porcento = numDois / 100;
						break;
					case 4:
						this.porcento = numDois / 100;
						break;
				}

				this.dois = this.porcento.toString().split(',');
				this.substituir = false;
				this.ficou = [];
				this.sinal = '%';
			}
		}
	}

	// Faz a mágica acontecer

	operar() {
		if (this.operacao !== 0) {
			this.sinal = '=';
			let resto = +this.ficou.join('').replace(',', '.');
			let numUm = +this.um.join('').replace(',', '.');
			let numDois = +this.dois.join('').replace(',', '.');

			if (this.ficou.length > 0) {
				numDois = numUm;
			}

			switch (this.operacao) {
				case 1:
					this.resultado = numUm + numDois;
					break;
				case 2:
					this.resultado = numUm - numDois;
					break;
				case 3:
					this.resultado = numUm * numDois;
					break;
				case 4:
					this.resultado = numUm / numDois;
					break;
			}

			this.resultado = +this.resultado.toFixed(2);
			this.substituir = false;
			this.operacao = 0;
			this.ficou = [];
		}
	}

	// Função "Clear"

	c() {
		this.operacao = 0;
		this.foi = false;
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
		if (this.foi === false) {
			switch (this.sinal) {
				case '':
					this.um = [];
					break;
				default:
					this.ficou = [];
					this.dois = [];
					this.apagar = true;
					break;
			}
		} else {
			this.c();
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
			this.operacao = 0;
			this.limpar = true;
			this.um = this.resultado.toString().split(',');
		}
	}

	// Mostra os números na tela

	ngDoCheck() {
		if (this.foi === false) {
			// Executa a cada ação no Document

			switch (this.sinal) {
				case '':
					this.tela = this.um
						.join('')
						.replace('.', ',')
						.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
					this.ultima = '';
					break;
				case '=':
					if (this.a === false) {
						this.ultima =
							this.ultima + ` ${this.tela.replace('.', '')} ${this.sinal}`;
					} else {
						this.ultima = `${this.ultima} ${this.sinal}`;
						this.a = false;
					}

					// Aparece apenas 2 decimais no resultado
					if (this.resultado % 1 != 0) {
						this.tela = this.resultado
							.toFixed(2)
							.replace('.', ',')
							.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
					} else {
						this.tela = this.resultado
							.toString()
							.replace('.', ',')
							.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
					}
					this.foi = true;
					this.sinal = '';
					break;
				case '%':
					let doiss = +this.dois.join('');
					this.ultima = `${this.ultima} ${doiss.toFixed(3).replace('.', ',')}`;
					this.tela = doiss.toFixed(3).replace('.', ',');
					this.ficou = [];
					this.a = true;
					break;
				default:
					this.ultima = `${this.um.join('').replace('.', ',')} ${this.sinal}`;

					// Remove o número que ficou e aparece a nova entrada

					if (this.substituir === false) {
						this.tela = this.um
							.join('')
							.replace('.', ',')
							.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
					} else {
						this.tela = this.dois
							.join('')
							.replace('.', ',')
							.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
					}
					break;
			}

			// Mantém o 0 Na tela quando não tem nada

			if (this.apagar === true) {
				this.tela = '';
				this.apagar = false;
			}
			if (this.tela === '') {
				this.tela = '0';
			}

			// Poe um 0 antes do ,
			if (this.um.length === 1 && this.um[this.um.length - 1] === ',') {
				this.um = [0, ','];
				this.tela = this.um.join('');
			}

			if (this.dois.length === 1 && this.dois[this.dois.length - 1] === ',') {
				this.dois = [0, ','];
				this.tela = this.dois.join('');
			}
		} else {
			this.um = this.resultado.toString().split(',');
			this.ultima = `${this.resultado.toString().replace('.', ',')} ${
				this.sinal
			}`;
			this.ficou = this.um;
			this.foi = false;
			this.dois = [];
		}
	}

	// Escuta os números do teclado

	@HostListener('document:keydown', ['$event'])
	handleKeyboardEvent(event: KeyboardEvent) {
		console.log(Number(event.key));

		if (Number(event.key)) {
			this.entra(event.key);
		} else {
			switch (event.key) {
				case '0':
					this.entra(0);
					break;

				case 'Backspace':
					this.backs();
					break;
				case 'Escape':
					this.c();
					break;
				case 'Enter':
					this.operar();
					break;
				case '=':
					this.operar();
					break;
				case ',':
					this.entra('.');
					break;

				case '+':
					this.op(1);
					break;
				case '-':
					this.op(2);
					break;
				case '*':
					this.op(3);
					break;
				case '/':
					this.op(4);
					break;
				case '%':
					this.porcentagem();
					break;
			}
		}
	}

	// Escuta os números do UI

	entra(caractere: any) {
		if (this.tela === '0') {
			this.limpar = true;
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
		}
	}
}
