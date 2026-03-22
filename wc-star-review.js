class StarReview extends HTMLElement {
  static get observedAttributes() {
    return [
      'rating',
      'reviews',
      'total',
      'colour',
      'color',
      'background'
    ]
  }
  constructor() {
    super()
    this.shadow = this.attachShadow({
      mode: 'open'
    })
  }
  connectedCallback() {
    if (!this.hasAttribute('role')) this.setAttribute('role', 'img')
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '0')
    this.render()
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render()
    }
  }
  render() {
    if (!this.isConnected) return
    this.shadow.innerHTML = `${this.style}${this.html}`
    const currentLabel = this.getAttribute('aria-label')
    if (!currentLabel || currentLabel === this._generatedLabel) {
      this._generatedLabel = this.label
      this.setAttribute('aria-label', this._generatedLabel)
    }
  }
  get style() {
    return `
      <style>
        :host {
          --percent: calc(${this.rating} / ${this.total} * 100%);
          --grey: ${this.background};
          --yellow: ${this.colour};
        }
        :host(:focus-visible) {
          outline: 2px solid ButtonText;
          outline-offset: 3px;
        }
        .holder {
          display: flex;
          flex-direction: row;
          align-items: center;
          font-family: Arial, Helvetica, sans-serif;
        }
        .total {
          margin-left: .25rem;
        }
        .stars {
          font-size: 1.3em;
          text-decoration: none;
          display: inline-block;
          margin-right: .25rem;
        }
        .stars::before {
          content: "${[...new Array(this.total)].map(() => '\u{2605}').join('')}";
          background: linear-gradient(90deg, var(--yellow)  var(--percent), var(--grey) var(--percent));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
      </style>
    `
  }
  get html() {
    return `
      <div class="holder"
           aria-hidden="true">
        <div class="stars"></div>
        <div class="rating">${this.displayRating}</div>
        ${this.hasReviews
      ? `<div class="total">(${this.reviews})</div>`
      : ''}
      </div>
    `
  }
  isNumeric(num) {
    return /^-?[0-9]+(?:\.[0-9]+)?$/.test(num + '')
  }
  isValidColor(value) {
    return value && CSS.supports('color', value)
  }
  get rating() {
    return this.hasAttribute('rating') ? Number(this.getAttribute('rating')) : 0
  }
  get displayRating() {
    return Number.isInteger(this.rating) ? this.rating : this.rating.toFixed(2)
  }
  get hasReviews() {
    return this.hasAttribute('reviews') && this.isNumeric(this.getAttribute('reviews'))
  }
  get reviews() {
    return this.hasReviews ? Number(this.getAttribute('reviews')) : 0
  }
  get total() {
    return this.hasAttribute('total') ? Number(this.getAttribute('total')) : 5
  }
  get colour() {
    const val = this.hasAttribute('colour') ? this.getAttribute('colour')
              : this.hasAttribute('color')  ? this.getAttribute('color')
              : null
    return this.isValidColor(val) ? val : '#FFC107'
  }
  get background() {
    const val = this.hasAttribute('background') ? this.getAttribute('background') : null
    return this.isValidColor(val) ? val : '#CCCCCC'
  }
  get label() {
    let label = ''
    if (this.hasReviews) {
      label += `${this.reviews} review`
      if (this.reviews > 1) {
        label += `s`
      }
      label += `. `
    }
    label += `Rated ${this.displayRating} out of ${this.total} stars.`
    return label
  }
}
window.customElements.define('wc-star-review', StarReview)
