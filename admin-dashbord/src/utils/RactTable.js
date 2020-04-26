import ReactTable, { ReactTableDefaults } from "react-table";
import 'react-table/react-table.css';
import '../style/ReactTable.css';
 
 
// const myDefaults: TextProps :  {
//     previousText: "السابق",
//     loadingText: "الرجاء الانتظار...",
//     nextText: "التالي",
//     pageText: "صفحة",
//     ofText: "من",
//     rowsText: ""
// }
 
Object.assign(ReactTableDefaults, {
    defaultPageSize: 10,
    className: "table",
    noDataText: "No User Regester",
    previousText: "Preves",
    nextText: "Next",
    pageText: "Page",
    ofText: "From",
    rowsText: "Rows",
    loadingText: "Loading ..."
});
 
export default ReactTable;