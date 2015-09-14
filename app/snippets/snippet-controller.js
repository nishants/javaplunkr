(function () {
  "use strict"
  var controller = ["SnippetService","Runner", "$scope", "$timeout", function (service, runner, scope, $timeout) {
    var
        editor = {
          snippet: null,
          console : {
            messages: [],
            errors: [],
          },
          run : null
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
        },
        showResult = function(message){
          editor.console.messages.push(message);
        },
        run = function(){
          runner.run(editor.snippet).then(showResult);
        };

    service.getSnippet("hello-world").then(setSnippet);

    editor.run = run;
    scope.editor = editor;
  }];

  chakra.controller("EditorController", controller);
}).call(this);
