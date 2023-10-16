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

})

pasteBtn.addEventListener("click", (e) => {

})