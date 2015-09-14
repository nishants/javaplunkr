(function () {
  "use strict"
  var controller = ["SnippetService","Runner", "$scope", "$timeout", function (service, runner, scope, $timeout) {
    var
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
        editor = {
          snippet: null,
          console : {
            messages: [],
            errors: [],
          },
          window: CodeMirror.fromTextArea(document.getElementById("code-editor"), editorOptions),
          loading: false,

          //methods
          run : undefined,
        },
        showLoader = function(show){
          editor.loader = show;
        },
        setSnippet = function (code) {
          $timeout(function(){
            editor.window.getDoc().setValue(code);
          });
        },
        getSnippet = function () {
          return editor.window.getDoc().getValue();
        },

        showResult = function(message){
          editor.console.messages.push(message);
          showLoader(false);
        },
        showError = function(message){
          editor.console.errors.push(message + getSnippet());
          showLoader(false);
        },
        run = function(){
          showLoader(true);
          editor.console.errors = [];
          editor.console.messages = [];

          runner.run(getSnippet()).then(showResult, showError);
        };

    service.getSnippet("hello-world").then(setSnippet);

    editor.run = run;
    scope.editor = editor;
  }];

  chakra.controller("EditorController", controller);
}).call(this);
