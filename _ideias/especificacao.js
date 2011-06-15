loadScript('routes.js');
loadScript('template.js');

route("#/home", function() {
  var user = {}
  user.name = "Henrique";
  user.age = 26;

  $("#content").render('home.template');
});
