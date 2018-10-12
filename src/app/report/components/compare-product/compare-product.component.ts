import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/layout/components/services/alert.service';
import { AccessTokenService } from 'src/app/services/accesstoken.service';
import { IReportSalesProductList } from 'src/app/interfaces/report/report-salesProductList';
import { IProduct } from 'src/app/interfaces/Product/product.interface';
import { ISearchOption } from 'src/app/interfaces/search-option.interface';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-compare-product',
  templateUrl: './compare-product.component.html',
  styleUrls: ['./compare-product.component.css']
})
export class CompareProductComponent implements OnInit {

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
    let ProdoctBarcodeItem: string[] = [];
    let productItem = this.productsSelect.find(it => it.id == product.id);

    if (!productItem) {
      this.productsSelect.unshift(product);
      return;
    }
    this.alert.error_alert('มีข้อมูลสินค้าอยู่แล้ว');
  }

  onRemoveProductSelected(index: number) {
    this.productsSelect.splice(index, 1);
  }

  onInitailLoadSalesProductReport(options: ISearchOption) {
    this.reportService.onCompareProductSales(options, this.accessTokenService.getAccesstokenStore())
      .then(salesProductReport => {

        let sales_TimeP1: string[] = salesProductReport.salesProduct_First.map(it => it.sales_Time);
        let sales_CountP1: string[] = salesProductReport.salesProduct_First.map(it => it.sales_Count);

        let sales_TimeP2: string[] = salesProductReport.salesProduct_Second.map(it => it.sales_Time);
        let sales_CountP2: string[] = salesProductReport.salesProduct_Second.map(it => it.sales_Count);

        if (sales_TimeP1.length > sales_TimeP2.length) {
          this.onSetChart(sales_TimeP1, sales_CountP1, sales_CountP2);
        } else {
          this.onSetChart(sales_TimeP2, sales_CountP1, sales_CountP2);
        }
      })
      .catch(err => this.alert.error_alert(err.Message));

  }

  onSearchSalesProductTime() {
    let ProdoctBarcodeItem: string[] = [];
    this.productsSelect.forEach(it => {
      ProdoctBarcodeItem.push(it.barcode);
    })

    if (!this.Search_Text) {
      this.onInitailLoadSalesProductReport({
        Search_DefaultText: "SalesNow",
        Search_DefaultType: "SalesNow",
        Search_FirstProdoctBarcode: ProdoctBarcodeItem[0],
        Search_SecondProdoctBarcode: ProdoctBarcodeItem[1]
      });
    } else {
      this.onInitailLoadSalesProductReport({
        Search_Text: this.onDateCut(this.Search_Text[0].toString(), this.Search_Text[1].toString()),
        Search_Type: this.Search_Type,
        Search_FirstProdoctBarcode: ProdoctBarcodeItem[0],
        Search_SecondProdoctBarcode: ProdoctBarcodeItem[1]
      });
    }
    this.onLoadProductSelectToChart();
  }

  onLoadProductSelectToChart() {
    this.salesProductReportList.forEach(it => {
      let sales_Time: string[] = it.salesProduct_List.map(it => it.sales_Time);
      let sales_Count: string[] = it.salesProduct_List.map(it => it.sales_Count);
      // this.onSetChart(sales_Time, sales_Count);
    });
  }

  onSetChart(sales_Time?: string[], sales_CountP1?: string[], sales_CountP2?: string[]) {
    this.LineChart = new Chart('lineChart', {
      type: 'bar',
      data: {
        labels: sales_Time,
        datasets: [{
          label: '# สินค้าที่หนึ่ง',
          data: sales_CountP1,
          backgroundColor: "#3e95cd",
        },
        {
          label: '# สินค้าที่สอง',
          data: sales_CountP2,
          backgroundColor: "#fcb322",
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
