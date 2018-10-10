import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../services/report.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../layout/components/services/alert.service';
import { AccessTokenService } from '../../../services/accesstoken.service';
import { ISearchOption } from '../../../interfaces/search-option.interface';
import { Chart } from 'chart.js';
import { IReportSaleList } from '../../../interfaces/report/report-salesList';
import { IReportSalesProductList } from '../../../interfaces/report/report-salesProductList';
import { IProduct } from 'src/app/interfaces/Product/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { IReportSalesProduct } from 'src/app/interfaces/report/report-salesProduct';

@Component({
  selector: 'app-report-productsales',
  templateUrl: './report-productsales.component.html',
  styleUrls: ['./report-productsales.component.css']
})
export class ReportProductsalesComponent implements OnInit {


  constructor(
    private reportService: ReportService,
    private productService: ProductService,
    private router: Router,
    private alert: AlertService,
    private accessTokenService: AccessTokenService,
    private nativeRoute: ActivatedRoute
  ) {
    this.nativeRoute.params.forEach(query => {
      this.salesPorductReportId = query.id;
    });
    this.onInitailLoadProduct({
      Start_Page: 0,
      Limit_Page: 0
    });

    this.onInitailLoadSalesProductReport({
      Search_DefaultText: "SalesNow",
      Search_DefaultType: "SalesNow"
    });

    this.Search_Type = "SalesTime";
  }

  salesPorductReportId: number;
  salesProductReportList: IReportSalesProductList[] = [];

  products: IProduct[] = [];
  productsSelect: IProduct[] = [];

  productBarcodeSearch: string;

  Search_Text: string;
  Search_Type: string;
  LineChart = [];

  ngOnInit(): void {
    this.onSetChart();
  }

  onInitailLoadProduct(options: ISearchOption) {
    this.productService.onGetProduct(options, this.accessTokenService.getAccesstokenStore())
      .then(res => {
        this.products = res.product_List;
      });
  }


  onSearchProduct() {
    let product: IProduct;
    product = this.products.find(
      it => it.barcode == this.productBarcodeSearch.trim()
    );
    if (product) return this.onInsertProductSelect(product);
    return;
  }

  onInsertProductSelect(product: IProduct) {
    this.productBarcodeSearch = "";
    let productItem = this.productsSelect.find(it => it.id == product.id);
    if (!productItem) {
      this.productsSelect.unshift(product);

      this.onInitailLoadSalesProductReport({
        Search_DefaultText: "SalesNow",
        Search_DefaultType: "SalesNow"
      })
      return;
    }
    this.alert.error_alert('มีข้อมูลสินค้าอยู่แล้ว');
  }

  onRemoveProductSelected(index: number) {
    this.productsSelect.splice(index, 1);
  }

  onInitailLoadSalesProductReport(options: ISearchOption) {
    this.productsSelect.forEach(it => {
      this.reportService.onGetReportProductSales(options, it.id, this.accessTokenService.getAccesstokenStore())
        .then(salesProductReport => {
          this.salesProductReportList.push(salesProductReport);

        })
        .catch(err => this.alert.error_alert(err.Message));
    })
  }
  onSearchSalesProductTime() {
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
    this.onLoadProductSelectToChart();
  }

  onLoadProductSelectToChart() {
    this.salesProductReportList.forEach(it => {
      let sales_Time: string[] = it.salesProduct_List.map(it => it.sales_Time);
      let sales_Count: string[] = it.salesProduct_List.map(it => it.sales_Count);
      this.onSetChart(sales_Time, sales_Count);
    });
  }

  onSetChart(sales_Time: string[], sales_Count: string[] ) {
    this.LineChart = new Chart('lineChart', {
      type: 'bar',
      data: {
        labels: sales_Time,
        datasets: [{
          label: '# of Votes',
          data: sales_Count
        }
        ],
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




  onDateCut(dateTo: string, dateFrom: string) {
    return dateTo.replace(" GMT+0700 (เวลาอินโดจีน)", "") + "&" + dateFrom.replace(" GMT+0700 (เวลาอินโดจีน)", "");
  }
}
