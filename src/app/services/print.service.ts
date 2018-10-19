import { Injectable } from "@angular/core";

@Injectable(
    
)

export class PrintBill{
    onPrint(){
        let printContents, popupWin;
        printContents = document.getElementById('print-section').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
            table {
                width: 100%;
                border-collapse: collapse;
            }
            th {
                height: 50px;
                text-align: left;
            }
            th, td {
                border-bottom: 1px solid #ddd;
                border: 1px solid black;
                padding: 2% 0% 2% 2%;
            }
            tbody {
              margin-bottom: 15pxl
            }
            .m-t-30  {
              margin-left: 80%;
                text-align: right;
            }
            .top {
              margin-left: 65%;
                text-align: right;

            }
            .hided {
              visibility: hidden;
            }
          </style>
        </head>
        <body onload="window.print();window.close()">
          ${printContents}
        </body>
      </html>`
        );
        popupWin.document.close();
    }
}