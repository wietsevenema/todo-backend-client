import $ from "jquery";
import Backbone from "backbone";
import { ENTER_KEY } from "./const";
import Todos from "./collections/todos";
import TodoRouter from "./routers/router";
import AppView from "./views/app-view";

(function() {
  function loadApiRootFromInput() {
    var apiRoot = $("#api-root input").val();
    window.location.search = apiRoot;
  }

  $("#api-root button").on("click", loadApiRootFromInput);
  $("#api-root input").on("keyup", function() {
    if (event.keyCode == ENTER_KEY) {
      loadApiRootFromInput();
    }
  });
})();

(function() {
  var app = {};

  var apiRootUrl = window.location.search.substr(1);
  if (!apiRootUrl) {
    $("body > *").hide();
    $("#api-root").show();
    return;
  }
  $("#api-root").hide();

  $("#target-info .target-url").text(apiRootUrl);

  // Create our global collection of **Todos**.
  app.todos = new Todos();
  app.todos.url = apiRootUrl;

  app.TodoRouter = new TodoRouter({ app });
  Backbone.history.start();

  // kick things off by creating the `App`
  new AppView({ app });
})();
