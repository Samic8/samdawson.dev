const { dedupeTechs } = require('./src/utility/data');

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
                            techs
                        }
                    }
                }
            }
        }
    `)
    
    createCategories(result.data.allMarkdownRemark)
    createPosts(result.data.allMarkdownRemark)

    function createCategories(allMarkdownRemark) {
        dedupeTechs(allMarkdownRemark).map(tech => {
            reporter.info(`Creating category: ${tech}`)
        })
    }
    
    function createPosts(allMarkdownRemark) {
        allMarkdownRemark.edges.forEach(({ node }) => {
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
}
