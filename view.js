/*!
 * view.js
 * Swap visible elements in a single call.
 * 
 * Copyright (c) 2013 Tony Ross
 * Released under the MIT license
 * http://github.com/antross/view
 */
(function(win, doc){
    'use strict';
    
    var _hidden = 'hidden';
    
    // Approximate `setImmediate` support until a simple, cross-browser option exists
    var setImmediate = win.setImmediate || function(fn) { setTimeout(fn, 0) };
    
    // Create a `view` instance with the provided `root` as the default context
    function _scope(root) {
        
        // Show a set of elements and hide their siblings.
        function view(targets, options) {
            _iterate(targets, _view, root, options);
        }
        
        // Hide elements without showing others.
        view.hide = function(targets, options) {
            _iterate(targets, _hide, root, options);
        };
        
        // Show elements without hiding others.
        view.show = function(targets, options) {
            _iterate(targets, _show, root, options);
        };
        
        // Obtain a `view` scoped to a given root.
        view.scope = function(root) {
            // Verify root can contain and query elements
            if(!root || !root.querySelectorAll) {
                throw new Error('[view.js] The `root` passed to `view.scope` must support `querySelectorAll`.');
            }
            return _scope(root);
        };
        
        return view;
    }
    
    // Convert a selector into a collection of targets
    function _find(selector, root) {
        var targets = [].slice.call(root.querySelectorAll(selector));
        // Facilitate debugging mis-typed selectors
        if(!targets.length) {
            throw new Error('[view.js] No targets found for "' + selector + '".');
        }
        // Return the converted target list
        return targets;
    }
    
    // Ensure the target element is hidden
    function _hide(target) {
        if(!target.hasAttribute(_hidden)) {
            target.setAttribute(_hidden, '');
            _notify(target, 'view:hide');
            // Notify visible descendants
            [].forEach.call(target.querySelectorAll('[hidden] ~ :not([hidden])'), function(item) {
                _notify(item, 'view:hide');
            });
        }
    }
    
    // Loop over and process the arguments passed to `view`, `view.show`, or `view.hide`
    function _iterate(targets, fn, root, options) {
        if(!options) options = {};
        // Extract data if provided
        var data = options.data;
        // Disambiguate target formats to produce a list of target references
        if(typeof targets == 'string') {
            targets = _find(targets, root);
        } else if(!targets.length) {
            targets = [targets];
        }
        // Iterate and call our provided function on each matched target
        targets.forEach(function(target) {
            fn(target, targets, data, options);
        });
    }
    
    // Create and dispatch a DOM event when elements are shown/hidden
    function _notify(element, name, detail) {
        var event = doc.createEvent('CustomEvent');
        event.initCustomEvent(name, false, false, detail || {});
        setImmediate(function(){ element.dispatchEvent(event) });
    }
    
    // Ensure the target element is visible
    function _show(target, targets, data) {
        if(target.hasAttribute(_hidden)) {
            target.removeAttribute(_hidden);
            _notify(target, 'view:show', {data: data});
            // Notify visible descendants
            [].forEach.call(target.querySelectorAll('[hidden] ~ :not([hidden])'), function(item) {
                _notify(item, 'view:show');
            });
        }
    }
    
    // Ensure the target element is visible and hide siblings.
    // Optionally ensure ancestors are also visible.
    function _view(target, targets, data, options) {
        // Show the target element
        _show(target, targets, data);
        // Walk all siblings to ensure only the target element is visible
        var parent = target.parentNode;
        var next = parent && parent.firstElementChild;
        while(next) {
            // Hide siblings that are not also in the targets list
            if(targets.indexOf(next) == -1) {
                _hide(next);
            }
            next = next.nextElementSibling;
        }
        // Check if we should force full visibility of the target
        if(options.deep && parent && parent.hasAttribute) {
            // Walk the parent chain to ensure each ancestor is visible
            _view(parent, targets, null, options);
        }
    }
    
    // Expose the `view` function globally and via AMD if available
    var view = win.view = _scope(doc);
    if(win.define) win.define(function(){ return view });
})(this, this.document);
