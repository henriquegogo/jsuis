// Template function
// Forked from https://gist.github.com/860240
var template = function(str, data) {
  var value = "var out = ''; out+=" + "'" +

  str.replace(/[\r\t\n]/g, " ")
    .replace(/'(?=[^%]*%>)/g,"\t")
    .split("'").join("\\'")
    .split("\t").join("'")
    .replace(/<%=(.+?)%>/g, "'; out += $1; out += '")
    .split("<%").join("';")
    .split("%>").join("out+='")
    + "'; return out;";

  return new Function("data", value);
}

var load = function(path, callback) {
  var ajax = new XMLHttpRequest;
  ajax.onreadystatechange = function() {
    if (ajax.readyState == 4) callback(ajax.responseText);
  };
  ajax.open("GET", path);
  ajax.send();
}
