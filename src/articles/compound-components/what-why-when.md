---
title: "Compound Components: What, Why and When."
slug: compound-components-what-why-when
techs: ["React"]
date: "2020-02-02"
---

## What **are _Compound Components_?**

It's a base component that expects to be combined with other specific components. Below the `jsx,<Multiselect />` is the _base_ component and the `jsx,<Option />` and `jsx,<Group />` components are the _specific_ components.

```jsx
<Multiselect
  selectedValues={[1, 2]}
  onSelectedValuesChange={newValues => /* ... */}/>
  <Option optionValue={1}>One</Option>
  <Group header="The best numbers">
    <Option optionValue={2}>Two</Option>
    <Option optionValue={3}>Three</Option>
  </Group>
</Multiselect>
```

It differs from the use of `jsx,{ children }` props where you are not expecting any components in particular.

```jsx
<Box>
  <Header title="My Work" />
  <Content>Lots of good stuff</Context>
</Box>
```

While the `jsx,<Multiselect />` children will accept any components, having a combination of a _base_ and a specific component like `jsx,<Option />` that is intended to be used with it passes our Compound Component definition.

## Why **would you opt for this pattern?**

The main advantage that the Compound Component pattern version offers is its _flexibility_. Want to make a `<Multiselect />` of people that includes their avatar? Easy.

```jsx
<Multiselect
  selectedValues={[1, 2]}
  onSelectedValuesChange={newValues => /* ... */}/>
  <PersonOption personId={1}>Jane</Option>
  <PersonOption personId={2}>John</Option>
</Multiselect>
```

We can support many variations without having to change the base components code.

To mirror the same behaviour using strict props we need to start adding _flags_ like `jsx,isPersonOptions`:

```jsx
<Multiselect
  selectedValues={[1, 2]}
  onSelectedValuesChange={newValues => /* ... */}
  isPersonOptions={true}
  options={[
    {name: 'Jane', id: 1},
    {name: 'John', id: 2},
  ]}/>
</Multiselect>
```

More flags will build up over time and the complexity will grow.

## When **should you use it?**

It's when you need _flexibility_. Are you building something that will be widely used?

See [React Component API Design](/article/react-component-api-design) for API design alternatives.
