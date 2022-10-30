const cnvs = document.querySelector("#cnvs"),
    cW = cnvs.width,
    cH = cnvs.height,
    ctx = cnvs.getContext("2d"),
    cnvsData = ctx.getImageData(0, 0, cW, cH);

let totalPoints = 0,
    p1 = [cW / 2, 0],
    p2 = [0, cH],
    p3 = [cW, cH],
    p = [p1[0], p1[1]];

const changeVals = (to_point) => {
    p[0] = (p[0] + to_point[0]) / 2;
    p[1] = (p[1] + to_point[1]) / 2;
}

const drawPoint = (coord, r, g, b, a) => {
    const x = parseInt(coord[0]),
        y = parseInt(coord[1]),
        idx = (x + y * cW) * 4;
    [r, g, b, a].forEach((el, i) => {
        cnvsData.data[idx + i] = el;
    })

}

function drawPoints(count = 1000) {
    Array(count).fill().forEach((_, i) => {
        const rand = Math.random();
        return (rand > 0.6666) ? (changeVals(p1), drawPoint(p, 0, 0, 0, 255)) :
            (rand > 0.3333) ? (changeVals(p2), drawPoint(p, 0, 0, 0, 255)) :
                (changeVals(p3), drawPoint(p, 0, 0, 0, 255))
    });

    ctx.putImageData(cnvsData, 0, 0);
    totalPoints += count;
    if (totalPoints < 1000000) {
        setTimeout(drawPoints, 10)
    }
}

setTimeout(drawPoints(20), 50)