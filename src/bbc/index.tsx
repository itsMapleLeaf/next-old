import * as bbc from 'bbc.js'
import * as React from 'react'

export function renderBBCNode(node: bbc.Node, index: number): React.ReactNode {
  if (node.type === 'text') {
    return node.text
  }
  if (node.type === 'tag') {
    const renderChildren = () => node.children.map(renderBBCNode)

    switch (node.tag) {
      case 'b':
        return <b key={index}>{renderChildren()}</b>
      case 'i':
        return <i key={index}>{renderChildren()}</i>
      default:
        return renderChildren()
    }
  }
}

export function renderBBCTree(tree: bbc.Node[]) {
  return tree.map(renderBBCNode)
}

export function renderBBCString(bbcString: string) {
  return renderBBCTree(bbc.toTree(bbcString))
}
