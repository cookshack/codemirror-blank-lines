//!baseTheme

import { EditorView } from '@codemirror/view'

const baseTheme = EditorView.baseTheme({ '.cm-blank-line': { lineHeight: '0.9' } })

//!facet

import { Facet } from '@codemirror/state'

const stepSize = Facet.define({
  combine: values => values.length ? Math.min(...values) : 2
})

//!constructor

export
function blankLines(options = {}) {
  return [ baseTheme,
           options.step == null ? [] : stepSize.of(options.step),
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
    for (let pos = from, line; pos <= to;) {
      line = view.state.doc.lineAt(pos)
      if (line.length == 0)
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
    if (update.docChanged || update.viewportChanged)
      this.decorations = stripeDeco(update.view)
  }
}, {
  decorations: v => v.decorations
})
