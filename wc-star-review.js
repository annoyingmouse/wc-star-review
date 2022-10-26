class StarReview extends HTMLElement {
  static get observedAttributes() {
    return [
      'rating',
      'reviews',
      'total',
      'color',
      'background'
    ]
  }
  constructor() {
    super()
    this.shadow = this.attachShadow({
      mode: 'closed'
    })
    this.render()
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render()
    }
  }
  render() {
    this.shadow.innerHTML = `${this.style}${this.html}`
  }
  get style() {
    return `
      <style>
        :host {
          --percent: calc(${this.rating} / ${this.total} * 100%);
          --grey: ${this.background};
          --yellow: ${this.colour};
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
          -webkit-text-fill-color: transparent;
        }
      </style>    
    `
  }
  get html() {
    return `
      <div class="holder"
           title="${this.title}">
        <div class="stars"
             role="img"
             aria-label="Rating of this product out of ${this.total}."></div>
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
    return this.hasAttribute('colour') ? this.getAttribute('colour') : '#FFC107'
  }
  get background() {
    return this.hasAttribute('background') ? this.getAttribute('background') : '#CCCCCC'
  }
  get title() {
    let title = ''
    if (this.hasReviews) {
      title += `${this.reviews} review`
      if (this.reviews > 1) {
        title += `s`
      }
      title += `. `
    }
    title += `Rated ${this.displayRating} out of ${this.total} stars.`
    return title
  }
}
window.customElements.define('wc-star-review', StarReview)