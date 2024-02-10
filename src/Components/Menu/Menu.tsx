import { useContext } from 'react';

import {
  IconButtonDelete, IconButtonDownload, IconButtonFilter, IconButtonPrint, IconButtonSearch,
  IconButtonShowColumns
} from '../IconButton/IconButton';
import { MainContext } from '../../ReactDataTable/ReactDataTable';
import Filter from '../Filter/Filter';
import Search from '../Search/Search';
import ShowColumns from '../ShowColumns/ShowColumns';
import './Menu.css';

const defualtShowItems = {filter:false, search:false, displayColumns:false};

export default function Menu(): React.JSX.Element {
  const mainContext = useContext(MainContext);

  const convertToExcel = () => {
    tableToExcel()('data-table', 'table');
    mainContext.setShowMenuSubItems(defualtShowItems);
  }

  const tableToExcel = () => {
    var uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
      , base64 = function (s: any) { return window.btoa(unescape(encodeURIComponent(s))) }
      , format = function (s: any, c: any) { return s.replace(/{(\w+)}/g, function (m: any, p: any) { m++; return c[p]; }) }
    return function (table: any, name: string) {
      if (!table.nodeType) table = document.getElementById(table)
      var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
      window.location.href = uri + base64(format(template, ctx))
    }
  }

  const printTable = () => {
    mainContext.setShowMenuSubItems(defualtShowItems);
    let printWindow = window.open('', '');
    printWindow?.document.write('<html><head><title>Table Contents</title>');

    let table_style = document.getElementById("data-table")!.getAttribute('style');
    printWindow?.document.write('<style type = "text/css">');
    printWindow?.document.write(table_style ? table_style : '');
    printWindow?.document.write('</style>');
    printWindow?.document.write('</head>');

    printWindow?.document.write('<body>');
    let divContents = document.getElementById("div-table")!.innerHTML;
    printWindow?.document.write(divContents);
    printWindow?.document.write('</body>');

    printWindow?.document.write('</html>');
    printWindow?.document.close();
    printWindow?.print();
  }
  
  const handleDelete = () => {
    let tempRows = [...mainContext.rowData];
    let selectedRows: any[] = [];
    let selectRow = (document.querySelectorAll('.td-select-row') as NodeListOf<HTMLInputElement>);
    selectRow.forEach((element, index) => {
      element.checked && selectedRows.push(tempRows.splice(index - selectedRows.length, 1));
    })
    mainContext.options?.onRowsDelete && mainContext.options?.onRowsDelete(selectedRows);
    mainContext.setRowData(tempRows);
    mainContext.setCountSelectedRows(0);
  }

  return (
    <>
      {
        mainContext.countSelectedRows === 0
          ?
          <div className='rdtmenu-main' style={{ color: mainContext.options?.color?.color, backgroundColor: mainContext.options?.color?.backgroundColor, borderColor: mainContext.options?.color?.borderColor }}>
            {mainContext.options?.viewColumns && <IconButtonShowColumns width={25} onClick={() => mainContext.setShowMenuSubItems({...defualtShowItems, displayColumns:!mainContext.showMenuSubItems.displayColumns})} title={mainContext.options?.textLabels?.menu?.viewColumns} />}
            {mainContext.options?.filter && <IconButtonFilter width={25} onClick={() => mainContext.setShowMenuSubItems({...defualtShowItems, filter:!mainContext.showMenuSubItems.filter})} title={mainContext.options?.textLabels?.menu?.filterTable} />}
            {mainContext.options?.download && <IconButtonDownload width={25} onClick={convertToExcel} title={mainContext.options?.textLabels?.menu?.downloadExcel} />}
            {mainContext.options?.print && <IconButtonPrint width={25} onClick={printTable} title={mainContext.options?.textLabels?.menu?.print} />}
            {mainContext.options?.search && <IconButtonSearch width={25} onClick={() => mainContext.setShowMenuSubItems({...defualtShowItems, search:!mainContext.showMenuSubItems.search})} title={mainContext.options?.textLabels?.menu?.search} />}

            {mainContext.showMenuSubItems.search && <Search />}

            {mainContext.showMenuSubItems.displayColumns && <ShowColumns />}

            {mainContext.showMenuSubItems.filter && <Filter />}

            <span className='rdtmenu-title' data-testid='rdt-menu-title'>{mainContext.options?.textLabels?.body?.title}</span>
          </div>
          :
          <div className='rdtmenu-select' style={{ color: mainContext.options?.color?.color, backgroundColor: mainContext.options?.color?.backgroundColor, borderColor: mainContext.options?.color?.borderColor }}>
            <IconButtonDelete width={25} onClick={handleDelete} title={mainContext.options?.textLabels?.selectedRows?.delete} />
            <p>{mainContext.countSelectedRows} {mainContext.options?.textLabels?.selectedRows?.text}</p>
          </div>
      }
    </>
  )
}