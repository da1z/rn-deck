# rn-deck

Stack of beautiful cards that a user can slide around the screen, swiping right to &#39;like&#39; an item, or &#39;left&#39; to dislike an item. 

<img src="/example/example.gif" width="200">

## Installation

```sh
npm install rn-deck
```

## Usage

```js
import Deck from "rn-deck";

// ...

<Deck
 key={DATA}
 data={DATA}
 renderCard={renderCard}
 renderNomoreCard={renderNomoreCard}
 onSwipeRight={() => {}}
 onSwipeLeft={() => {}}
      />
```

## License

MIT
