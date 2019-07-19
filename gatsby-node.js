exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions

    const result = await graphql(`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        id
                        frontmatter {
                            slug
                        }
                    }
                }
            }
        }
    `)

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        reporter.info(`Creating post: ${node.frontmatter.slug}`)
        createPage({
            path: node.frontmatter.slug,
            component: require.resolve("./src/templates/post.js"),
            context: {
                id: node.id,
            },
        })
    })
}
