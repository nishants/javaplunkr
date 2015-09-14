(function () {
  "use strict"
  var controller = ["SnippetService", "$scope", "$timeout", function (service, scope, $timeout) {
    var
        editor = {
          snippet: null
        },
        editorOptions = {
          mode: "text/x-java",

          tabSize: 2,
          lineNumbers: true,
          lineWrapping: false,
          matchBrackets: true,
          indentWithTabs: true,
          smartIndent: true,
          autofocus: true,
          viewportMargin: Infinity, // renders whole document at once (else only part in view is rendered, and text searches wont work)
         },
        showError = function (err) {
          alert(err);
        },
        editorElement = function(){
          return document.getElementById("code-editor")
        },
        setCodeMirror = function () {
          CodeMirror.fromTextArea(editorElement(), editorOptions);
        },
        setSnippet = function (code) {
          editor.snippet = code;
          $timeout(setCodeMirror);
        };

    service.getSnippet("hello-world").then(setSnippet);
    scope.editor = editor;
  }];

  chakra.controller("EditorController", controller);
}).call(this);
