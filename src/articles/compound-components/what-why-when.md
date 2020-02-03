---
title: "Compound Components: What, Why and When."
slug: compound-components-what-why-when
techs: ["React"]
date: "2020-02-02"
---

### What **are _compound components_?**

<br/>

First off I don't think there is a definite name for this pattern. I have heard [Sarah Federman](https://twitter.com/sarah_federman) call this pattern "compound components" in her talk at the Web Directions Submit conference last year. I had been calling this pattern "composable components" but maybe that name is better reserved for actual composition where a component is used inside of another. While compound components are more about passing in components into "slots", in React this would be children or props.

A compound component is one that is intended to be used with other components. The _Multiselect_ is the **base** component, while the _Option_ and _Group_ components are the composable parts.

```js
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

<br/>

### Why **would you opt for this pattern?**

<br/>

Take this example of a similar _Multiselect_ Component using props instead of the composable parts in the previous snippet.

```js
<Multiselect
  selectedValues={[1, 2]}
  onSelectedValuesChange={newValues => /* ... */}
  options={[
    {display: 'One', value: 1},
    {
        groupTitle: 'The best numbers',
        options: [
          {display: 'Two', value: 2},
          {display: 'Three', value: 3},
        ]
    }
  ]}/>
</Multiselect>
```

In the _props_ example to enable group functionality, I created a nested data structure that has special objects for groups. There are much cleaner ways to achieve this specific functionality with props, but this is just an example to showcase the idea. With props like these, it's hard to separate the data model from the UI, you would need to build your data in a way to suit this props based component.

The main advantage that the compound component pattern version offers is its _flexibility,_ you can support many variations without having to change the base components code. Want to make a _Multiselect_ of people that shows their profile picture? Easy. Want to place an advertisement in between two groups of options? doable, maybe not the best user experience though.

<br/>

### When **should you reach for compound components?**

<br/>

It's when you really need that _flexibility_ benefit. Are you building something that you know will need to be used in subtly different ways many times throughout your application(s)? Deciding to go for the compound components pattern needs some forethought.

A stricter approach like props is better for consistency. If you want a component to look and behave the same everywhere that it is used then compound components should not be your first choice.

When you don't know what the future will hold for a component then maybe its best to use stricter props to begin with and then pay the refactoring price later on to transform it into a composable component.

> This is part of an article series on how to build a **compound component**. Subscribe to my newsletter below to get notified when the next articles are released.
