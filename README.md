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
  <div id="home" class="page"></div>
  <div id="about" class="page" hidden></div>
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
  <h1 class="home title">Home</h1>
  <h1 class="about title" hidden>About</h1>
</header>
<div id="pages">
  <div class="home page"></div>
  <div class="about page" hidden></div>
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

Popups
------

Update elements leaving siblings untouched using the popup APIs.

```javascript
view.show('#alert'); // Show alert without hiding siblings
view.hide('#alert'); // Hide alert without showing anything else
view.toggle('#alert'); // Toggle visibility of alert
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

Scoping
-------

Confine future matches to a specified sub-tree using a scoped `view` instance.

```html
<div id="widget1">
	<div class="page1"></div>
	<div class="page2" hidden></div>
</div>
<div id="widget2">
	<div class="page1"></div>
	<div class="page2" hidden></div>
</div>
```

```javascript
var _view = view.scope("#widget1"); // Get a view scoped to "widget1"
_view(".page2"); // Switch to "page2" in "widget1", but not in "widget2"
```

Animations
----------

Want to animate changes with CSS Transitions or Animations?
Try `visibility: hidden` instead of `display: none`.

```css
  .page {
    transition-duration: 0.3s;
	transition-property: opacity, visibility;
  }
  .page[hidden] {
    display: block;
	opacity: 0;
    visibility: hidden;
  }
```
