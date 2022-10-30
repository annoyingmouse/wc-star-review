# <wc-star-review>

This web component creates a configurable way of displaying a rating.

[![Published on webcomponents.org](https://camo.githubusercontent.com/fa095f7c7b24972f3525b39a6f31c15626f3a4cc019314b4f19ad88ccfd47ddb/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f776562636f6d706f6e656e74732e6f72672d7075626c69736865642d626c75652e737667)](https://www.webcomponents.org/element/@annoyingmouse/wc-star-review)

Demo here: [https://wc-star-review.annoyingmouse.repl.co](https://wc-star-review.annoyingmouse.repl.co)

## Installation
```
<script type="module" 
        src="https://unpkg.com/@annoyingmouse/wc-star-review/wc-star-review.js"></script>
```

Alternatively:

```
<script type="module"
        src="https://cdn.skypack.dev/@annoyingmouse/wc-star-review/wc-star-review.js"></script>
```

You can use it minified by adding using this instead:

```
<script type="module"
        src="[WHATEVER CDN]/@annoyingmouse/wc-star-review/dist/wc-star-review.min.js"></script>
```

Please remember to change `[WHATEVER CDN]` to your favourite CDN

## Usage

```
<wc-star-review rating="1"
                reviews="1"></wc-star-review>
<wc-star-review rating="2"
                reviews="2"></wc-star-review>
<wc-star-review rating="3"
                reviews="3"></wc-star-review>
<wc-star-review rating="4"
                reviews="4"></wc-star-review>
<wc-star-review rating="5"
                reviews="5"></wc-star-review>
<script type="module"
        src="wc-star-review.js"></script>
```

## Configuration

The rating is provided using the `rating` attribute, it defaults to `0`.

The number of stars visible is controlled by the `total` attribute, it defaults to `5` (see the **Caution** below).

The number of reviews, if known, can be shown in brackets by providing a `reviews` attribute. You don't need to display this, but if you do the number will be shown in the title of the component.

The colour of the stars can be changed from the default of `#FFC107` by adding a `colour` attribute with a suitable CSS value.

The background behind the stars can be changed from the default of `#CCCCCC` by adding a `background` attribute with a suitable CSS value.

## Caution

Increasing the `total` to numbers above 5 is not advised, besides, 5 stars are commonly [used in eCommerce](https://uxplanet.org/how-to-design-user-rating-and-reviews-1b26c0208d3a)