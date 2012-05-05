(function() {
    // Adapted from Simple JavaScript Templating
    // John Resig - http://ejohn.org/ - MIT Licensed
    function tmpl(str, data) {
        var fn = new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
        "with(obj){p.push('" +
        str
            .replace(/[\r\t\n]/g, " ")
            .split("<%").join("\t")
            .replace(/((^|%>)[^\t]*)'/g, "$1\r")
            .replace(/\t=(.*?)%>/g, "',$1,'")
            .split("\t").join("');")
            .split("%>").join("p.push('")
            .split("\r").join("\\'")
            + "');}return p.join('');");

        return data ? fn( data ) : fn;
    };

    function loadComponents() {
        var returnObject = {}

        $.ajax({ url: "components.html", async: false, success: function(resp) {
            var components = $(resp).filter("[id]");
            
            components.each(function() {
                var element = $(this);
                var id = element.attr("id");
                var viewTemplate = element.html();

                returnObject[id] = function(viewValues) {
                    if (viewValues) {
                        return tmpl(viewTemplate, viewValues);
                    } else {
                        return viewTemplate;
                    }
                };
            });

        } });

        $.getScript("components.js");
        return returnObject;
    }

    $(function() {
        var ks = {};
        ks.components = loadComponents();

        window.ks = ks;
    });    
})();
