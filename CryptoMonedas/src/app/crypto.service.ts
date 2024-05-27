import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';
  private coinDetailUrl = 'https://api.coingecko.com/api/v3/coins/';
  private selectedCoinsKey = 'selectedCoins';
  
  private selectedCryptosSubject: BehaviorSubject<any[]>;
  selectedCryptos$: Observable<any[]>;

  constructor(private http: HttpClient) {
    const savedCoins = this.getSavedSelectedCoins();
    this.selectedCryptosSubject = new BehaviorSubject<any[]>(savedCoins);
    this.selectedCryptos$ = this.selectedCryptosSubject.asObservable();
  }

  getTopCryptos(): Observable<any> {
    const params = {
      vs_currency: 'eur',
      order: 'market_cap_desc',
      per_page: '50',
      page: '1',
      sparkline: 'false'
    };
    return this.http.get<any>(this.apiUrl, { params });
  }

  getCryptoDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.coinDetailUrl}${id}`);
  }

  getCryptoHistory(id: string, days: number = 30): Observable<any> {
    const historyUrl = `${this.coinDetailUrl}${id}/market_chart`;
    const params = {
      vs_currency: 'eur',
      days: days.toString(),
      interval: 'daily'
    };
    return this.http.get<any>(historyUrl, { params });
  }

  addCrypto(crypto: any) {
    const current = this.selectedCryptosSubject.value;
    const updated = [...current, crypto];
    this.selectedCryptosSubject.next(updated);
    this.saveSelectedCoins(updated);
  }

  removeCrypto(crypto: any) {
    const updated = this.selectedCryptosSubject.value.filter(c => c.id !== crypto.id);
    this.selectedCryptosSubject.next(updated);
    this.saveSelectedCoins(updated);
  }

  private saveSelectedCoins(coins: any[]): void {
    localStorage.setItem(this.selectedCoinsKey, JSON.stringify(coins));
  }

  private getSavedSelectedCoins(): any[] {
    const savedCoins = localStorage.getItem(this.selectedCoinsKey);
    return savedCoins ? JSON.parse(savedCoins) : [];
  }
}
