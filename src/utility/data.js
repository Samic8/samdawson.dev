export const mapEdgesToNode = (data, generator = val => val) => data.edges.map((edge) => generator(edge.node))
export const techsToArray = techs => techs ? techs.split(' ') : []