// Editable variables
let usePoints = true;
let winHeight = 500;
let pointSize = 5;
let fontSize = 3;
let oddColor = "#ff7a7a";
let evenColor = "#dedede";

// Other constants
let winWidth = (2 * winHeight) / 3 ** 0.5;
const big1 = BigInt(1);
const big2 = BigInt(2);

function setup() {
    createCanvas(winWidth, winHeight);
    drawNodes(usePoints);
}

function drawNodes(usePoints = false) {
    // Decide which draw method to use
    const drawNode = getDrawUtils(usePoints);

    // Initialize the root point

    const root = {
        x: winWidth / 2,
        y: pointSize / 2,
        value: big1,
        color: oddColor,
    };
    drawNode(root);

    // Draw the remaining rows
    let prevNodes = root;
    let nextNodes = genNextNodes([root]);

    for (let i = 0; i < (winHeight - 2 * pointSize) / pointSize; i++) {
        nextNodes.forEach((node) => {
            drawNode(node);
        });

        // Prepare rows for next iteration
        prevNodes = nextNodes;
        nextNodes = genNextNodes(prevNodes);
    }
}

function getDrawUtils(usePoints) {
    if (usePoints) {
        stroke(oddColor);
        strokeWeight(fontSize);
    } else {
        textSize(fontSize);
        textAlign(CENTER);
        fill(oddColor);
    }

    const drawNode = (node) => {
        if (usePoints) {
            stroke(node.color);
            point(node.x, node.y);
        } else {
            fill(node.color);
            text(node.value, node.x, node.y);
        }
    };

    return drawNode;
}

function genNextNodes(prevNodes) {
    const rootX = prevNodes[0].x - pointSize / sqrt(3);

    const newNodeValues = getNextPascalRow(prevNodes);
    const newNodes = newNodeValues.map((value, i) => {
        return {
            x: rootX + (i * 2 * pointSize) / sqrt(3),
            y: prevNodes[0].y + pointSize,
            value: value,
            color: value % big2 == 0 ? evenColor : oddColor,
        };
    });

    return newNodes;
}

function getNextPascalRow(prevRow) {
    const newRow = [big1].concat(
        prevRow.map((node, i) =>
            i < prevRow.length - 1 ? node.value + prevRow[i + 1].value : big1
        )
    );
    return newRow;
}

// UI functions

function toggleUsePoints() {
    usePoints = !usePoints;
    setup();
}

function setCanvasSize(value) {
    winHeight = parseInt(value);
    winWidth = (2 * winHeight) / 3 ** 0.5;
    setup();
}

function setPointSpacing(value) {
    pointSize = parseInt(value);
    setup();
}

function setPointSize(value) {
    fontSize = parseInt(value);
    setup();
}
