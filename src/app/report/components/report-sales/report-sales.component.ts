import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../layout/components/services/alert.service';
import { AccessTokenService } from '../../../services/accesstoken.service';
import { FormBuilder } from '@angular/forms';
import { IReportSaleList } from '../../../interfaces/report/report-salesList';
import { ReportService } from '../../../services/report.service';
import { ISearchOption } from '../../../interfaces/search-option.interface';
import { ISalesList } from '../../../interfaces/sales/sales-list.interface';
import { IReportSales } from '../../../interfaces/report/report-sales.interface';
import { Chart } from 'chart.js';
declare let ctx;

@Component({
  selector: 'app-report-sales',
  templateUrl: './report-sales.component.html',
  styleUrls: ['./report-sales.component.css']
})
export class ReportSalesComponent {
  constructor(
    private reportService: ReportService,
    private router: Router,
    private alert: AlertService,
    private accessTokenService: AccessTokenService,
    private builder: FormBuilder
  ) {
    this.onIitailLoadReportSales({
      Search_DefaultText: "SalesNow",
      Search_DefaultType: "SalesNow"
    });
    this.Search_Type = "SalesTime";
  }

  Search_Text: string;
  Search_Type: string;

  totalSalesReportList: IReportSaleList = {
    report_Count: null,
    reportSales_List: null
  };

  LineChart = [];

  onClickSearch() {

    this.LineChart = null;

    if(!this.Search_Text){
      this.onIitailLoadReportSales({
        Search_DefaultText: "SalesNow",
        Search_DefaultType: "SalesNow",
      });
    } else {
      this.onIitailLoadReportSales({
        Search_Text: this.onDateCut(this.Search_Text[0].toString(), this.Search_Text[1].toString()),
        Search_Type: this.Search_Type
      });
    }
  }

  onIitailLoadReportSales(options: ISearchOption) {
    this.reportService.onGetReportSales(options, this.accessTokenService.getAccesstokenStore())
      .then(reportSales => {

        this.totalSalesReportList = reportSales;
        let sales_Time = reportSales.reportSales_List.map(res => res.sales_Time);

        let total_Price = reportSales.reportSales_List.map(res => res.total_Price);;

        this.onSetTotalSalesReportChart(sales_Time, total_Price)

      })
      .catch(err => this.alert.error_alert(err.Message));
  }

  onDateCut(dateTo: string, dateFrom: string) {
    return dateTo.replace(" GMT+0700 (เวลาอินโดจีน)", "") + "&" + dateFrom.replace(" GMT+0700 (เวลาอินโดจีน)", "");
  }

  onSetTotalSalesReportChart(sales_Time: string[], total_Price: string[]) {
    this.LineChart = new Chart('lineChart', {
      type: 'bar',
      data: {
        labels: sales_Time,
        datasets: [{
          label: 'รายงานยอดขาย',
          data: total_Price,
          backgroundColor: '#4ecdc4',
          borderColor: '#f2f2f2',
          borderWidth: 1
        }]
      },
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

