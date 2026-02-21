BRUSH = {
    size: 10,
    color: "#f00"
}

addEventListener("DOMContentLoaded", () => {
    // load things
    canvas = document.getElementById("mainCANVAS")
    CTX = canvas.getContext("2d")
    canvas.width = window.innerWidth-4
    canvas.height = window.innerHeight - 6


    pCOOR = []
    bDown = false

    // events
    addEventListener("mousedown", (e) => {
        bDown = true
        [X, Y] = getCOORD(e)
        dot([X, Y], CTX, BRUSH)
        pCOOR = [X, Y]
    })
    addEventListener("mouseup", (e) => {
        bDown = false
        dot([X, Y], CTX, BRUSH)
        // CTX.stroke()
    })
    addEventListener("mousemove", (e) => {

        [X, Y] = getCOORD(e)

        if (bDown) {
            dot([X, Y], CTX, BRUSH)
            line(pCOOR, [X, Y], CTX, BRUSH)
            pCOOR = [X, Y]

        }
    })
})

function line([px, py], [x, y], ctx, brush) {
    ctx.beginPath()
    ctx.strokeStyle = brush.color
    ctx.lineWidth = brush.size
    ctx.moveTo(px, py)
    ctx.lineTo(x, y)
    ctx.stroke()
}
function dot([x, y], ctx, brush) {
    ctx.beginPath()
    ctx.arc(x, y, brush.size/2, 0, Math.PI * 2)
    ctx.fillStyle = brush.color
    ctx.fill()
}
function getCOORD(e) {
    return [e.clientX, e.clientY]
}