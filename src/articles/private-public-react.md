---
title: "Private and public functions in React"
slug: private-and-public-functions-in-react
techs: ["React", "Testing"]
date: "2021-10-02"
draft: true
---

With Frontend libraries like React, we often don't use classes. But the same public/private differentiation can be made through the `export` keyword. Anything that has an `export` is public and anything that doesn't is private.

It can be a red flag if a function is exported only for testing. There are a few problems with doing this:

## The export could potentially no longer be used in the truly public function of the module (false-positive test)

With the `<Card>` being the public part. If the `<Heading>` is only exported to be tested.

```jsx
export function Heading({ title }) {
  return <h1>Title - {title}</h1>
}

export function Card({ title }) {
  return (
    <section>
      <Heading title={title} />
    </section>
  )
}
```

If the `<Card>` heading is not testing the Card component directly and the heading is no longer used within it. The tests would still pass giving you a false-positive result.

```jsx
export function Heading({ title }) {
  return <h1>Title - {title}</h1>
}

export function Card({ title }) {
  return <section>Whoops no heading</section>
}
```

## It makes the implementation of the truly public function less flexible

For example, if the private function is not exported.

```jsx
function Heading({ title }) {
  return <h1>Title - {title}</h1>
}

export function Card({ title }) {
  return (
    <section>
      <Heading title={title} />
    </section>
  )
}
```

Changing the style of the code to not use a separate `<Heading>` becomes not a problem.

```jsx
export function Card({ title }) {
  return (
    <section>
      <h1>Title - {title}</h1>
    </section>
  )
}
```

A private function is an implementation detail and subject to change.

The private and public differences come from Object Orientated code but I think it's helpful to think about ES modules using functional code in the same way.
