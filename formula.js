for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`)
        cell.addEventListener('blur', (e) => {
            let address = addressBar.value
            let [cell, cellProp] = getCellAndCellProp(address)
            let enteredData = cell.innerText
            if (enteredData === cellProp.value) return
            cellProp.value = enteredData
            //if data modified then remove parent-child relation,formula empty and update children with new value 
            removeChildrenFromParent(cellProp.formula)
            cellProp.formula = ""
            updateChildrenCells(address)
        })
    }
}

let formulaBar = document.querySelector('.formula-bar')

formulaBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && formulaBar.value) {
        let inputFormula = formulaBar.value
        let address = addressBar.value
        let [cell, cellProp] = getCellAndCellProp(address)
        if (inputFormula !== cellProp.formula) {
            removeChildrenFromParent(cellProp.formula)
        }
        let evaluatedValue = evaluateFormula(inputFormula)
        setCellUIAndCellProp(evaluatedValue, inputFormula, address)
        addChildrenToParent(inputFormula)
        updateChildrenCells(address)
    }
})

function addChildrenToParent(formula) {
    let childrenAddress = addressBar.value
    let encodedFormula = formula.split(" ")
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciValue = encodedFormula[i].charCodeAt(0)
        if (asciValue >= 65 && asciValue <= 90) {
            let [parentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i])
            parentCellProp.children.push(childrenAddress)
        }
    }
}

function removeChildrenFromParent(formula) {
    let childrenAddress = addressBar.value
    let encodedFormula = formula.split(" ")
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciValue = encodedFormula[i].charCodeAt(0)
        if (asciValue >= 65 && asciValue <= 90) {
            let [parentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i])
            let index = parentCellProp.children.indexOf(childrenAddress)
            parentCellProp.children.splice(index, 1)
        }
    }
}

function updateChildrenCells(parentAddress) {
    let [parentCell, parentCellProp] = getCellAndCellProp(parentAddress)
    let children = parentCellProp.children
    for (let i = 0; i < children.length; i++) {
        let childAdress = children[i]
        let [childCell, childCellProp] = getCellAndCellProp(childAdress)
        let childFormula = childCellProp.formula
        let evaluatedValue = evaluateFormula(childFormula)
        setCellUIAndCellProp(evaluatedValue, childFormula, childAdress)
        updateChildrenCells(childAdress)
    }
}

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
function setCellUIAndCellProp(evaluatedValue, formula, address) {
    let [cell, cellProp] = getCellAndCellProp(address)

    //UI update
    cell.innerText = evaluatedValue
    // DB update
    cellProp.value = evaluatedValue
    cellProp.formula = formula
}