import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../services/report.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../layout/components/services/alert.service';
import { AccessTokenService } from '../../../services/accesstoken.service';
import { ISearchOption } from '../../../interfaces/search-option.interface';

@Component({
  selector: 'app-report-productsales',
  templateUrl: './report-productsales.component.html',
  styleUrls: ['./report-productsales.component.css']
})
export class ReportProductsalesComponent {
  constructor(
    private reportService: ReportService,
    private router: Router,
    private alert: AlertService,
    private accessTokenService: AccessTokenService,
    private nativeRoute: ActivatedRoute
  ) {
    this.nativeRoute.params.forEach(query => {
      this.salesPorductReportId = query.id;
    });
    this.onInitailLoadSalesProductReport({});
  }

  salesPorductReportId: number;

  onInitailLoadSalesProductReport(options: ISearchOption) {
    this.reportService.onGetReportProductSales(options, this.salesPorductReportId, this.accessTokenService.getAccesstokenStore())
      .then(salesProductReport => {
        console.log(salesProductReport, "this");
      })
      .catch(err => this.alert.error_alert(err.Message));
  }
}
