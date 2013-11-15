view.js
=======

Swap visible elements in a single call.

* Supports all modern browsers, including IE9+.
* Under 1 kilobyte when minified and gzipped.
 
Basic Usage
-----------

Define your initial view via HTML5's `hidden` attribute.

```html
<div id="pages">
  <div id="home"></div>
  <div id="about" hidden></div>
</div>
```
  
Then pass a CSS selector to `view` when you're ready for a change.

```javascript
view('#about'); // Show the "about" page and hide the "home" page
```
  
Optionally ensure ancestors are shown using the `deep` flag.

```javascript
view(targets, {deep: true});
```
  
Groups
------

Children with the same parent are grouped together.

```html
<header>
  <h1 class="home">Home</h1>
  <h1 class="about" hidden>About</h1>
</header>
<div id="pages">
  <div class="home"></div>
  <div class="about" hidden></div>
</div>
```

Update multiple groups in a single call.

```javascript
view('.about'); // Switch to the "about" header and page
```

Or separately if you wish.

```javascript
view('header > .about'); // Switch to the "about" header
view('#pages > .about'); // Switch to the "about" page
```

Events
------
  
Listen for visibility changes using `view:show` and `view:hide`.
To facilitate nested views, these events do *not* bubble.

```javascript
home.addEventListener('view:show', _onShowHome);
home.addEventListener('view:hide', _onHideHome);
```
  
Optionally provide data for the `detail` property of the `view:show` event.
Provided data is only passed to explicitly matched elements.

```javascript
view(targets, {data: data}); // Populate `evt.detail.data`
```

Animations
----------

Want to animate changes with CSS Transitions or Animations?
Try `visibility: hidden` instead of `display: none`.

```css
  #pages > [hidden] {
    animation: fade-out 0.3s both;
    display: block;
    visibility: hidden;
  }
```
