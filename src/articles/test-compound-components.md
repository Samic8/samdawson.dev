---
title: "How to test Compound Components"
slug: how-to-test-compound-components
techs: ["React", "Jest"]
date: "2020-11-11"
---

For a quick overview on Compound Compounds check out [this article](/article/compound-components-what-why-when).

Compound components are made up of many component _parts_. The most effective way to test them is together, holistically. To achieve this, the tests are usually within a single test file where the _base_ and _part_ components are tested together.

<!-- TODO make sure base and part component concept is mentioned in previous chapter -->

To improve the future maintainability of our tests we want to adhere to behavioral testing, both in the way we expect our users to behave and the way developers using our components will behave. _Together_ is how a developer is going to use our compound components.

User behavior means interacting with components in our tests the way a user would. In this example, they click on an option and that value to be selected.

```jsx
describe("Multiselect", () => {
  describe("given some selected options", () => {
    const onChange = jest.fn()
    beforeEach(() => {
      setup({
        options: ["item1", "item2"],
        selectedValues: ["item1"],
        onChange,
      })
    })

    describe("when a user clicks on a selected option", () => {
      beforeEach(() => {
        // Get the option by text, not by class-name or any method a user wouldn't use
        userEvent.click(screen.getByText("item1"))
      })

      // Assertion text matches the users expectation
      it("then should un-select that item", () => {
        // Props match the developers expectation
        expect(onChange).toHaveBeenCalledWith([])
      })
    })
  })
})
```

With controlled components like this one, the component does not handle its own
internal state, so clicking on an item only runs a callback. We have chosen to
write the tests mostly from the user's point of view and the onChange callback
assertion from the developer's point of view.

Testing with developer behaviour means mimicking how developers will use the component. With a compound component they will use multiple _part_ components often passing them into a parent _base_ component.

```jsx
function setup({ options, selectedValues, onChange }) {
  render(
    <Multiselect
      selectedValues={selectedValues}
      onChange={onChange}/>
      {options.map(value => (
        <Option key={value} value={value}>{value}</Option>
      ))}
    </Multiselect>
  )
}
```

Writing tests the same way developers use our components also means minimal mocking. Using real composable component _parts_ with our _base_ component. In this example, the `<Option />` _part_ is a real component.

This `<Multiselect />` is implemented using Context which allows the _base_ and _part_ components to communicate. But the test shouldn't need to know that Context even exists. We could refactor the component and remove context and use another method to get the same result and our tests wouldn't need to change.

The core benefit of a compound component is that it provides high flexibility allowing developers to create their own component _parts_ to modify the functionality or style.

A simple approach for writing tests for each _part_ variation is to duplicate the tests for each interchangeable _part_. For example, we might want to create a `<PersonOption />` component that includes an avatar with each of the options. We can create a separate setup function and copy the same tests we created for the `<Option />` component.

```jsx
function setupPersonOptions({ options, selectedValues, onChange }) {
  render(
    <Multiselect
      selectedValues={selectedValues}
      onChange={onChange}/>
      {options.map(({name, imgUrl}) => (
        <PersonOption key={name} value={name} imgUrl={imgUrl}>{name}</PersonOption>
      ))}
    </Multiselect>
  )
}

describe("Multiselect", () => {
  describe("given some selected options", () => {
    const onChange = jest.fn();
    beforeEach(() => {
      const options = [{ name: "Sam", imgUrl: "https..." }, { name: "Jane", imgUrl: "https..." }];
      setupPersonOptions({ options, selectedValues: [options[0]], onChange })
    });

    describe("when a user clicks on a selected option", () => {
      beforeEach(() => {
        userEvent.click(screen.getByText(options[0].name));
      })

      it("then should un-select that item", () => {
        expect(onChange).toHaveBeenCalledWith([]);
      });
    });
  });
});
```

It can be tempting to write tests where we mock context so we don't have to write separate tests for each _part_ component to ensure it communicates as expected with the _base_ component (the Multiselect). But when we do that, we lose confidence that our components work as expected together.

For component library maintainers testing holistically becomes more difficult because the developers using the component might write component _parts_ that widely differ to the default _parts_ provided by the library.

For specialty cases like these, we might want to create mock _part_ components that cover all of the API provided by the _base_ component (the Multiselect). This approach should only be taken in rare circumstances, as it leads to an extra component to maintain and complex tests, the mock component also does not provide any value outside of the tests.

<!-- End of chapter and go to implementation testing of context next? -->
