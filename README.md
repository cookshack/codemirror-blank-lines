# @cookshack/codemirror-blank-lines

CodeMirror 6 extension for styling blank lines.

Adds CSS class `cm-blank-line` to zero length lines.

## Options

| Name               | Default |                                              |
|--------------------|---------|----------------------------------------------|
| includeActiveLine  |   false | Whether to style the active line.            |

## Use

```javascript
let text = []
for (let i = 1; i <= 100; i++)
  text.push((i % 5 == 0) ? "line " + i : "")

window.view = new EditorView({
  extensions: [ blankLines({ includeActiveLine: true }) ],
  doc: text.join("\n"),
  parent: document.querySelector("#editor")
})
```

Then style with CSS.
```css
div.cm-line.cm-blank-line {
  background: lightyellow;
  /* works, but will mess up alignment of gutter line numbers */
  line-height: 0.9;
}
```

## Build from source

```console
$ npm i # only needed first time
$ npm run prepare
```
