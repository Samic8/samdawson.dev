---
title: "Transforming data for simpler components"
slug: data-massaging
techs: ["React"]
date: "2020-05-21"
---

Often we can end up with complex logic in components because the shape of the data determines how we write our component code. Sometimes we are not in control of that data at all.

If we can simplify that data before it reaches the component, our component code can become simpler and therefore easier to maintain. With the side effect of making our data easier to test and understand.

I like to call this **data massaging** 💆.

## Without data massaging

Say we had data about cars that needs to be displayed in a table

```js
const cars = [
  {
    name: "Subaru XV",
    features: {
      aircon: "yes",
      touchscreen: "yes",
      heatedSeats: "no",
    },
  },
  {
    name: "Ford Focus",
    features: {
      aircon: "yes",
      touchscreen: "no",
      heatedSeats: "yes",
    },
  },
]
```

The table needs to look like this
<br/>
<br/>

<table class="w-full">
  <thead>
    <th>Car</th>
    <th>Aircon</th>
    <th>Touchscreen</th>
    <th>Heated seats</th>
  </thead>
  <tbody>
    <tr>
      <td>Subaru XV</td>
      <td>Yes</td>
      <td>Yes</td>
      <td>No</td>
    </tr>
    <tr>
      <td>Ford Focus</td>
      <td>Yes</td>
      <td>No</td>
      <td>Yes</td>
    </tr>
  </tbody>
<table>

<br/>
<br/>
We can write some component code to do that, using the data directly

```jsx
function CarTable({ cars }) {
  return (
    <table>
      <thead>
        <th>Car</th>
        <th>Aircon</th>
        <th>Touchscreen</th>
        <th>heatedSeats</th>
      </thead>
      <tbody>
        {cars.map(car => (
          <tr>
            <td>{car.name}</td>
            <td>{car.features.aircon}</td>
            <td>{car.features.touchscreen}</td>
            <td>{car.features.heatedSeats}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

That does not seem too complex but its not very future proof, every time you add a new column this component needs to change, and the unit tests for that component need to be updated. If in the future we wanted to allow users to configure what columns were shown, then we would have to add conditions for when each **td** is shown and make sure the corresponding **th** is too.

```jsx
function CarTable({ cars, shownColumns }) {
  return (
    <table>
      <thead>
        {shownColumns.car && <th>Car</th>}
        {shownColumns.aircon && <th>Aircon</th>}
        {shownColumns.touchscreen && <th>Touchscreen</th>}
        {shownColumns.heatedSeats && <th>heatedSeats</th>}
      </thead>
      <tbody>
        {cars.map(car => (
          <tr>
            {shownColumns.car && <td>{car.name}</td>}
            {shownColumns.aircon && <td>{car.features.aircon}</td>}
            {shownColumns.touchscreen && <td>{car.features.touchscreen}</td>}
            {shownColumns.heatedSeats && <td>{car.features.heatedSeats}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

Maybe you end up with new data structures like **shownColumns** too, which add to the complexity of the component and its unit tests.

## A better way

In a perfect world what data structure would make this component simpler? Think it up. I think it might look something like this

```js
const table = {
  headers: ["Car", "Aircon", "Touchscreen", "Heated Seats"],
  rows: [
    {
      cells: ["Subaru XV", "yes", "yes", "no"],
    },
    {
      cells: ["Ford Focus", "yes", "no", "yes"],
    },
  ],
}
```

This is were data massaging can make our perfect world data structure a reality. After you get the data from its source, the data massaging function parses it before passing it to the display component.

The data gets transformed as it flows:

Data Source (API) ➡️ Data Massager (generateTableFromCars) ➡️ Display Component (InfoTable)

```js
function App() {
  const [cars, setCars] = useState([])

  useEffect(() => {
    // Disclaimer: Not the real fetch API
    fetch(/* ... */).then(({ data }) => {
      setCars(data)
    })
  })

  const tableData = generateTableFromCars(cars)

  return <InfoTable tableData={tableData} />
}
```

The table component then becomes simpler, more generic and easier to unit test. Easier to test because you are not having to write unit tests for every unique data property.

```jsx
function InfoTable({ tableData }) {
  return (
    <table>
      <thead>
        {tableData.headers.map(header => (
          <th>{header}</th>
        ))}
      </thead>
      <tbody>
        {tableData.rows.map(car => (
          <tr>
            {tableData.cells.map(cell => (
              <td>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

As for the feature where users can select want columns they want displayed, the data massager (generateTableFromCars) function can handle filtering to only the columns needed before it gets to the component.

The component code no longer has to change when there are changes to the data it needs to display.
