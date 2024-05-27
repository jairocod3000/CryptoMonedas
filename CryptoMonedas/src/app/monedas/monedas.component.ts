import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CryptoService } from '../crypto.service';

@Component({
  selector: 'app-monedas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monedas.component.html',
  styleUrls: ['./monedas.component.css']
})
export class MonedasComponent implements OnInit {
  selectedCryptos: any[] = [];

  constructor(private cryptoService: CryptoService, private router: Router) {}

  ngOnInit() {
    this.cryptoService.selectedCryptos$.subscribe(selectedCryptos => {
      this.selectedCryptos = selectedCryptos;
    });
  }

  removeCrypto(crypto: any) {
    this.cryptoService.removeCrypto(crypto);
  }

  goToDetail(id: string) {
    this.router.navigate(['/detalle', id]);
  }
}
