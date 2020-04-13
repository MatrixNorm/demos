const tmpl = document.createElement("template");
tmpl.innerHTML = `
  <style>
    #container { 
      position: relative;
    }
    input[type=range] {
      -webkit-appearance: none;
      position: absolute;
    }
    input[type=range]:focus {
      outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
      width: 300px;
      height: 5px;
      background: #ddd;
      border: none;
      border-radius: 3px;
    }
    input[type=range]::-webkit-slider-thumb { 
      -webkit-appearance: none;
      border: none;
      height: 0;
      width: 0;      
    }
    #upper-input::-webkit-slider-thumb {
      margin-top: -12px;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;      
      border-top: 12px solid goldenrod;
    }
    #lower-input::-webkit-slider-thumb {
      margin-top: 4px;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 12px solid goldenrod;
    }
  </style>
  
  <div id="container">
    <input id="upper-input" type="range" name="upper" min="50" max="500">
    <input id="lower-input" type="range" name="lower" min="50" max="500">
  </div>
`;

export default class RangeSlider extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(tmpl.content.cloneNode(true));

    this.upperInput = this.shadowRoot.getElementById("upper-input");
    this.lowerInput = this.shadowRoot.getElementById("lower-input");

    this.onUpperChange = this.onUpperChange.bind(this);
    this.onUpperInput = this.onUpperInput.bind(this);
    this.onLowerChange = this.onLowerChange.bind(this);
    this.onLowerInput = this.onLowerInput.bind(this);
  }

  connectedCallback() {
    this.upperInput.setAttribute("min", this.getAttribute("min"));
    this.upperInput.setAttribute("max", this.getAttribute("max"));
    this.lowerInput.setAttribute("min", this.getAttribute("min"));
    this.lowerInput.setAttribute("max", this.getAttribute("max"));
    this.upperInput.addEventListener("change", this.onUpperChange);
    this.upperInput.addEventListener("input", this.onUpperInput);
    this.lowerInput.addEventListener("change", this.onLowerChange);
    this.lowerInput.addEventListener("input", this.onLowerInput);
  }

  disconnectedCallback() {
    this.upperInput.removeEventListener("change");
    this.upperInput.removeEventListener("input");
    this.lowerInput.removeEventListener("change");
    this.lowerInput.removeEventListener("input");
  }

  onUpperChange(evt) {
    console.log(evt.target.value);
  }

  onUpperInput(evt) {
    const upper = Number(evt.target.value);
    const lower = Number(this.lowerInput.value);
    if (lower > upper) {
      this.lowerInput.value = upper;
    }
  }

  onLowerChange(evt) {
    console.log(evt.target.value);
  }

  onLowerInput(evt) {
    const lower = Number(evt.target.value);
    const upper = Number(this.upperInput.value);
    if (upper < lower) {
      this.upperInput.value = lower;
    }
  }
}
