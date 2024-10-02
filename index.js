import { Facet } from '@codemirror/state'
import { Decoration } from '@codemirror/view'
import { RangeSetBuilder } from '@codemirror/state'
import { ViewPlugin } from '@codemirror/view'

let includeActiveLine, decoration, styleBlankLines

function style
(view) {
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
          builder.add(line.from, line.from, decoration)
      pos = line.to + 1
    }
  return builder.finish()
}

class Plugin {
  constructor
  (view) {
    this.decorations = style(view)
  }

  update
  (update) {
    if (update.docChanged
        || update.viewportChanged
        || update.selectionSet) // for current line check
      this.decorations = style(update.view)
  }
}

export
function blankLines
(options) {
  options = options || {}
  return [ options.includeActiveLine == null ? [] : includeActiveLine.of(options.includeActiveLine),
           styleBlankLines ]
}

includeActiveLine = Facet.define({ combine: values => values.length ? values[0] : false })

decoration = Decoration.line({ attributes: { class: 'cm-blank-line' } })

styleBlankLines = ViewPlugin.fromClass(Plugin,
                                       { decorations: v => v.decorations })
