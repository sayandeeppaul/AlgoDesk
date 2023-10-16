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
    cell.addEventListener("click",(e)=>{
        // select cells range work
        if(!ctrlKey) return
        if(rangeStorage.length>=2) {
            defaultCellsUI()
            rangeStorage=[]
        }

        // UI
        cell.style.outline = "none"
        cell.style.border = "3px solid #107c41"

        let rid = Number(cell.getAttribute("rid")) 
        let cid = Number(cell.getAttribute("cid"))
        rangeStorage.push([rid,cid])
        console.log(rangeStorage)
    })
}

function defaultCellsUI() {
    for (let i = 0; i < rangeStorage.length; i++) {
        let cell = document.querySelector(`.cell[rid="${rangeStorage[i][0]}"][cid="${rangeStorage[i][1]}"]`)
        cell.style.border = "1px solid lightgrey"
    }
}