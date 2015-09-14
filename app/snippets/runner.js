(function () {
  "use strict"
  var runner = ["$http", "$q", function ($http, $q) {

    var data = function (code) {
          var response = {
            content: {
              mainClass: "HelloWorld",
              javaFiles: [{className: "HelloWorld", javaCode: code}]
            }
          };
          return JSON.stringify(response);
        },
        remote = "https://boiling-scrubland-7787.herokuapp.com",
        compilerAndRun = function (code) {
          var message = function (response) {
            if (response.data.error) {
              return $q.reject(response.data.error)
            }
            return response.data.content.console[0];
          };
          return $http.post(remote + "/runner/main", data(code)).then(message);
        };
    return {
      run: compilerAndRun
    };
  }];

  chakra.service("Runner", runner);
}).call(this);
