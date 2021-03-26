import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ExportService } from '../../services/export.service';


@Component({
  selector: 'app-buro-credito',
  templateUrl: './buro-credito.component.html',
  styleUrls: ['./buro-credito.component.css']
})
export class BuroCreditoComponent implements OnInit {

  @ViewChild('printcontainer') printableElement: ElementRef; //referencia a la tabla a exportar



  constructor(public exportService: ExportService) { }

  ngOnInit(): void {
  }

  exportarPdf() {
    this.exportService.exportToPdf(this.printableElement, 'user_data');
  }
}
