# @cookshack/codemirror-zebra

CodeMirror 6 extension for styling blank lines.

## Use

```javascript
let text = []
for (let i = 1; i <= 100; i++) text.push("line " + i)

window.view = new EditorView({
  extensions: [blankLines()],
  doc: text.join("\n"),
  parent: document.querySelector("#editor")
})
```

## Build from source

```
$ npm i # only needed first time
$ npm run prepare
```
