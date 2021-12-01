var DATA_1 = new Array();
var DATA_2 = new Array();

function UploadProcess() {
    //Reference the FileUpload element.    
    DATA_1 = new Array();
    DATA_2 = new Array();
    var fileUpload = document.getElementById("fileUpload");        

    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\(\)\s_\\.\-:])+(.xls|.xlsx)$/;
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log(regex.test(fileUpload.value.toLowerCase()));
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();

            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
                reader.onload = function (e) {
                    // GetTableFromExcel(e.target.result);
                    getData(e.target.result);
                    console.log("upload Done");
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else {
                //For IE Browser.
                reader.onload = function (e) {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    //GetTableFromExcel(data);
                    getData(data);                       
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
            alert("Upload is OK");
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid Excel file.");
    }
};

function getData(data){
  //Read the Excel File data in binary
  //console.log("---Read the Excel File data in binary");
  var workbook = XLSX.read(data, {
        type: 'binary'
    });
  //get the name of First Sheet.
  let Sheet_1 = workbook.SheetNames[0];
  let Sheet_2 = workbook.SheetNames[1];
  //Read all rows from First Sheet into an JSON array.

  let excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[Sheet_1]);
  for (let i = 0; i < excelRows.length; i++) {
    if(excelRows[i]["IC"] !== undefined){
      DATA_1.push(excelRows[i]);
    }
    if(excelRows[i]["IC Code"] !== undefined){
        excelRows[i]["IC"] = excelRows[i]["IC Code"];
        DATA_1.push(excelRows[i]);
      }

  }
  let excelSheet2Rows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[Sheet_2]);
  for (let i = 0; i < excelSheet2Rows.length; i++) {
    if(excelSheet2Rows[i]["Promotion"] !== undefined){
      DATA_2.push(excelSheet2Rows[i]);
    }
  }
//   console.log(DATA_1);
//   console.log(DATA_2);
}

function GetTableFromExcel(data) {
    //Read the Excel File data in binary
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //get the name of First Sheet.
    var Sheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[Sheet]);

    //Create a HTML Table element.
    var myTable  = document.createElement("table");
    myTable.border = "1";

    //Add the header row.
    var row = myTable.insertRow(-1);

    //Add the header cells.
    var headerCell = document.createElement("TH");
    headerCell.innerHTML = "Transaction Date";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "TYPE";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "Fund Code";
    row.appendChild(headerCell);
    
    headerCell = document.createElement("TH");
    headerCell.innerHTML = "Amount";
    row.appendChild(headerCell);
    
    headerCell = document.createElement("TH");
    headerCell.innerHTML = "Status";
    row.appendChild(headerCell);
     
    headerCell = document.createElement("TH");
    headerCell.innerHTML = "IC";
    row.appendChild(headerCell);

    // headerCell = document.createElement("TH");
    // headerCell.innerHTML = "IC Name";
    // row.appendChild(headerCell);


    //Add the data rows from Excel file.
    for (var i = 0; i < excelRows.length; i++) {          
      if(excelRows[i]["IC"] !== undefined){
        //Add the data row.
        var row = myTable.insertRow(-1);

        //Add the data cells.
        var cell = row.insertCell(-1);

        // console.log(Object.keys(excelRows[i])[0]);
        // Object.keys(excelRows[i])[0] = Object.keys(excelRows[i])[0]
        cell.innerHTML = excelRows[i]["Transaction Date"]

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i]["Transaction Type"];

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i]["Fund Code"];
        
        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i]["Amount"];
        
        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i]["Status"];
        
        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i]["IC"];

        // cell = row.insertCell(-1);
        // cell.innerHTML = excelRows[i]["IC Name"];
        
        console.log(excelRows[i]);
        
      }
    }
    

    var ExcelTable = document.getElementById("ExcelTable");
    ExcelTable.innerHTML = "";
    ExcelTable.appendChild(myTable);
}

