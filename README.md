# SI Multirotator - Cycle through sets of related images/content, spread out across the page
Developed by Mike Spooner (thetuningspoon) for Solution Innovators

SI Modal enables opening any page or submitting any form to a responsive modal window.

## Usage

1. Load si-multirotator.js in the head section of your page (after jQuery)
2. Initialize the function somewhere in your javascript:

```
$(function() {
    new SiMultiRotator({
        transitionSpeed: 200,
        autoTransitionSpeed: 1000,
        slideTimeout: 5000,
        thumbnailSelector: '.thumb',
        imageSelector: '.img',
        captionSelector: '.caption',
        pauseOverSelector: '.thumb, .img, .caption',
    });
}
```
3. Each element on the page (thumbnail, image, and caption) must have a data-index attribute with the numerical index of the element (starting at 0). For example, the thumbnail for a particular image, should have a data-index that matches a data-index on the corresponding full size image it represents. The appropriate caption element should also share the same index:

```
<img class="thumb" src="" data-index="0" />
<img class="thumb" src="" data-index="1" />
<img class="thumb" src="" data-index="2" />

<img class="img" src="" data-index="0" />
<img class="img" src="" data-index="1" />
<img class="img" src="" data-index="2" />

<div class="caption" data-index="0" />
<div class="caption" data-index="1" />
<div class="caption" data-index="2" />
```

You may initialize the module more than once on the same page by using different selectors for the thumbnails, images, and captions.