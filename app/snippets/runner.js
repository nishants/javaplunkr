(function () {
  "use strict"
  var runner = ["$http", function ($http) {

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
          return $http.post(remote + "/runner/main", data(code)).then(function(response){
            return response.data.content.console[0];
          });
        };
    return {
      run : compilerAndRun
    };
  }];

  chakra.service("Runner", runner);
}).call(this);
