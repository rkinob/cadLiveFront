import { ElementRef, Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
//import * as _  from 'lodash';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {
  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    // console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });

    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }



  public exportAsExcelFileHTML(textoHtml: any, excelFileName: string):void{


    var tab_text = textoHtml;

    tab_text = tab_text.replace(/°/g, " ");  // remove °
    tab_text = tab_text.replace(/º/g, " ");  // remove º
    //tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");          //remove links table
    //tab_text = tab_text.replace(/<img[^>]*>/gi, "");             // remove images
    //tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // remove input parametros
    ////tab_text = tab_text.replace(/^([A-Za-z ])$/g, "");          //apenas letras

    var fileName = excelFileName + '_export_' + new Date().getTime() + '.xls'
    var exceldata = new Blob([tab_text], { type: EXCEL_TYPE })

    FileSaver.saveAs(exceldata, fileName)
/*
    if (window.navigator.msSaveBlob) { // IE 10+
        window.navigator.msSaveOrOpenBlob(exceldata, fileName);

        //$scope.DataNullEventDetails = true;
    } else {
        var link = document.createElement('a'); //create link download file
        link.href = window.URL.createObjectURL(exceldata); // set url for link download
        link.setAttribute('download', fileName); //set attribute for link created
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
*/

}



/*

  exportexcelHtml(textoHtml: ElementRef, excelFileName: string): void
    {
       let data = textoHtml.nativeElement;


       let element = document.getElementById('excel-table');
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(data.);

       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       XLSX.writeFile(wb, excelFileName + '_export_' + new Date().getTime() + '.xlsx');
    }

*/






}
