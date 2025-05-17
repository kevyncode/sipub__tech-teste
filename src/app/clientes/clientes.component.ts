import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent {
  form: FormGroup;
  activeTab: 'geral' | 'endereco' | 'extras' | 'credito' = 'geral';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: [''],
      cpf: [''],
      rg: [''],
      cnpj: [''],
      nascimento: [''],
      contatos: this.fb.array([]),
      endereco: this.fb.group({
        logradouro: [''],
        numero: [''],
        complemento: [''],
        bairro: [''],
        cidade: [''],
        uf: [''],
        cep: [''],
      }),
      extras: this.fb.group({}),
      credito: this.fb.group({
        saldo: [''],
      }),
    });
  }

  setTab(tab: 'geral' | 'endereco' | 'extras' | 'credito') {
    this.activeTab = tab;
  }

  onSalvar() {
    console.log(this.form.value);
  }

  onNovo() {
    this.form.reset();
    this.activeTab = 'geral';
  }
}
