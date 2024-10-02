//!facet

import { Facet } from '@codemirror/state'

const stepSize = Facet.define({
  combine: values => values.length ? Math.min(...values) : 2
})

//!constructor

export
function blankLines(options = {}) {
  return [ options.step == null ? [] : stepSize.of(options.step),
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
        if ((line.from <= head) && (line.to >= head)) {
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
