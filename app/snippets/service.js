(function () {
  "use strict"
  var snippetService = ["$http", function ($http) {
    var urlFor = function (snippetName) {
          return "snippets/" + snippetName + ".java";
        },
        getSnippetByName =  function (snippetName) {
            return $http.get(urlFor(snippetName)).then(function(response){
              return response.data;
            });
          };

    return {
      getSnippet: getSnippetByName
    };
  }];

  chakra.service("SnippetService", snippetService);
}).call(this);
