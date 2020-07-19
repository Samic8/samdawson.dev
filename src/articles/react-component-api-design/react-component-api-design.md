---
title: "React Component API Design"
slug: react-component-api-design
techs: ["React"]
date: "2020-02-15"
updated: "2020-07-19"
featuredImage: "./Flexibility_Spectrum.svg"
---

This article will go over some component API design patterns at a high level without getting into implementation details of specific components.

A _Component API_ is the props of a component. When we design APIs at the right level of flexibility we reduce refactors, encourage code reuse, and increase UI consistency.

All components exist somewhere on a flexibility spectrum:

![Flexibility Spectrum](./Flexibility_Spectrum.svg)

## **Strict Props**

Strict props involves well-defined props. They have input props for data, and use callbacks for output:

```jsx
<Select
  options={[1, 2, 3]}
  selectedOption={1}
  onSelectedOptionChange={() => /* ... */}
/>
```

**Pros:** Best for consistency, there is a limited number of ways to use the component.

**Components:** Complexity can arise with lots of props.

## **Component Props**

Component props involve a data structure which includes a component reference somewhere in that structure:

```js
<Multiselect
  options={[
    { title: 1, component: MyOptionComponent, text: "One" }
  ]}
/>
```

**Pros:** Able to be explicit about what components can be swapped through the base components API.

**Cons:** Complexity can arise if it's trying to suit many use cases, for example, allowing all components to be swapped.

### **Compound Components**

Involves defining specific components to be used with a *base* component:

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

The `jsx,<Multiselect />` is the *base* component while the `jsx,<Option />` and `jsx,<Group />` components are the specific components. You can find a introduction to compound components [here](/article/compound-components-what-why-when).

**Pros:** The high flexibility allows you to make variations without having to extend the *base* component.

**Cons:** The high flexibility can be a disadvantage for consistency. It allows yourself and others to use components in unintended ways, which might go against the reason for componentizing something the first place (consistency).

## Flexibility Modifiers

Some React features can help with designing more flexible APIs. They both facility **parent to child** and **child to parent** communication. The API design patterns that we have explored can be used in combination with these modifiers to make your components more flexible.

* [Render Props](https://reactjs.org/docs/render-props.html)

* [React Context](https://reactjs.org/docs/context.html)