function getResult(){
  //Create a HTML Table element.
  var myTable  = document.createElement("table");
  myTable.border = "1";
  //Add the header row.
  var row = myTable.insertRow(-1);
  //Add the header cells.
  var headerCell = document.createElement("TH");
  headerCell.innerHTML = "Fund Code";
  row.appendChild(headerCell);

  headerCell = document.createElement("TH");
  headerCell.innerHTML = "Amount";
  row.appendChild(headerCell);

  headerCell = document.createElement("TH");
  headerCell.innerHTML = "Pro per 1 Mio";
  row.appendChild(headerCell);

  headerCell = document.createElement("TH");
  headerCell.innerHTML = "Pay for Sale";
  row.appendChild(headerCell);

  var ExcelTable = document.getElementById("ExcelTable");
    ExcelTable.innerHTML = "";
    ExcelTable.appendChild(myTable);
}

async function getResult1(){
    let result = DATA_1;

    console.log("-getResult1------------------------------------");
    console.log(result);
    // let ic_name = document.getElementById('ic_name').value.trim();
    let ic_code = document.getElementById('ic_code').value.trim();

    // if(ic_name !== ""){
        //if(typeof result["IC Name"] !== "undefined"){
            // result =await result.filter(c => c["IC Name"] == ic_name); 
        //}
    // }
    // result =await result.filter(c => c["Transaction Type"].trim().toUpperCase() == "");
    // result =await result.filter(c => c["Transaction Type"].trim().toUpperCase() == "");

    if(ic_code !== ""){
        result =await result.filter(c => c["IC"].trim().toUpperCase() == ic_code.toUpperCase());
    }
    
    //result =await result.filter(c => c["Status"].trim().toUpperCase() === "ALLOTTED");
    result =await result.filter(function(c){
            return c["Status"].trim().toUpperCase() === "ALLOTTED" ||
            c["Status"].trim().toUpperCase() === "APPROVED" || 
            c["Status"].trim().toUpperCase() === "SUBMITTED" ||
            c["Status"].trim().toUpperCase() === "WAITING";
        }
    );
    
    let type = document.getElementById('type').value.trim();
     //console.log(type);
    if(type !=="0"){
        result = result.filter(c => c["Transaction Type"].trim() === type);
    }
    //console.log(result);
    
    console.log("+++++++++++++++++++++++++++++++++++++++");
    //var test =await result.filter(c => c["Transaction Type"].trim().toUpperCase() == "SWI");
    result =await result.filter(function(trans){
        let tran = trans["Transaction Type"].trim().toUpperCase();
        if(tran === "SWI" || tran === "SUB"){
            return true;
        }
    });
    console.log("+++++++++++++++++++++++++++++++++++++++");
    return result;
}

function getSum(datas){
    let results= new Array();
    for(let i=0 ;i<datas.length;i++){
        let data = datas[i];
        // console.log(data["Fund Code"]);
        if(results.length ==0){
            results.push(data);
        }else{
            // console.log(results);
            let index = results.findIndex(x => x["Fund Code"].trim() === data["Fund Code"].trim() );
            if(index <0){
                results.push(data);
            }else{
                let row = results[index];
                row["Amount"] = (parseFloat(row["Amount"].replace(/[^0-9.-]+/g,"")) + parseFloat(data["Amount"].replace(/[^0-9.-]+/g,""))).toString();
            }
        }
    }
    // console.log(results);
}
function getAmountSum(code,datas){
    //console.log(code);
    
    let results = datas.filter(c => c["Fund Code"].trim().toUpperCase() === code.trim().toUpperCase());
    if(results ==0){
        return 0;
    }else{
        let sum = 0;
        for(let i=0 ;i<results.length;i++){
            let data = results[i];
            //sum = sum + Number(data["Amount"].replace(/[^0-9.-]+/g,""));
            sum = sum + Number(data["Amount"]);
        }
        return sum;
    }
}
