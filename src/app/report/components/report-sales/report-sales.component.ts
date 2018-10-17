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
import { ICostAndProfitList } from 'src/app/interfaces/report/report-costAndProfitList';
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
  ) {
    // this.onIitailLoadReportSales({
    //   Search_DefaultText: "SalesNow",
    //   Search_DefaultType: "SalesNow"
    // });

    this.onInitailLoadCostAndProfitSales({
      Search_DefaultText: "SalesNow",
      Search_DefaultType: "SalesNow"
    });
    this.Search_Type = "SalesTime";
  }

  Search_Text: string;
  Search_Type: string;
  Search_DefaultText: string;
  Search_DefaultType: string;
  
  CostAndProfitList: ICostAndProfitList = {
    costAndProfit_List: null,
    total_CostAndProfit: null
  };

  totalSalesReportList: IReportSaleList = {
    report_Count: null,
    reportSales_List: null 
  };

  LineChart = [];

  onClickSearch() {
    if(!this.Search_Text){
      this.onInitailLoadCostAndProfitSales({
        Search_DefaultText: "SalesNow",
        Search_DefaultType: "SalesNow",
      });
    } else {
      this.onInitailLoadCostAndProfitSales({
        Search_DefaultText: this.onDateCut(this.Search_Text[0].toString(), this.Search_Text[1].toString()),
        Search_DefaultType: this.Search_Type
      });
    }

  }

  onInitailLoadCostAndProfitSales(options: ISearchOption) {
    this.reportService.onGetCostAndProfitSales(options, this.accessTokenService.getAccesstokenStore())
            .then(res => {
              
              this.CostAndProfitList = res;

              let sales_Time = res.costAndProfit_List.map(res => res.sales_Time.split("T")[0]);

              let total_Sales = res.costAndProfit_List.map(res => res.total_Sales);

              let cost = res.costAndProfit_List.map(res => res.cost);

              let profit = res.costAndProfit_List.map(res => res.profit);

              this.onSetTotalSalesReportChart(sales_Time, total_Sales, cost, profit)
            })
            .catch(err => {
              this.alert.error_alert(err.Message);
            })
  }

  // onIitailLoadReportSales(options: ISearchOption) {
  //   this.reportService.onGetReportSales(options, this.accessTokenService.getAccesstokenStore())
  //     .then(reportSales => {
  //       this.totalSalesReportList = reportSales;
  //     })
  //     .catch(err => this.alert.error_alert(err.Message));
  // }

  onDateCut(dateTo: string, dateFrom: string) {
    return dateTo.replace(" GMT+0700 (เวลาอินโดจีน)", "") + "&" + dateFrom.replace(" GMT+0700 (เวลาอินโดจีน)", "");
  }

  onSetTotalSalesReportChart(sales_Time: string[], total_Price: string[], cost: string[], profir: string[]) {
    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: sales_Time,
        datasets: [{
          label: 'ยอดขาย',
          data: total_Price,
          // backgroundColor: '#4ecdc4',
          borderColor: '#8DB1AB',
          borderWidth: 1
        },
          {
            label: 'ต้นทุน',
            data: cost,
            borderColor: '#587792',
            borderWidth: 2
          },
          {
            label: 'กำไร',
            data: profir,
            // backgroundColor: '#4ecdc4',
            borderColor: '#3A678E',
            borderWidth: 3
          },
      ]
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

