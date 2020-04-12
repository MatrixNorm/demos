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
    <input id="upper-input" type="range" id="upper" name="upper" min="0" max="11">
    <input id="lower-input" type="range" id="lower" name="lower" min="0" max="11">
  </div>
`;

export default class RangeSlider extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(tmpl.content.cloneNode(true));
  }

  connectedCallback() {
    const upperInput = this.shadowRoot.getElementById("upper-input");
    const lowerInput = this.shadowRoot.getElementById("lower-input");

    upperInput.addEventListener("change", this.onUpperChange);
    upperInput.addEventListener("input", this.onUpperInput);

    lowerInput.addEventListener("change", this.onLowerChange);
    lowerInput.addEventListener("input", this.onLowerInput);
  }

  onUpperChange(evt) {
    console.log(evt);
  }

  onUpperInput(evt) {
    console.log(evt);
  }

  onLowerChange(evt) {
    console.log(evt);
  }

  onLowerInput(evt) {
    console.log(evt);
  }
}
