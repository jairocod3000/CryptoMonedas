import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoService } from '../crypto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  cryptos: any[] = [];
  selectedCryptos: any[] = [];

  constructor(private cryptoService: CryptoService, private router: Router) { }

  ngOnInit() {
    this.cryptoService.getTopCryptos().subscribe((data) => {
      this.cryptos = data;
    });

    this.cryptoService.selectedCryptos$.subscribe(selectedCryptos => {
      this.selectedCryptos = selectedCryptos;
    });
  }

  toggleSelectCrypto(crypto: any) {
    if (this.isSelected(crypto)) {
      this.cryptoService.removeCrypto(crypto);
    } else {
      this.cryptoService.addCrypto(crypto);
    }
  }

  isSelected(crypto: any): boolean {
    return this.selectedCryptos.some(c => c.id === crypto.id);
  }

  goToDetail(id: string) {
    this.router.navigate(['/detalle', id]);
  }
}
