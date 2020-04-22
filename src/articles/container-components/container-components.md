---
title: "Goodbye presentational and container components?"
slug: container-components
techs: ["React"]
date: "2020-04-22"
---

I had been following the [Presentational and Container](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) pattern invented by Dan Abramov, although it seems that even Dan has changed his views on the usefulness of this pattern with the introductions of hooks, as mentioned in the “updated:” section at the top of that article.

I found another article useful [on freecodecamp](https://www.freecodecamp.org/news/a-new-approach-to-react-component-design-2bf76a87add1/) when talking about the failings of the Presentational and Container pattern.

> The problem with the Container vs Presentational model is that it tries too hard to define component responsibilities in terms of **component inner-workings**. The key takeaway is to view component design in terms of **component interfaces**.

Hearing about the switch to focus on **Component interfaces** (or [API design](https://www.samdawson.dev/article/react-component-api-design)) was a "ah ha" moment for me. When a developer is looking for a component, they are mainly interested in how to use the component, not the implementation.

That article talks about **Universal** and **Global** components which I've also heard called [Base/Variants](https://www.samdawson.dev/article/react-component-api-design#basevariants-composed-components). I do also appreciate the differentiation of **View** components in this article because I think that was the main benefit I found from using Container components.

I had been guilty of following the Presentational and Container pattern just because it's a best practice which should have been a warning sign of its uselessness.
