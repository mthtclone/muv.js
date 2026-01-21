1. Add animated-top, animated-bottom, animated-left, or animated-right to any element you want to animate on scroll.

2. If the element already uses a CSS transform (for example translateX(-50%) for centering), add
data-base-transform to preserve its original position during the animation. 

```
<div class="block animated-bottom" data-base-transform="translateX(-50%)">
```
