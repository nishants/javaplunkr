$(document).ready(function () {
    var editor = CodeMirror.fromTextArea(document.getElementById("editor1"), {
        mode: "text/x-java",

        lineNumbers: true,
        tabSize: 2,
        lineWrapping: false,
        matchBrackets: true,

        indentWithTabs: true,
        smartIndent: true,

        autofocus: true,
        viewportMargin: Infinity
    });
    window.editor = editor;

    var remote = "https://boiling-scrubland-7787.herokuapp.com";

    var showLoader = function(visible){
        var loader = $("#loader");
        visible ? loader.show() : loader.hide();
    };

    var showSuccess = function (response) {
        $("#console-output").html(response.content.console.join("<br>"));
    }

    var showError = function (response) {
        $("#error-output").html(response.error +"<br>" + editor.getValue());
    };

    var resetConsole = function () {
        $("#console-output").html("");
        $("#error-output").html("")
    };

    var showConsole = function (response) {
        response.error ? showError(response) : showSuccess(response);
        showLoader(false);
    };

    var compileAndRun = function (code, success, failure) {
        var data =function(code){
            var response = {
                content: {
                    mainClass: "HelloWorld",
                    javaFiles: [{className: "HelloWorld", javaCode: code}]
                }
            };
            return JSON.stringify(response);
        };

        $.ajax({
            type: "POST",
            contentType: "application/json;",
            url: remote + "/runner/main",
            data: data(code),
            success: success,
            error: failure
        });
    };


    $("#run-button").click(function () {
        showLoader(true);
        resetConsole();
        compileAndRun(editor.getValue().replace("\n", ""), showConsole, showError)
    });

    showLoader(false);
});
