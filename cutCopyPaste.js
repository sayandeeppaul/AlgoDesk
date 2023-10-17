let ctrlKey

document.addEventListener("keydown", (e) => {
    ctrlKey = e.ctrlKey
})

document.addEventListener("keyup", (e) => {
    ctrlKey = e.ctrlKey
})

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`)
        handleSelectedCells(cell)
    }
}

let rangeStorage = []
function handleSelectedCells(cell) {
    cell.addEventListener("click", (e) => {
        // select cells range work
        if (!ctrlKey) return
        if (rangeStorage.length >= 2) {
            defaultCellsUI()
            rangeStorage = []
        }

        // UI
        cell.style.outline = "none"
        cell.style.border = "3px solid #107c41"

        let rid = Number(cell.getAttribute("rid"))
        let cid = Number(cell.getAttribute("cid"))
        rangeStorage.push([rid, cid])
        console.log(rangeStorage)
    })
}

function defaultCellsUI() {
    for (let i = 0; i < rangeStorage.length; i++) {
        let cell = document.querySelector(`.cell[rid="${rangeStorage[i][0]}"][cid="${rangeStorage[i][1]}"]`)
        cell.style.border = "1px solid lightgrey"
    }
}

let copyBtn = document.querySelector(".copy")
let cutBtn = document.querySelector(".cut")
let pasteBtn = document.querySelector(".paste")

let copyData = []
copyBtn.addEventListener("click", (e) => {
    if (rangeStorage.length < 2) return

    let stRow = rangeStorage[0][0]
    let stCol = rangeStorage[0][1]
    let endRow = rangeStorage[1][0]
    let endCol = rangeStorage[1][1]

    for (let i = stRow; i <= endRow; i++) {
        let copyRow = []
        for (let j = stCol; j <= endCol; j++) {
            let cellProp = sheetDB[i][j]
            copyRow.push(cellProp)
        }
        copyData.push(copyRow)
    }
    defaultCellsUI()

})

cutBtn.addEventListener("click", (e) => {
    console.log("inside cut")
    if (rangeStorage.length < 2) return

    let [stRow, stCol, endRow, endCol] = [rangeStorage[0][0], rangeStorage[0][1], rangeStorage[1][0], rangeStorage[1][1]]

    for (let i = stRow; i <= endRow; i++) {
        for (let j = stCol; j <= endCol; j++) {
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`)

            // DB
            let cellProp = sheetDB[i][j]
            cellProp.value = ''
            cellProp.bold = false
            cellProp.italic = false
            cellProp.underline = false
            cellProp.fontColor = "#000000"
            cellProp.BGcolor = "transparent"
            cellProp.fontSize = 14
            cellProp.fontFamily = "poppins"
            cellProp.alignment = "left"

            // UI
            cell.click()
        }
        defaultCellsUI()
    }
})

pasteBtn.addEventListener("click", (e) => {

    // target cell where we paste the data that we have copied
    let address = addressBar.value
    let [targetRow, targetCol] = decodeRIDCIDFromAdress(address)

    // created rowDiff and colDiff to set the Paste area
    let rowDiff = Math.abs(rangeStorage[1][0] - rangeStorage[0][0])
    let colDiff = Math.abs(rangeStorage[1][1] - rangeStorage[0][1])

    for (let i = targetRow, r = 0; i <= targetRow + rowDiff; i++, r++) {
        for (let j = targetCol, c = 0; j <= targetCol + colDiff; j++, c++) {
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`)

            if (!cell) continue

            // DB
            let cellProp = sheetDB[i][j]
            let data = copyData[r][c]

            cellProp.value = data.value
            cellProp.bold = data.bold
            cellProp.italic = data.italic
            cellProp.underline = data.underline
            cellProp.fontColor = data.fontColor
            cellProp.BGcolor = data.BGcolor
            cellProp.fontSize = data.fontSize
            cellProp.fontFamily = data.fontFamily
            cellProp.alignment = data.alignment

            // UI
            cell.click()
        }
    }
})