import $ from "jquery";
import Backbone from "backbone";
import { ENTER_KEY } from "./constants";
import Todos from "./todos";
import TodoRouter from "./router";
import AppView from "./app-view";

(function() {
  function loadApiRootFromInput() {
    let apiRoot = $("#api-root input").val();
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
  let app = {};

  let apiRootUrl = window.location.search.substr(1).trim();

  if (!apiRootUrl) {
    $("body > *").hide();
    $("#api-root").show();
    return;
  }
  if (apiRootUrl.endsWith("/")) {
    apiRootUrl = apiRootUrl.substr(
      0,
      apiRootUrl.length - 1
    );
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
