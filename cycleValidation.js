// storage 2D  matrix (Basic need)
let graphComponentMatrix = []

for (let i = 0; i < rows; i++) {
    let row = []
    for (let j = 0; j < cols; j++) {
        // why array => more than one dependency can be present
        row.push([])
    }
    graphComponentMatrix.push(row)
}

// true => cyclic       false => Not cyclic
function isGraphCyclic(graphComponentMatrix) {

    // dependency array => visited      dfsVisited (2D array)
    let visited = []          // node visit trace
    let dfsVisited = []       // stack visit trace

    for (let i = 0; i < rows; i++) {
        let visitedRow = []
        let dfsVisitedRow = []
        for (let j = 0; j < cols; j++) {
            visitedRow.push(false)
            dfsVisitedRow.push(false)
        }
        visited.push(visitedRow)
        dfsVisited.push(dfsVisitedRow)
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let response = dfsDetection(graphComponentMatrix, i, j, visited, dfsVisited)
            if (response == true) {
                return [i,j]
            }
        }
    }
    return null
}

// start => visitid[true] dfsVisited[true]
// end => dfsVisited[false]
// visited[i][j] => already explore , go back no use to explore agian
// visited[i][j]==true && dfsVisited[i][j] => cycle present

function dfsDetection(graphComponentMatrix, srcr, srcc, visited, dfsVisited) {
    visited[srcr][srcc] = true
    dfsVisited[srcr][srcc] = true

    // A1 -> [  B1   C1     D1    E1 .....]
    // A1 -> [[0,1],[0,2],[0,3],[0,4] ....]
    for (let children = 0; children < graphComponentMatrix[srcr][srcc].length; children++) {

        let [nbrr, nbrc] = graphComponentMatrix[srcr][srcc][children]
        if (visited[nbrr][nbrc] == false) {
            let response = dfsDetection(graphComponentMatrix, nbrr, nbrc, visited, dfsVisited)
            if (response == true) return true // Found cycle so return immediately no need to explore more path
        }
        else if (visited[nbrr][nbrc] === true && dfsVisited[nbrr][nbrc] === true) {
            // Found cycle so return immediately no need to explore more path
            return true
        }
    }
    dfsVisited[srcr][srcc] = false
    return false
}