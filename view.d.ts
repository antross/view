/* tslint:disable */

/**
 * Show a set of elements and hide their siblings.
 */
declare function view(selector: string, options?: view.Options);
declare function view(target: Node, options?: view.Options);
declare function view(targets: Node[], options?: view.Options);
declare function view(targets: NodeList, options?: view.Options);

declare module view {

    interface Options {
        /**
         * Provide data to be exposed via `event.detail.data` of the `view:show` event.
         */
        data?: any;

        /**
         * Ensure all ancestors of matched elements are also visible.
         */
        deep?: boolean;
    }

    /**
     * Show elements without hiding others.
     */
    function show(selector: string, options?: Options);
    function show(target: Node, options?: Options);
    function show(targets: Node[], options?: Options);
    function show(targets: NodeList, options?: Options);

    /**
     * Hide elements without showing others.
     */
    function hide(selector: string);
    function hide(target: Node);
    function hide(targets: Node[]);
    function hide(targets: NodeList);

    /**
     * Toggle the visibility of elements without affecting siblings.
     */
    function toggle(selector: string, options?: Options);
    function toggle(target: Node, options?: Options);
    function toggle(targets: Node[], options?: Options);
    function toggle(targets: NodeList, options?: Options);

    /**
     * Obtain a `view` scoped to a given root.
     */
    function scope(root: Element): view;
}

interface view {

    /**
     * Show a set of elements and hide their siblings.
     */
    (selector: string, options?: view.Options);
    (target: Node, options?: view.Options);
    (targets: Node[], options?: view.Options);
    (targets: NodeList, options?: view.Options);

    /**
     * Show elements without hiding others.
     */
    show(selector: string, options?: view.Options);
    show(target: Node, options?: view.Options);
    show(targets: Node[], options?: view.Options);
    show(targets: NodeList, options?: view.Options);

    /**
     * Hide elements without showing others.
     */
    hide(selector: string);
    hide(target: Node);
    hide(targets: Node[]);
    hide(targets: NodeList);

    /**
     * Toggle the visibility of elements without affecting siblings.
     */
    toggle(selector: string, options?: view.Options);
    toggle(target: Node, options?: view.Options);
    toggle(targets: Node[], options?: view.Options);
    toggle(targets: NodeList, options?: view.Options);

    /**
     * Obtain a `view` scoped to a given root.
     */
    scope(root: Element): view;
}

export = view;
