module.exports = {
    mapEdgesToNode,
    techsToArray,
    dedupeTechs
}

function mapEdgesToNode (data, generator = val => val) { return data.edges.map((edge) => generator(edge.node)) }
    
function techsToArray (techs) { return techs ? techs.split(' ') : [] }

function dedupeTechs (allMarkdownRemark) {
    const allTechs = mapEdgesToNode(allMarkdownRemark, node => techsToArray(node.frontmatter.techs))
    const flatteredTechs = [].concat.apply([], allTechs)
    return Array.from(new Set(flatteredTechs))
}
