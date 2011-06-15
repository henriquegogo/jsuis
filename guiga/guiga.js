// $.fn.extend({
//   serializeGrid: function() {
//     $.each($('tbody tr', this), function() {
//       console.log($(this));
//     });
//   }
// });

// Forked from https://gist.github.com/860240
function tmpl(str, data) {
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
