//!facet

import { Facet } from '@codemirror/state'

const includeActiveLine = Facet.define({
  combine: values => values.length ? values[0] : false
})

//!constructor

export
function blankLines(options = {}) {
  return [ options.includeActiveLine == null ? [] : includeActiveLine.of(options.includeActiveLine),
           showStripes ]
}

//!stripeDeco

import { Decoration } from '@codemirror/view'
import { RangeSetBuilder } from '@codemirror/state'

const stripe = Decoration.line({ attributes: { class: 'cm-blank-line' } })

function stripeDeco(view) {
  let builder

  builder = new RangeSetBuilder()
  for (let { from, to } of view.visibleRanges)
    for (let pos = from, line, head; pos <= to;) {
      line = view.state.doc.lineAt(pos)
      head = view.state.selection.main.head
      if (line.length == 0)
        if (!view.state.facet(includeActiveLine)
            && (line.from <= head)
            && (line.to >= head)) {
          // current line
        }
        else
          builder.add(line.from, line.from, stripe)
      pos = line.to + 1
    }
  return builder.finish()
}

//!showStripes

import { ViewPlugin } from '@codemirror/view'

const showStripes = ViewPlugin.fromClass(class {
  constructor(view) {
    this.decorations = stripeDeco(view)
  }

  update(update) {
    if (update.docChanged
        || update.viewportChanged
        || update.selectionSet) // for current line check
      this.decorations = stripeDeco(update.view)
  }
}, {
  decorations: v => v.decorations
})
