const { dedupeTechs } = require("./src/utility/data")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            frontmatter {
              slug
              techs
              title
              date(formatString: "MMM D, YYYY")
              dateTime: date(formatString: "YYYY-MM-DD")
            }
            excerpt(pruneLength: 200)
          }
        }
      }
    }
  `)

  createCategories(result.data.allMarkdownRemark)
  createAllArticlePage(result.data.allMarkdownRemark)
  createPosts(result.data.allMarkdownRemark)

  function createCategories(allMarkdownRemark) {
    dedupeTechs(allMarkdownRemark).map(tech => {
      reporter.info(`Creating category/${tech}`)
      createPage({
        path: `category/${tech}`,
        component: require.resolve("./src/templates/CategoryList.js"),
        context: {
          tech,
          ids: getIdsFromEdges(
            allMarkdownRemark.edges.filter(({ node }) => {
              return node.frontmatter.techs.includes(tech)
            })
          ),
        },
      })
    })
  }

  function createAllArticlePage(allMarkdownRemark) {
    reporter.info(`Creating articles`)
    createPage({
      path: `articles`,
      component: require.resolve("./src/templates/CategoryList.js"),
      context: {
        tech: "All",
        ids: getIdsFromEdges(allMarkdownRemark.edges),
      },
    })
  }

  function createPosts(allMarkdownRemark) {
    allMarkdownRemark.edges.forEach(({ node }) => {
      reporter.info(`Creating article: ${node.frontmatter.slug}`)
      createPage({
        path: `article/${node.frontmatter.slug}`,
        component: require.resolve("./src/templates/Article.js"),
        context: {
          id: node.id,
        },
      })
    })
  }
}

function getIdsFromEdges(edges) {
  return edges.map(({ node }) => node.id)
}
