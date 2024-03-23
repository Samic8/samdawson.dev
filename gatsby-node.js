const { dedupeTechs } = require("./src/utility/data")
const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
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
        component: path.resolve("./src/templates/CategoryList.js"),
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
      component: path.resolve("./src/templates/CategoryList.js"),
      context: {
        tech: "All Articles",
        ids: getIdsFromEdges(allMarkdownRemark.edges),
      },
    })
  }

  function createPosts(allMarkdownRemark) {
    allMarkdownRemark.edges.forEach(({ node }) => {
      reporter.info(`Creating article: ${node.frontmatter.slug}`)
      createPage({
        path: `article/${node.frontmatter.slug}`,
        component: path.resolve("./src/templates/Article.js"),
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

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
