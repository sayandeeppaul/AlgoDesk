for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`)
        cell.addEventListener('blur', (e) => {
            let address = addressBar.value
            let [cell, cellProp] = getCellAndCellProp(address)
            let enteredData = cell.innerText
            cellProp.value = enteredData
        })
    }
}

let formulaBar = document.querySelector('.formula-bar')

formulaBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && formulaBar.value) {
        let inputFormula = formulaBar.value
        let evaluatedValue = evaluateFormula(inputFormula)
        setCellUIAndCellProp(evaluatedValue, inputFormula)
    }
})

//evaluate formula 
function evaluateFormula(formula) {
    let encodedFormula = formula.split(" ")
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciValue = encodedFormula[i].charCodeAt(0)
        if (asciValue >= 65 && asciValue <= 90) {
            let [cell, cellProp] = getCellAndCellProp(encodedFormula[i])
            encodedFormula[i] = cellProp.value
        }
    }
    let decodeFormula = encodedFormula.join(" ")
    return eval(decodeFormula)
}

// set cell UI and DB as well
function setCellUIAndCellProp(evaluatedValue, formula) {
    let address = addressBar.value
    let [cell, cellProp] = getCellAndCellProp(address)

    //UI update
    cell.innerText = evaluatedValue
    // DB update
    cellProp.value = evaluatedValue
    cellProp.formula = formula
}