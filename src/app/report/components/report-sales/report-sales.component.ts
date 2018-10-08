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
import {Chart} from 'chart.js';
declare let ctx;

@Component({
  selector: 'app-report-sales',
  templateUrl: './report-sales.component.html',
  styleUrls: ['./report-sales.component.css']
})
export class ReportSalesComponent implements OnInit  {
  constructor (
    private reportService: ReportService,
    private router: Router,
    private alert: AlertService,
    private accessTokenService: AccessTokenService,
    private builder: FormBuilder
    ) {
      this.onIitailLoadReportSales({
        Search_DefaultText: "now",
        Search_DefaultType: "SalesNow"
      });
    }
    
    start_Page: number = 0;
    limit_Page: number = 0;
    
    totalSalesReportList: IReportSaleList = {
      report_Count: null,
      reportSales_List: null
    };
    
    LineChart = [];

      ngOnInit() {

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

  onSetTotalSalesReportChart(sales_Time: string[], total_Price: string[]){
    this.LineChart = new Chart('lineChart',{
      type: 'bar',
        data: {
          labels: sales_Time,
          datasets: [{
            label: 'รายงานยอดขาย',
            data: total_Price,
            backgroundColor: '#4ecdc4',
            borderColor: '#3cba9f',
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
  
  