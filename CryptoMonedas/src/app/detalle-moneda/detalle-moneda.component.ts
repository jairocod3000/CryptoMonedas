import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CryptoService } from '../crypto.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-detalle-moneda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-moneda.component.html',
  styleUrls: ['./detalle-moneda.component.css']
})
export class DetalleMonedaComponent implements OnInit, AfterViewInit {
  @ViewChild('chart') private chartContainer!: ElementRef<HTMLDivElement>;
  crypto: any;
  description: string = 'Descripción no disponible';

  constructor(private route: ActivatedRoute, private cryptoService: CryptoService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cryptoService.getCryptoDetails(id).subscribe(data => {
        this.crypto = data;
        this.setDescription(data.description);
      });
    }
  }

  ngAfterViewInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cryptoService.getCryptoHistory(id).subscribe(data => {
        this.drawChart(data.prices.map((item: [number, number]) => [new Date(item[0]), item[1]]));
      });
    }
  }

  drawChart(data: [Date, number][]) {
    const element = this.chartContainer.nativeElement;
    const svg = d3.select(element).append('svg');
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = element.offsetWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const g = svg.attr('width', width + margin.left + margin.right)
                 .attr('height', height + margin.top + margin.bottom)
                 .append('g')
                 .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime().rangeRound([0, width]);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    const line = d3.line<[Date, number]>()
      .x(d => x(d[0]))
      .y(d => y(d[1]));

    x.domain(d3.extent(data, d => d[0]) as [Date, Date]);
    y.domain([0, d3.max(data, d => d[1]) as number]);

    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Precio (€)');

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  }

  setDescription(description: any) {
    if (description.es) {
      this.description = description.es;
    } else if (description.en) {
      this.description = description.en;
    } else {
      this.description = 'Descripción no disponible';
    }
  }
}
