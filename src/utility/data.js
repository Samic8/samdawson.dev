module.exports = {
  mapEdgesToNode,
  dedupeTechs,
}

function mapEdgesToNode(data, generator = val => val) {
  return data.edges.map(edge => generator(edge.node))
}

function dedupeTechs(allMarkdownRemark) {
  const counts = {}
  const uniqueCategories = new Set()
  allMarkdownRemark.edges.forEach(({ node }) => {
    // Transform space separated categories into an array
    node.frontmatter.techs.forEach(category => {
      if (!counts[category]) {
        counts[category] = 1
      } else {
        counts[category]++
      }

      uniqueCategories.add(category)
    })
  })
  // Create new array with duplicates removed
  return Array.from(uniqueCategories).sort((a, b) => counts[b] - counts[a])
}
