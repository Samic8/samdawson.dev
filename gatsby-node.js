const { dedupeTechs } = require('./src/utility/data');

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
            reporter.info(`Creating category: ${tech}`)
            createPage({
                path: `category/${tech}`,
                component: require.resolve("./src/templates/CategoryList.js"),
                context: {
                    tech,
                    allMarkdownRemark: {
                        edges: allMarkdownRemark.edges.filter(({node}) => {
                            return node.frontmatter.techs.includes(tech);
                        })
                    }
                },
            })
        })
    }

    function createCategories(allMarkdownRemark) {
        reporter.info(`Creating all articles page`)
        createPage({
            path: `all-articles`,
            component: require.resolve("./src/templates/CategoryList.js"),
            context: {
                tech: 'All',
                allMarkdownRemark,
            },
        })
    }
    
    function createPosts(allMarkdownRemark) {
        allMarkdownRemark.edges.forEach(({ node }) => {
            reporter.info(`Creating post: ${node.frontmatter.slug}`)
            createPage({
                path: `post/${node.frontmatter.slug}`,
                component: require.resolve("./src/templates/post.js"),
                context: {
                    id: node.id,
                },
            })
        })
    }
}