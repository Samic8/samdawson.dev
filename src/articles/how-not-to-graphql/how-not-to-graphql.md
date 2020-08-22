---
title: "How not to GraphQL"
slug: how-not-to-graphql
techs: ["GraphQL"]
date: "2020-08-23"
---

If you're here you're probably second-guessing your usage of GraphQL. It's a great tool but if your not deliberate about your schema design than it can create complexity. A misuse of it can happen in the following way:

> **The design of your GraphQL Schema leads to _highly dynamic_ queries**

Imagine we are building a spreadsheet-like table where the existence of each column is determined by the user. They can add new columns with a plus button.

![Table](./table.png)

Ideally, we want to avoid over-fetching of data and only request what's needed to display the columns. We can do this with the `@includes` directive to make our queries dynamic.

```graphql
query issueQuery($tags: Boolean!) {
  issues {
    tags @include(if: $tags) {
      name
      color
    }
  }
}
```

But this becomes complex when almost every property needs to be dynamically included when dealing with multiple levels of hierarchy.

```graphql
query issueQuery($commenters: Boolean!, $commentersComments: Boolean!) {
  issues {
    commenters @include(if: $commenters) {
      name
      comments @include(if: $commentersComments) {
        text
      }
    }
  }
}
```

You might be tempted to do string concatenation (query generation) to create your GraphQL query and avoid the `@include` directive altogether.

```js
const includeCommenters = true
const includeCommentersComments = true

const query = `
  query issueQuery
    issues {
      ${includeCommenters ? `commenters {
        name
        ${includeCommentersComments ? `comments {
          text
        }` : ``}
      }` : ``}
    }
  }
`
```

But you will lose some of the benefits you get with GraphQL in its static form:

- Tools that statically analyze GraphQL
  - Generating typescript from GraphQL
  - Inspecting the schema from your text editor
- Developer clarity on the data that will be returned from a query

The benefit you get from GraphQL when generating the query is not over-fetching data.

### A solution

But wait. There's a way to get the benefits of GraphQL for our dynamic table. If you control the GraphQL Schema — meaning It's not a third party service — then you can change the Schema to better suit the display.

```graphql
query tableQuery($columns: String[]!) {
  dynamicTable(columns: $columns) {
    rows {
      columns {
        type
        ... on Title {
          title
        }
        ... on Tags {
          name
          color
        }
        ... on PullRequest {
          title
          link
        }
      }
    }
  }
}
```

With the use of inline-fragments, the returned shape of data is clear. If the columns argument included "Tags" then it would return that column in the response.

```js
// If we ran the query with the argument
const $columns = ["Tags"]

// It would return this
const response = {
  customTable: {
    rows: [
      {
        columns: [{ type: "Tags", name: "Bug", color: "red", id: 100 }],
      },
      {
        columns: [{ type: "Tags", name: "Improvement", color: "yellow", id: 111 }],
      },
    ],
  },
}
```

This approach radically simplifies our frontend code allowing us to [write simpler components](https://www.samdawson.dev/article/data-massaging).
