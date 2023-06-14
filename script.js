const elements = {
    root: document.querySelector(":root"),
    container: document.querySelector(".container"),
    sketchPad: document.querySelector(".sketch-pad")
}

var parameters = {
    sideSize: 32,
    sketchPadWidth: 660
}

const tools = {
    currentTool: this.pencil,
    pencil: document.querySelector("#pencil"),
    eraser: document.querySelector("#eraser"),
    setupTools: function () {
        this.pencil.addEventListener("click", e => {
            if (this.currentTool != e.currentTarget) {
                this.currentTool.classList.remove("is-active");
                this.currentTool = e.currentTarget;
                this.currentTool.classList.add("is-active");
            }
        })

        this.eraser.addEventListener("click", e => {
            if (this.currentTool != e.currentTarget) {
                this.currentTool.classList.remove("is-active");
                this.currentTool = e.currentTarget;
                this.currentTool.classList.add("is-active");
            }
        })
    }
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
        tile.addEventListener("mouseover", function () {
            applyCollor(tools);
        })
        elements.sketchPad.appendChild(tile);
    }
}

function applyCollor(tools) {
    if (this.event.buttons == 1) {
        let color;
        if (tools.currentTool.id === "pencil") {
            color = "grey";
        } else {
            color = "transparent";
        }
        const tile = this.event.target;
        tile.style.backgroundColor = color;
    }
}

setSketchPadWidth(elements.root, parameters.sketchPadWidth)
generateSketchPad(parameters, elements)
tools.setupTools()