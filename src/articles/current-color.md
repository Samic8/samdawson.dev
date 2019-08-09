---
title: Theming with current color
slug: current-color
techs: ['CSS']
date: "2019-07-25"


todos: "
  1. Create an article in the works on creating color class utilities and link it here.
"
---

This article explores using the [currentColor](http://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentColor_keyword) property to theme elements, to avoid writing extra CSS to override color.

In cases where you have an element that needs to have a few different colors the default approach might be to make many different classes

```css
.select-option-spice-mild {
  background-color: var(--color-green-5);
}

.select-option-spice-medium {
  background-color: var(--color-yellow-5);
}

/* etc. */
```

Instead, we can create a single class, I am using "themed" to distinguish the class as making use of **currentColor**

```css
.select-option-spice-themed {
  background-color: currentColor;
}

/* Another class we are about to make use of */
.color-alias-spice-mild {
  color: var(--color-alias-spice-mild);
}
```

We can then use our "themed" class with a utility class includes a color property

```html
<li class="select-option-spice-themed color-alias-spice-mild">Mild</li>
```

This method only works well when combined with utility color classes, otherwise, we are just creating the same amount of classes plus a "themed" class.

<!-- TODO: Link to color utility class article -->

<!-- TODO: Create codepen with example -->

## SVG's and currentColor

The **currentColor** property is handy within SVG's too. By making icons "themable" without having to _reach_ into the SVG using class or ID selectors. This approach works well when there is only one element within an SVG to color, otherwise, a class or ID selectors are a better tool.

Say we want to color a chili icon with different colors for each spice level

<div style="margin: 30px auto; text-align: center">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" width="50" height="50" style="display: inline-block">
        <!-- Use currentColor for the main fill of the icon -->
        <path fill="#f55656" d="M52.728,407.016c72.703,8.192,140.618-24.16,200.282-88.403
            c71.543-77.044,74.338-193.279,74.338-208.146s168.153-45.436,163.544,74.338c-6.378,166.458-110.451,311.417-296.118,325.839
            c-88.938,6.913-143.903-13.797-169.297-34.865C-14.503,442.609,14.325,402.69,52.728,407.016"/>
        <!-- The fill on the steam of the chilli remains a static green -->
        <g>
            <path fill="#4caf50" d="M309.813,119.58c6.631-23.09,49.227-56.898,106.556-43.979
                c63.187,14.243,89.399,44.157,89.399,98.662c0,54.519-53.479,7.27-60.912-9.456s-38.403,33.452-65.462-19.031
                C370.234,128.025,298.186,160.051,309.813,119.58"/>
            <path fill="#4caf50" d="M382.597,14.367c16.92,17.246,45.123,40.618,32.783,78.293
                c-12.355,37.674,18.986,37.036,26.746,14.14c7.731-22.881,10.065-72.123-6.467-94.112C419.142-9.302,369.797,1.313,382.597,14.367"
                />
        </g>
    </svg>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" width="50" height="50" style="display: inline-block">
        <!-- Use currentColor for the main fill of the icon -->
        <path fill="#ffcf10" d="M52.728,407.016c72.703,8.192,140.618-24.16,200.282-88.403
            c71.543-77.044,74.338-193.279,74.338-208.146s168.153-45.436,163.544,74.338c-6.378,166.458-110.451,311.417-296.118,325.839
            c-88.938,6.913-143.903-13.797-169.297-34.865C-14.503,442.609,14.325,402.69,52.728,407.016"/>
        <!-- The fill on the steam of the chilli remains a static green -->
        <g>
            <path fill="#4caf50" d="M309.813,119.58c6.631-23.09,49.227-56.898,106.556-43.979
                c63.187,14.243,89.399,44.157,89.399,98.662c0,54.519-53.479,7.27-60.912-9.456s-38.403,33.452-65.462-19.031
                C370.234,128.025,298.186,160.051,309.813,119.58"/>
            <path fill="#4caf50" d="M382.597,14.367c16.92,17.246,45.123,40.618,32.783,78.293
                c-12.355,37.674,18.986,37.036,26.746,14.14c7.731-22.881,10.065-72.123-6.467-94.112C419.142-9.302,369.797,1.313,382.597,14.367"
                />
        </g>
    </svg>
</div>

One approach would be to create a new SVG for each spice level but creating many SVG's might also create an "out of sync" issue in the future where one icon is updated but the others are not.

We can add **currentColor** as a value to the fill attribute

```xml
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512">
    <!-- Use currentColor for the main fill of the icon -->
    <path fill="currentColor" d="..."/>
    <!-- The fill on the steam of the chilli remains a static green -->
    <g>
        <path fill="#77B255;" d="..."/>
        <path fill="#77B255;" d="..."/>
    </g>
</svg>
```

This is not limited to the fill attribute, it can also be used with the **stroke** attribute or in CSS with the **fill** or **stroke** property.

What I would do to color the icons is to create [color aliases](./article/color-system/#aliases) classes to represent the spice levels then include them in the HTML

```html
<li class="color-alias-spice-mild">
  <svg>
    <!-- All the svg stuff you would expect in here -->
  </svg>
  <span>Mild</span>
</li>
<li class="color-alias-spice-hot">
  <svg>
    <!-- All the svg stuff you would expect in here -->
  </svg>
  <span>Hot</span>
</li>
```

There are [many ways to include an SVG](https://css-tricks.com/using-svg/) but for this example we are including it inline.

Our icons will then appear colored with the colors in our color classes

<ul style="list-style: none; text-align: center">
    <li class="color-alias-spice-mild">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" width="50" height="50" style="display: inline-block">
        <!-- Use currentColor for the main fill of the icon -->
            <path fill="#ffcf10" d="M52.728,407.016c72.703,8.192,140.618-24.16,200.282-88.403
                c71.543-77.044,74.338-193.279,74.338-208.146s168.153-45.436,163.544,74.338c-6.378,166.458-110.451,311.417-296.118,325.839
                c-88.938,6.913-143.903-13.797-169.297-34.865C-14.503,442.609,14.325,402.69,52.728,407.016"/>
            <!-- The fill on the steam of the chilli remains a static green -->
            <g>
                <path fill="#4caf50" d="M309.813,119.58c6.631-23.09,49.227-56.898,106.556-43.979
                    c63.187,14.243,89.399,44.157,89.399,98.662c0,54.519-53.479,7.27-60.912-9.456s-38.403,33.452-65.462-19.031
                    C370.234,128.025,298.186,160.051,309.813,119.58"/>
                <path fill="#4caf50" d="M382.597,14.367c16.92,17.246,45.123,40.618,32.783,78.293
                    c-12.355,37.674,18.986,37.036,26.746,14.14c7.731-22.881,10.065-72.123-6.467-94.112C419.142-9.302,369.797,1.313,382.597,14.367"
                    />
            </g>
        </svg>
        <span class="select-option-spice-themed" style="margin-left: 20px; color: #ffcf10">Mild</span>
    </li>
    <li class="color-alias-spice-hot">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" width="50" height="50" style="display: inline-block">
            <!-- Use currentColor for the main fill of the icon -->
            <path fill="#f55656" d="M52.728,407.016c72.703,8.192,140.618-24.16,200.282-88.403
                c71.543-77.044,74.338-193.279,74.338-208.146s168.153-45.436,163.544,74.338c-6.378,166.458-110.451,311.417-296.118,325.839
                c-88.938,6.913-143.903-13.797-169.297-34.865C-14.503,442.609,14.325,402.69,52.728,407.016"/>
            <!-- The fill on the steam of the chilli remains a static green -->
            <g>
                <path fill="#4caf50" d="M309.813,119.58c6.631-23.09,49.227-56.898,106.556-43.979
                    c63.187,14.243,89.399,44.157,89.399,98.662c0,54.519-53.479,7.27-60.912-9.456s-38.403,33.452-65.462-19.031
                    C370.234,128.025,298.186,160.051,309.813,119.58"/>
                <path fill="#4caf50" d="M382.597,14.367c16.92,17.246,45.123,40.618,32.783,78.293
                    c-12.355,37.674,18.986,37.036,26.746,14.14c7.731-22.881,10.065-72.123-6.467-94.112C419.142-9.302,369.797,1.313,382.597,14.367"
                    />
            </g>
        </svg>
        <span class="select-option-spice-themed" style="margin-left: 20px; color: #f55656">Hot</span>
    </li>
</ul>

### Changing the text color

What if we don't want to color the text as well? We can prevent the color from being inherited by setting a color on the text. That way the color will be inherited in the SVG but not the span.

```html
<li class="color-alias-spice-mild">
  <svg>
    <!-- All the svg stuff you would expect in here -->
  </svg>
  <span class="color-alias-body-text">Mild</span>
</li>
```

<ul style="list-style: none; text-align: center">
    <li class="color-alias-spice-mild">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" width="50" height="50" style="display: inline-block">
        <!-- Use currentColor for the main fill of the icon -->
            <path fill="#ffcf10" d="M52.728,407.016c72.703,8.192,140.618-24.16,200.282-88.403
                c71.543-77.044,74.338-193.279,74.338-208.146s168.153-45.436,163.544,74.338c-6.378,166.458-110.451,311.417-296.118,325.839
                c-88.938,6.913-143.903-13.797-169.297-34.865C-14.503,442.609,14.325,402.69,52.728,407.016"/>
            <!-- The fill on the steam of the chilli remains a static green -->
            <g>
                <path fill="#4caf50" d="M309.813,119.58c6.631-23.09,49.227-56.898,106.556-43.979
                    c63.187,14.243,89.399,44.157,89.399,98.662c0,54.519-53.479,7.27-60.912-9.456s-38.403,33.452-65.462-19.031
                    C370.234,128.025,298.186,160.051,309.813,119.58"/>
                <path fill="#4caf50" d="M382.597,14.367c16.92,17.246,45.123,40.618,32.783,78.293
                    c-12.355,37.674,18.986,37.036,26.746,14.14c7.731-22.881,10.065-72.123-6.467-94.112C419.142-9.302,369.797,1.313,382.597,14.367"
                    />
            </g>
        </svg>
        <span class="select-option-spice-themed" style="margin-left: 20px;">Mild</span>
    </li>
    <li class="color-alias-spice-hot">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" width="50" height="50" style="display: inline-block">
            <!-- Use currentColor for the main fill of the icon -->
            <path fill="#f55656" d="M52.728,407.016c72.703,8.192,140.618-24.16,200.282-88.403
                c71.543-77.044,74.338-193.279,74.338-208.146s168.153-45.436,163.544,74.338c-6.378,166.458-110.451,311.417-296.118,325.839
                c-88.938,6.913-143.903-13.797-169.297-34.865C-14.503,442.609,14.325,402.69,52.728,407.016"/>
            <!-- The fill on the steam of the chilli remains a static green -->
            <g>
                <path fill="#4caf50" d="M309.813,119.58c6.631-23.09,49.227-56.898,106.556-43.979
                    c63.187,14.243,89.399,44.157,89.399,98.662c0,54.519-53.479,7.27-60.912-9.456s-38.403,33.452-65.462-19.031
                    C370.234,128.025,298.186,160.051,309.813,119.58"/>
                <path fill="#4caf50" d="M382.597,14.367c16.92,17.246,45.123,40.618,32.783,78.293
                    c-12.355,37.674,18.986,37.036,26.746,14.14c7.731-22.881,10.065-72.123-6.467-94.112C419.142-9.302,369.797,1.313,382.597,14.367"
                    />
            </g>
        </svg>
        <span class="select-option-spice-themed" style="margin-left: 20px;">Hot</span>
    </li>
</ul>

## Related Resources

This color naming system was talked about in a [previous post](./color-system/#numbered-colors) of mine.
