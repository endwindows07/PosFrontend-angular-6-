import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/layout/components/services/alert.service';
import { AccessTokenService } from 'src/app/services/accesstoken.service';
import { ICostAndProfitList } from 'src/app/interfaces/report/report-costAndProfitList';
import { ISearchOption } from 'src/app/interfaces/search-option.interface';
import { Chart } from 'chart.js';
import { ICostAndProfit } from 'src/app/interfaces/report/report-costAndProfit';
import { IBestsalesList } from 'src/app/interfaces/report/report.bestsalesList.interface';
import { AppUrl } from 'src/app/app.url';
import { ProductUrl } from 'src/app/Product/product.url';
import { IRoleAccount } from 'src/app/interfaces/role';
import { AccountUrl } from 'src/app/account/account.url';
import { StockUrl } from 'src/app/stock/stock.url';
import { SalesUrl } from 'src/app/sales/sales.url';
import { ReportUrl } from '../../report.url';
import { OrderUrl } from 'src/app/order/order.url';

@Component({
  selector: 'app-report-dashboard',
  templateUrl: './report-dashboard.component.html',
  styleUrls: ['./report-dashboard.component.css']
})
export class ReportDashboardComponent {
  constructor(
    private reportService: ReportService,
    private router: Router,
    private alert: AlertService,
    private accessTokenService: AccessTokenService,
  ) {
    this.onInitailLoadOverviewThisMonth({
      Search_DefaultText: "SalesNow",
      Search_DefaultType: "SalesNow"
    });

    this.onInitailLoadOverviewThisDay({
      Search_DefaultText: "SalesDay",
      Search_DefaultType: "SalesDay"
    });

    this.onInitailloadProductBestSales({
      Start_Page: this.Start_Page,
      Limit_Page: this.Limit_Page,
      Search_DefaultText: "SalesNow",
      Search_DefaultType: "SalesNow"
    })

   }

  AppUrl = AppUrl;
  AccountUrl = AccountUrl;
  ProductUrl = ProductUrl;
  StockUrl = StockUrl;
  SalesUrl = SalesUrl;
  ReportUrl = ReportUrl;
  roleAccount = IRoleAccount;
  OrderUrl = OrderUrl;

  Start_Page: number = 1;
  Limit_Page: number = 10;

  Search_Text: string;
  Search_Type: string;
  Search_DefaultText: string;
  Search_DefaultType: string;
  
  totalSalesThisMonth: number;
  totalCostThisMonth: number;
  totalProfitThisMonth: number;


  LineChart = [];

  OverviewThisMonth: ICostAndProfitList = {
    costAndProfit_List: null,
    total_CostAndProfit: null
  };

  OverviewThisDay: ICostAndProfit[] = [];

  productBestSalesList: IBestsalesList;


  onInitailLoadOverviewThisMonth(options: ISearchOption) {

    this.reportService.onGetCostAndProfitSales(options, this.accessTokenService.getAccesstokenStore())
      .then(res => {

        this.OverviewThisMonth = res;

        let sales_Time = res.costAndProfit_List.map(res => res.sales_Time.split("T")[0]);
        let total_Sales = res.costAndProfit_List.map(res => res.total_Sales);
        let cost = res.costAndProfit_List.map(res => res.cost);
        let profit = res.costAndProfit_List.map(res => res.profit);

        this.totalSalesThisMonth = this.getSum(total_Sales);
        this.totalCostThisMonth = this.getSum(cost);
        this.totalProfitThisMonth = this.getSum(profit);

        console.log(this.totalSalesThisMonth, this.totalCostThisMonth, this.totalProfitThisMonth);

        this.onSetTotalSalesReportChart(sales_Time, total_Sales, cost, profit)
      })
      .catch(err => {
        this.alert.error_alert(err.Message);
      });
  }

  onInitailLoadOverviewThisDay(options: ISearchOption) {
    this.reportService.onGetCostAndProfitSales(options, this.accessTokenService.getAccesstokenStore())
      .then(res => {
        this.OverviewThisDay = res.costAndProfit_List;
        console.log(this.OverviewThisDay)
      })
      .catch(err => {
        this.alert.error_alert(err.Message);
      });
  }

  onInitailloadProductBestSales(option: ISearchOption) {
    this.reportService.onGetProductBestSales(option, this.accessTokenService.getAccesstokenStore())
      .then(bestSalesList => {
        this.productBestSalesList = bestSalesList;
      })
      .catch(err => {
        this.alert.error_alert(err.Message);
      });
  }

  private getSum(array: string[]){
    let answer: number = 0;
    for(let i = 0; i < array.length; i++ ){      
        answer += Number.parseInt(array[i]);;
    }
    return answer;
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
