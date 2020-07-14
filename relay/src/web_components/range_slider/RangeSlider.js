const tmpl = document.createElement("template");
tmpl.innerHTML = `
  <style>
    #container {
      min-width: 150px;
    }
    #input-container {
      position: relative;
      height: 14px;
    }
    input[type=range] {
      -webkit-appearance: none;
      position: absolute;
      width: 100%;
      overflow: hidden;
    }
    input[type=range]:focus {
      outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
      width: 300px;
      height: 10px;
      background: #7f97b0;
      border: none;
      border-radius: 3px;
    }
    input[type=range]::-webkit-slider-thumb { 
      -webkit-appearance: none;
      border: none;
      height: 10px;
      width: 10px;
      background: goldenrod;
      cursor: ew-resize;
      z-index: 1;
      position: relative;
    }
    #upper-input::-webkit-slider-thumb {
      box-shadow: 4000px 0 0 4000px  #ddd;
    }
    #lower-input::-webkit-slider-thumb {
      box-shadow: -4000px 0 0 4000px  #ddd;
    }
    .range-label {
      font-size: 0.9em;
    }
    #lower-text {}
    #upper-text {
      float: right;
    }
  </style>
  <div id="container">
    <div id="input-container">
      <input id="upper-input" type="range" name="upper"/>
      <input id="lower-input" type="range" name="lower"/>
    </div>
    <div>
      <span id="lower-text" class="range-label"></span>
      <span id="upper-text" class="range-label"></span>
    </div>
  </div>
`;

export default class RangeSlider extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(tmpl.content.cloneNode(true));

    this.upperInput = this.shadowRoot.getElementById("upper-input");
    this.lowerInput = this.shadowRoot.getElementById("lower-input");
    this.filledSegment = this.shadowRoot.getElementById("filled-segment");

    this.onUpperChange = this.onUpperChange.bind(this);
    this.onUpperInput = this.onUpperInput.bind(this);
    this.onLowerChange = this.onLowerChange.bind(this);
    this.onLowerInput = this.onLowerInput.bind(this);
  }

  connectedCallback() {
    const [min, max, x1, x2, step] = [
      this.getAttribute("min"),
      this.getAttribute("max"),
      this.getAttribute("x1"),
      this.getAttribute("x2"),
      this.getAttribute("step"),
    ];
    this.precision = step.split(".")[1]?.length || 0;

    this.lowerInput.setAttribute("min", min);
    this.lowerInput.setAttribute("max", max);
    this.lowerInput.setAttribute("step", step);
    this.lowerInput.addEventListener("change", this.onLowerChange);
    this.lowerInput.addEventListener("input", this.onLowerInput);

    this.upperInput.setAttribute("min", min);
    this.upperInput.setAttribute("max", max);
    this.upperInput.setAttribute("step", step);
    this.upperInput.addEventListener("change", this.onUpperChange);
    this.upperInput.addEventListener("input", this.onUpperInput);

    this.setX([x1, x2]);
  }

  disconnectedCallback() {
    this.upperInput.removeEventListener("change", this.onUpperChange);
    this.upperInput.removeEventListener("input", this.onUpperInput);
    this.lowerInput.removeEventListener("change", this.onLowerChange);
    this.lowerInput.removeEventListener("input", this.onLowerInput);
  }

  setX([x1, x2]) {
    this.lowerInput.value = x1 ? x1 : this.lowerInput.getAttribute("min");
    this.setLowerText(this.lowerInput.value);
    this.upperInput.value = x2 ? x2 : this.upperInput.getAttribute("max");
    this.setUpperText(this.upperInput.value);
  }

  onUpperInput(evt) {
    const upper = Number(evt.target.value);
    const lower = Number(this.lowerInput.value);
    if (lower > upper) {
      this.lowerInput.value = upper;
      this.setLowerText(upper);
    }
    this.setUpperText(upper);
  }

  onLowerInput(evt) {
    const lower = Number(evt.target.value);
    const upper = Number(this.upperInput.value);
    if (upper < lower) {
      this.upperInput.value = lower;
      this.setUpperText(lower);
    }
    this.setLowerText(lower);
  }

  onUpperChange(evt) {
    this.dispatchEvent(
      new CustomEvent("range-update", {
        detail: { lower: this.lowerInput.value, upper: evt.target.value },
        bubbles: false,
      })
    );
  }

  onLowerChange(evt) {
    this.dispatchEvent(
      new CustomEvent("range-update", {
        detail: { lower: evt.target.value, upper: this.upperInput.value },
        bubbles: false,
      })
    );
  }

  setLowerText(value) {
    // https://stackoverflow.com/questions/6134039/format-number-to-always-show-2-decimal-places
    const textEl = this.shadowRoot.getElementById("lower-text");
    textEl.innerHTML = this.printToPrecision(Number(value));
  }

  setUpperText(value) {
    const textEl = this.shadowRoot.getElementById("upper-text");
    textEl.innerHTML = this.printToPrecision(Number(value));
  }

  printToPrecision(number) {
    return number.toLocaleString(undefined, {
      maximumFractionDigits: this.precision,
      minimumFractionDigits: this.precision,
    });
  }
}
