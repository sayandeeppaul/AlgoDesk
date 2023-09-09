let sheetDB = []

for (let i = 0; i < rows; i++) {
    let sheetRow = []
    for (let j = 0; j < cols; j++) {
        let cellProps = {
            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            fontFamily: "poppins",
            fontSize: 14,
            fontColor: "#000000",
            BGcolor: "transparent"
        }
        sheetRow.push(cellProps)
    }
    sheetDB.push(sheetRow)
}

// active - inactive color code declarartion

let activeColorProp = "#dedede";
let inactiveColorProp = "#f8f8ff";

//selectors for cell properties

let bold = document.querySelector(".bold")
let italic = document.querySelector(".italic")
let underline = document.querySelector(".underline")
let alignment = document.querySelectorAll(".alignment")
let leftAlignment = alignment[0]
let centerAlignment = alignment[1]
let rightAlignment = alignment[2]
let fontFamily = document.querySelector(".font-family-prop")
let fontSize = document.querySelector(".font-size-prop")
let fontColor = document.querySelector(".font-color-prop")
let BGcolor = document.querySelector(".BGcolor-prop")

// writing the working flow of these properties


//bold function implemented successfully

bold.addEventListener('click', (e) => {
    let address = addressBar.value
    let [cell, cellProp] = activeCell(address)

    //Modification
    cellProp.bold = !cellProp.bold                          //data change
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal"
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp
    bold.style.borderRadius = cellProp.bold ? "5px" : "0"
})

//italic function implemented successfully

italic.addEventListener('click', (e) => {
    let address = addressBar.value
    let [cell, cellProp] = activeCell(address)

    //Modification
    cellProp.italic = !cellProp.italic                      //data change
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal"
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp
    italic.style.borderRadius = cellProp.italic ? "5px" : "0"
})

//underline function implemented successfully

underline.addEventListener('click', (e) => {
    let address = addressBar.value
    let [cell, cellProp] = activeCell(address)
    //Modification
    cellProp.underline = !cellProp.underline                //data change
    cell.style.textDecoration = cellProp.underline ? "underline" : "none"
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp
    underline.style.borderRadius = cellProp.underline ? "5px" : "0"
})

//font-size function implemented successfully

fontSize.addEventListener('change', (e) => {
    let address = addressBar.value
    let [cell, cellProp] = activeCell(address)

    //Modification
    cellProp.fontSize = fontSize.value                      //data change
    cell.style.fontSize = cellProp.fontSize + "px"
    fontSize.value = cellProp.fontSize;
})

//font-family function implemented successfully

fontFamily.addEventListener('change', (e) => {
    let address = addressBar.value
    let [cell, cellProp] = activeCell(address)

    //Modification
    cellProp.fontFamily = fontFamily.value                  //data change
    cell.style.fontFamily = cellProp.fontFamily
    fontFamily.value = cellProp.fontFamily;
})

//font-color function implemented successfully

fontColor.addEventListener('change', (e) => {
    let address = addressBar.value
    let [cell, cellProp] = activeCell(address)

    //Modification
    cellProp.fontColor = fontColor.value                    //data change
    cell.style.color = cellProp.fontColor
    fontColor.value = cellProp.fontColor;
})

//background-color function implemented successfully

BGcolor.addEventListener('change', (e) => {
    let address = addressBar.value
    let [cell, cellProp] = activeCell(address)

    //Modification
    cellProp.BGColor = BGcolor.value                        //data change
    cell.style.backgroundColor = cellProp.BGColor
    BGcolor.value = cellProp.BGcolor;
})

alignment.forEach((alignElem) => {
    alignElem.addEventListener("click", (e) => {
        let address = addressBar.value
        let [cell, cellProp] = activeCell(address)
        let alignValue = e.target.classList[0]
        cellProp.alignment = alignValue;                    //data change
        cell.style.textAlign = cellProp.alignment           //UI updation

        switch (alignValue) {
            case "left":
                leftAlignment.style.backgroundColor = activeColorProp
                leftAlignment.style.borderRadius = "5px"
                centerAlignment.style.backgroundColor = inactiveColorProp
                rightAlignment.style.backgroundColor = inactiveColorProp
                break;
            case "center":
                leftAlignment.style.backgroundColor = inactiveColorProp
                centerAlignment.style.backgroundColor = activeColorProp
                centerAlignment.style.borderRadius = "5px"
                rightAlignment.style.backgroundColor = inactiveColorProp
                break;
            case "right":
                leftAlignment.style.backgroundColor = inactiveColorProp
                centerAlignment.style.backgroundColor = inactiveColorProp
                rightAlignment.style.backgroundColor = activeColorProp
                rightAlignment.style.borderRadius = "5px"
                break;
        }
    })
})

let allCells=document.querySelectorAll(".cell")
console.log(allCells)

for (let i = 0; i < allCells.length; i++) {
    addListenerToAttachCellProperties(allCells[i])
}

function addListenerToAttachCellProperties(cell) {
    // Work
    cell.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [rid, cid] = decodeRIDCIDFromAdress(address);
        let cellProp = sheetDB[rid][cid];

        // Apply cell Properties
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGcolor 
        cell.style.textAlign = cellProp.alignment;
                

        // Apply properties UI Props container
        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
        fontColor.value = cellProp.fontColor;
        BGcolor.value = cellProp.BGcolor;
        fontSize.value = cellProp.fontSize;
        fontFamily.value = cellProp.fontFamily;
        switch(cellProp.alignment) { // UI change (2)
            case "left":
                leftAlignment.style.backgroundColor = activeColorProp;
                centerAlignment.style.backgroundColor = inactiveColorProp;
                rightAlignment.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlignment.style.backgroundColor = inactiveColorProp;
                centerAlignment.style.backgroundColor = activeColorProp;
                rightAlignment.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlignment.style.backgroundColor = inactiveColorProp;
                centerAlignment.style.backgroundColor = inactiveColorProp;
                rightAlignment.style.backgroundColor = activeColorProp;
                break;
        }
    })
}

function activeCell(address) {
    let [rid, cid] = decodeRIDCIDFromAdress(address)

    //Access cell & storage object
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`)
    let cellProp = sheetDB[rid][cid]
    return [cell, cellProp]
}

function decodeRIDCIDFromAdress(address) {
    let rid = Number(address.slice(1) - 1)                      //1====>0
    let cid = Number(address.charCodeAt(0)) - 65
    return [rid, cid]
}