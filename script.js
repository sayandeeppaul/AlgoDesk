let rows = 100;
let cols = 26;

let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont = document.querySelector(".address-row-cont");
let cellsCont = document.querySelector(".cells-cont");
let addressBar = document.querySelector(".address-bar")

for (let i = 0; i < rows; i++) {
    let addressCol = document.createElement("div");
    addressCol.setAttribute("class", "address-col")
    addressCol.innerText = i + 1;
    addressColCont.appendChild(addressCol)
}

for (let i = 0; i < cols; i++) {
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class", "address-row")
    addressRow.innerText = String.fromCharCode(65 + i);
    addressRowCont.appendChild(addressRow)
}

for (let i = 0; i < rows; i++) {
    let rowCont = document.createElement("div");
    rowCont.setAttribute("class", "rowCont")
    for (let j = 0; j < cols; j++) {
        let cell = document.createElement("div");
        cell.setAttribute("class", "cell")
        cell.setAttribute("contenteditable", "true")
        cell.setAttribute('spellcheck', false)
        //Attribute for cell and storage (sheetDB) identification
        cell.setAttribute("rid",i)
        cell.setAttribute("cid",j)
        rowCont.appendChild(cell)
        addressBarDisplay(cell, i, j)
    }
    cellsCont.appendChild(rowCont)
}

function addressBarDisplay(cell, i, j) {
    cell.addEventListener("click", (e) => {
        addressBar.value = `${String.fromCharCode(65 + j)}${i + 1}`
    })
}

// by default click on first cell
let firstCell=document.querySelector(".cell")

// Clicked by DOM 
firstCell.click()