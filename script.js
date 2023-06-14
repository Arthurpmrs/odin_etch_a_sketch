const elements = {
    root: document.querySelector(":root"),
    container: document.querySelector(".container"),
    sketchPad: document.querySelector(".sketch-pad")
}

var parameters = {
    sideSize: 20,
    sketchPadWidth: 660
}

const tools = {
    currentTool: this.pencil,
    pencil: document.querySelector("#pencil"),
    eraser: document.querySelector("#eraser"),
    setup: function () {
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

const colors = {
    currentColor: document.querySelector(".color#black"),
    colorElements: document.querySelectorAll(".color"),
    setup: function () {
        this.colorElements.forEach(ele => {
            ele.addEventListener("click", e => {
                this.currentColor.classList.remove("is-active");
                this.currentColor = e.currentTarget;
                this.currentColor.classList.add("is-active");
            })
        })
    },
    getCurrentColor: function () {
        style = window.getComputedStyle(this.currentColor);
        return style.getPropertyValue('background-color');
    }
}

const config = {
    sizeButton: document.querySelector("#sketch-pad-size"),
    resetButton: document.querySelector("#reset"),
    setup: function () {
        this.sizeButton.addEventListener("click", e => {

            while (true) {
                let inputedValue = prompt("Insert sketch pad side size (between 10 and 100): ");
                console.log(inputedValue)
                if (inputedValue === null) {
                    break;
                }
                if (inputedValue >= 10 && inputedValue <= 100) {
                    parameters.sideSize = inputedValue;
                    break;
                }
            }
            elements.sketchPad.innerHTML = "";
            setSketchPadWidth(elements.root, parameters.sketchPadWidth)
            generateSketchPad(parameters, elements)
        });

        this.resetButton.addEventListener("click", () => {
            resetSketchPad(elements);
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
            applyCollor(tools, colors);
        })
        tile.addEventListener("mousedown", function () {
            applyCollor(tools, colors);
        })
        elements.sketchPad.appendChild(tile);
    }
}

function applyCollor(tools, colors) {
    if (this.event.buttons == 1) {
        let color;
        if (tools.currentTool.id === "pencil") {
            color = colors.getCurrentColor();
        } else {
            color = "transparent";
        }
        const tile = this.event.target;
        tile.style.backgroundColor = color;
    }
}

function resetSketchPad(elements) {
    const tiles = elements.sketchPad.querySelectorAll(".tile");
    tiles.forEach(tile => {
        tile.style.backgroundColor = "transparent";
    })
}

setSketchPadWidth(elements.root, parameters.sketchPadWidth)
generateSketchPad(parameters, elements)
tools.setup()
colors.setup()
config.setup()