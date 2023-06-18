
function drawPieChart(element_id,source,total_amount,text) {
    const ctx = document.getElementById(element_id);
    const total = total_amount.reduce((partialSum, a) => partialSum + parseInt(a), 0);
    
    var unit = "";
    if(text=="金額"){
        unit = "元"
    }else{
        unit = "筆"
    }

    const data = {
        labels: source,
        datasets: [{
            label: '政治獻金收入',
            data: total_amount,
            hoverOffset: 3
        }]
    };
    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (item) => {
                            return " " + item.label + " : " + item.formattedValue + unit + " (" + (item.parsed / total * 100).toFixed(2) + "%)"
                        }
                    }
                },
                title: {
                    display: true,
                    text: '政治獻金來源分布 (依'+text+")",
                    font: {
                        size: 20
                    }
                },
                colors: {
                    enabled: true
                }
            }
        }
    });

}

/*const ctx = document.getElementById('myChart');

const data = {
    labels: [
        '個人捐贈收入',
        '營利事業捐贈收入',
        '匿名捐贈',
        '人民團體捐贈收入',
        '其他收入'
    ],
    datasets: [{
        label: '政治獻金收入',
        data: [568, 92, 12, 10, 1],
        hoverOffset: 4
    }]
};
new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (item) => {
                        return " " + item.label + " : " + item.formattedValue + "筆" + " (" + (item.parsed / 683 * 100).toFixed(2) + "%)"
                    }
                }
            },
            title: {
                display: true,
                text: '政治獻金來源分布',
                font: {
                    size: 20
                }
            }
        }
    }
});*/

function type(data){
    return {
        "收支科目" : data["收支科目"],
        "資料筆數" : +data["資料筆數"],
        "總金額" : +data["總金額"],
        "縣市" : data["縣市"],
        "捐贈筆數" : +data["捐贈筆數"]
    }
}




function main(){
    let fileValue = document.querySelector("a.nav-link.active").dataset["value"]
    d3.csv("cleanDataSet/total_money_type_"+fileValue+".csv",type).then(function (data) {

        let source1 = [];
        let source2 = [];
        let source3 = [];
        
        let money_amount = [];
        let data_amount = [];
        let loc_amount = [];
    
        let total_money,total_amount;      


        let data_by_money = data.sort((a, b) => ( b["總金額"] - a["總金額"]));
        
        data_by_money.forEach(element => {
            source1.push(element["收支科目"]);
            money_amount.push(element["總金額"]);
        })

        total_money = money_amount.reduce((partialSum, a) => partialSum + parseInt(a), 0);
        total_money = total_money.toLocaleString()
    
        document.querySelector("span.total_money").innerHTML = total_money;

        let data_by_amount = data.sort((a, b) => ( b["資料筆數"] - a["資料筆數"]));
        
        data_by_amount.forEach(element => {
            source2.push(element["收支科目"]);
            data_amount.push(element["資料筆數"]);
        })

        total_amount = data_amount.reduce((partialSum, a) => partialSum + parseInt(a), 0);
        total_amount = total_amount.toLocaleString()

        document.querySelector("span.total_amount1").innerHTML = total_amount;
        document.querySelector("span.total_amount2").innerHTML = total_amount;

        let data_by_loc = data.sort((a, b) => ( b["捐贈筆數"] - a["捐贈筆數"]));
    
        data_by_loc.forEach(element => {
            if(element["縣市"]!=''){
                source3.push(element["縣市"]);
                loc_amount.push(element["捐贈筆數"]);
            }
        })
    
        drawPieChart("myChart1",source1,money_amount,"金額");
        drawPieChart("myChart2",source2,data_amount,"筆數");
        drawPieChart("myChart3",source3,loc_amount,"縣市");
    })
}

main();