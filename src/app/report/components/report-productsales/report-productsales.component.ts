import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../services/report.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../layout/components/services/alert.service';
import { AccessTokenService } from '../../../services/accesstoken.service';
import { ISearchOption } from '../../../interfaces/search-option.interface';
import { Chart } from 'chart.js';
import { IReportSaleList } from '../../../interfaces/report/report-salesList';
import { IReportSalesProductList } from '../../../interfaces/report/report-salesProductList';

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
    this.onInitailLoadSalesProductReport({
      Search_DefaultText: "SalesNow",
      Search_DefaultType: "SalesNow"
    });
    this.Search_Type = "SalesTime";
  }

  salesPorductReportId: number;
  salesProductReportList:  IReportSalesProductList[] = [];

  Search_Text: string;
  Search_Type: string;
  LineChart = [];

  onClickSearch() {
    if (!this.Search_Text) {
      this.onInitailLoadSalesProductReport({
        Search_DefaultText: "SalesNow",
        Search_DefaultType: "SalesNow",
      });
    } else {
      this.onInitailLoadSalesProductReport({
        Search_Text: this.onDateCut(this.Search_Text[0].toString(), this.Search_Text[1].toString()),
        Search_Type: this.Search_Type
      });
    }
  }

  onInitailLoadSalesProductReport(options: ISearchOption) {
    this.reportService.onGetReportProductSales(options, this.salesPorductReportId, this.accessTokenService.getAccesstokenStore())
      .then(salesProductReport => {
        this.salesProductReportList.unshift(salesProductReport);

        let sales_Time = salesProductReport.salesProduct_List.map(it => it.sales_Time);
        let sales_Count = salesProductReport.salesProduct_List.map(it => it.sales_Count);
        this.onSetTotalSalesReportChart(sales_Time, sales_Count);
      })
      .catch(err => this.alert.error_alert(err.Message));
  }

  onDateCut(dateTo: string, dateFrom: string) {
    return dateTo.replace(" GMT+0700 (เวลาอินโดจีน)", "") + "&" + dateFrom.replace(" GMT+0700 (เวลาอินโดจีน)", "");
  }

  onSetTotalSalesReportChart(sales_Time: string[], sales_Count: string[], nameProduct?: string) {
    this.LineChart = new Chart('lineChart', {
      type: 'bar',
      data: {
        labels: sales_Time,
        datasets: [
          {
            label: 'รายงานยอดขาย',
            data: sales_Count,
            backgroundColor: '#4ecdc4',
            borderColor: '#f2f2f2',
            borderWidth: 1
          }
      ]},
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
