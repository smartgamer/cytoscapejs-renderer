import sigma from 'sigma'


import {
  PRESET_COLORS,
} from './SigmaConfig'

const DEF_ZOOM_RATIO = 1.2


const fit = (camera, graph) => {
  sigma.misc.animation.camera(
    camera,
    {
      'angle': 0,
      'ratio': 1,
      'x': 0,
      'y': 0,
    },
    {'duration': 500},
  )

}

const zoomToNode = (camera, graph, nodeId, ratio=0.05) => {

  const node = graph.nodes(nodeId)
  if(node === undefined) {
    return
  }

  sigma.misc.animation.camera(
    camera,
    {
      x: node[camera.readPrefix + 'x'],
      y: node[camera.readPrefix + 'y'],
      ratio: ratio
    },
    {
      duration: 450
    }
  );

}

const zoomIn = (camera, graph, zoomRatio = DEF_ZOOM_RATIO) => {

  sigma.misc.animation.camera(
    camera,
    {'ratio': camera.ratio / zoomRatio},
    {'duration': 150},
  );

}

const zoomOut = (camera, graph, zoomRatio = DEF_ZOOM_RATIO) => {

  sigma.misc.animation.camera(
    camera,
    {'ratio': camera.ratio * zoomRatio},
    {'duration': 150},
  );

}


const findPath = (camera, graph, parameters) => {

  const startId = parameters[0]
  const goalId = parameters[1]

  const path = graph.astar(startId, goalId, {})

  console.log('??????????????????????????? PATH')
  console.log(path)

  path.forEach(node => {
    node.color = '#FF0000'

  })

  for(let i = 0; i<path.length-1; i++) {

    const source = path[i]
    const target = path[i+1]

    console.log(source.id)
    const edge = graph.getEdge(source.id, target.id)
    if(edge !== undefined) {
      edge.size = 1000
      edge.color = '#FF0000'
    }
  }

  return path
}

const select = (camera, graph, targets) => {

  // To be selected
  const targetNodes = graph.nodes(targets)

  // All nodes in current graph
  const nodes = graph.nodes()

  let i = nodes.length
  while(i--) {
    nodes[i].color = PRESET_COLORS.GRAY
  }

  targetNodes.forEach(node => {node.color = '#FF0000'})
}



const commands = {
  fit,
  zoomToNode,
  zoomIn,
  zoomOut,
  findPath,
  select
}

export const SigmaCommandExecutor = (commandName, args=[]) => {

  const command = commands[commandName]
  if (command !== undefined) {
    // If such command is available, execute it.
    return command(...args)


  } else {
    console.warn(`Command is not available: ${commandName}`)
  }

}
