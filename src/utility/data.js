module.exports = {
  mapEdgesToNode,
  techsToArray,
  dedupeTechs,
}

function mapEdgesToNode(data, generator = val => val) {
  return data.edges.map(edge => generator(edge.node))
}

function techsToArray(techs) {
  return techs ? techs.split(" ") : []
}

function dedupeTechs(allMarkdownRemark) {
  const uniqueCategories = new Set();
  allMarkdownRemark.edges.forEach(({ node }) => {
    // Transform space separated categories into an array
    node.frontmatter.techs.split(" ").forEach(category => {
      uniqueCategories.add(category);
    })
  })
  // Create new array with duplicates removed
  return Array.from(uniqueCategories);
}
