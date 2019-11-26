function createCanvas(width, height) {
    const canvas = [];
    const canvasTopLine = (canvasBottomLine = Array(width + 2).fill("-"));

    canvas.push(canvasTopLine);

    for (let i = 0; i < height; i++) {
        let canvasVerticalLine = Array(width + 2).fill(" ");
        canvasVerticalLine[0] = canvasVerticalLine[width + 1] = "|";

        canvas.push(canvasVerticalLine);
    }

    canvas.push(canvasBottomLine);
    return canvas;
}

function isCorrectCoordinates(x1, y1, x2, y2) {
    try {
        if (
            canvas[y1][x1] === undefined ||
            canvas[y1][x1] === "-" ||
            canvas[y1][x1] === "|" ||
            canvas[y2][x2] === undefined ||
            canvas[y2][x2] === "-" ||
            canvas[y2][x2] === "|"
        ) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
}

function drawLine(x1, y1, x2, y2) {
    if (!isCorrectCoordinates(x1, y1, x2, y2)) {
        return "Please input correct coordinates for drawLine";
    }

    if (x2 - x1 === 0) {
        for (let i = y1; i <= y2; i++) {
            canvas[i][x1] = "x";
        }
    } else if (y2 - y1 === 0) {
        canvas[y1].fill("x", x1, x2 + 1);
    }

    return canvas;
}

function drawRectangle(x1, y1, x2, y2) {
    if (!isCorrectCoordinates(x1, y1, x2, y2)) {
        return "Please input correct coordinates for drawRectangle";
    }

    for (let i = x1; i <= x2; i++) {
        canvas[y1][i] = "x";
        canvas[y2][i] = "x";
    }

    for (let i = y1; i <= y2; i++) {
        canvas[i][x1] = "x";
        canvas[i][x2] = "x";
    }

    return canvas;
}

function drawFillBucket(x, y, sym) {
    let currentSymbolToChange = canvas[y][x];
    let stackFillBucket = [[x, y]];

    while (stackFillBucket.length) {
        let currentPosition = stackFillBucket.pop();
        let currentX = currentPosition[0];
        let currentY = currentPosition[1];
        let reachLeft = false;
        let reachRight = false;

        // Go up while we can do it

        while (
            canvas[currentY - 1][currentX] !== undefined &&
            canvas[currentY - 1][currentX] === currentSymbolToChange &&
            currentY - 1 > 0
        ) {
            currentY -= 1;
        }
        // now currentY - Uppest position which we needed

        if (!reachLeft) {
            if (
                canvas[currentY][currentX - 1] !== undefined &&
                canvas[currentY][currentX - 1] === currentSymbolToChange &&
                currentX - 1 > 0
            ) {
                stackFillBucket.push([currentX - 1, currentY]);
                reachLeft = true;
            }
        }

        if (!reachRight) {
            if (
                canvas[currentY][currentX + 1] !== undefined &&
                canvas[currentY][currentX + 1] === currentSymbolToChange &&
                currentX + 1 < canvas[1].length - 1
            ) {
                stackFillBucket.push([currentX + 1, currentY]);
                reachRight = true;
            }
        }

        canvas[currentY][currentX] = sym;
        while (
            canvas[currentY + 1][currentX] !== undefined &&
            canvas[currentY + 1][currentX] === currentSymbolToChange &&
            currentY + 1 < canvas.length - 1
        ) {
            currentY += 1;

            if (!reachLeft) {
                if (
                    canvas[currentY][currentX - 1] !== undefined &&
                    canvas[currentY][currentX - 1] === currentSymbolToChange &&
                    currentX - 1 > 0
                ) {
                    stackFillBucket.push([currentX - 1, currentY]);
                    reachLeft = true;
                }
            } else {
                if (canvas[currentY][currentX - 1] !== currentSymbolToChange && currentX - 1 > 0) {
                    reachLeft = false;
                }
            }

            if (!reachRight) {
                if (
                    canvas[currentY][currentX + 1] !== undefined &&
                    canvas[currentY][currentX + 1] === currentSymbolToChange &&
                    currentX + 1 < canvas[1].length - 1
                ) {
                    stackFillBucket.push([currentX + 1, currentY]);
                    reachRight = true;
                }
            } else {
                if (
                    canvas[currentY][currentX + 1] === currentSymbolToChange &&
                    currentX + 1 < canvas[1].length - 1
                ) {
                    reachRight = false;
                }
            }

            canvas[currentY][currentX] = sym;
        }
    }

    return canvas;
}
