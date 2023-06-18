/*d3.csv("cleanDataSet/all_data.csv").then(function (data) {
    
    let tbody = document.getElementById("table_body");

    //交易日期 收支科目 捐贈者／支出對象 身分證／統一編號 收入金額 
    data.forEach(element => {
        
        tbody.innerHTML += `<tr>
                <td>${element["交易日期"]}</td>
                <td>${element["收支科目"]}</td>
                <td>${element["捐贈者／支出對象"]}</td>
                <td>${element["身分證／統一編號"]}</td>
                <td>${element["地址"]}</td>
                <td>${element["收入金額"]}</td>
                </tr>`
    });
    $('#table_id').DataTable({
        "lengthMenu": [[10, 15, 20], [10, 15, 20]],
        "processing": true,
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.11.3/i18n/zh_Hant.json"
        }
    });
})*/

$(document).ready(function () {
    let fileValue = document.querySelector("a.nav-link.active").dataset["value"]
    $('#table_id').DataTable({
        ajax: 'cleanDataSet/all_data_'+fileValue+'.json',
        "lengthMenu": [[10, 15, 20], [10, 15, 20]],
        "processing": true,
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.11.3/i18n/zh_Hant.json"
        }
    });
});