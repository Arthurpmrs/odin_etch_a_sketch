const elements = {
    root: document.querySelector(":root"),
    container: document.querySelector(".container"),
    sketchPad: document.querySelector(".sketch-pad")
}

var parameters = {
    sideSize: 20,
    sketchPadWidth: 660
}

function setSketchPadWidth(root, width) {
    root.style.setProperty("--sketchPadWidth", `${width}px`)
}

function generateSketchPad(parameters, elements) {
    const numberOfTiles = parameters.sideSize ** 2;
    const tileSize = parameters.sketchPadWidth / parameters.sideSize;

    elements.sketchPad.style.setProperty(
        "grid-template-columns",
        `repeat(${parameters.sideSize}, ${tileSize}px)`
    );
    elements.sketchPad.style.setProperty("grid-auto-rows", `${tileSize}px`);


    for (let i = 0; i < numberOfTiles; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        elements.sketchPad.appendChild(tile);
    }
}

setSketchPadWidth(elements.root, parameters.sketchPadWidth)
generateSketchPad(parameters, elements)