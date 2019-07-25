---
title: Theming with currentColor
slug: current-color
techs: CSS
date: "2019-07-25"

todos: "
  1. Create article in the works on creating color class utilities and link it here.
  2. Create article about composable CSS utilities and link it here.
"
---

One tool for writing composable CSS utility classes is the **currentColor** property with inheritance to *theme* elements.

In cases where you have a class that needs to have 4 different color themes an approach might be to make 4 classes.

```css
.select-option-spice-mild {
    color: var(--color-green-5);
}

.select-option-spice-medium {
    color: var(--color-yellow-5);
}

.select-option-spice-hot {
    color: var(--color-red-5);
}

.select-option-spice-extreme {
    color: var(--color-red-8);
}
```
This color naming system was talked about in a [previous post](./color-system/#numbered-colors) of mine.

With **currentColor** we can create a utility class.

```css
.select-option-spice-themed {
    color: currentColor;
}
```

Then in our HTML we can apply a class with a color property and the *themed* class.

```html
<li class="select-option-spice-themed color-alias-spice-mild">Mild</li>
```

## SVG's and currentColor

The **currentColor** property is handy within SVG's too. By making icons *themable* without having to *reach* into the SVG using classes or ID selectors.

We want to color a chilli icon with different colors for each spice level.

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" width="50" height="50" style="margin: 30px auto">
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

One approach would be to create a new SVG for each spice level but creating many SVG's might also create an "out of sync" issue where one icon is updated but the others are not.

```xml
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512">
    <!-- Use currentColor for the main fill of the icon -->
    <path fill="currentColor" d="M52.728,407.016c72.703,8.192,140.618-24.16,200.282-88.403
        c71.543-77.044,74.338-193.279,74.338-208.146s168.153-45.436,163.544,74.338c-6.378,166.458-110.451,311.417-296.118,325.839
        c-88.938,6.913-143.903-13.797-169.297-34.865C-14.503,442.609,14.325,402.69,52.728,407.016"/>
    <!-- The fill on the steam of the chilli remains a static green -->
    <g>
        <path fill="#77B255;" d="M309.813,119.58c6.631-23.09,49.227-56.898,106.556-43.979
            c63.187,14.243,89.399,44.157,89.399,98.662c0,54.519-53.479,7.27-60.912-9.456s-38.403,33.452-65.462-19.031
            C370.234,128.025,298.186,160.051,309.813,119.58"/>
        <path fill="#77B255;" d="M382.597,14.367c16.92,17.246,45.123,40.618,32.783,78.293
            c-12.355,37.674,18.986,37.036,26.746,14.14c7.731-22.881,10.065-72.123-6.467-94.112C419.142-9.302,369.797,1.313,382.597,14.367"
            />
    </g>
</svg>
```

Then when using the SVG we can use [color aliases](./post/color-system/#aliases) for our spice levels to theme the icon. There are [many ways to include an SVG](https://css-tricks.com/using-svg/) but for this example lets just include it inline.

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
<ul style="list-style: none">
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

What if we don't want to color the text as well? We can prevent the color being inherited by setting a color on the text. That way the color will be inherited in the SVG but not the span.

```html
<li class="color-alias-spice-mild">
    <svg>
        <!-- All the svg stuff you would expect in here -->
    </svg>
    <span class="color-alias-body-text">Mild</span>
</li>
```

<ul style="list-style: none">
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
