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

    // Helpers
    function stringToArray(string) {
        return (typeof string != "undefined") ? JSON.parse(string.replace(/\'/g, '"')) : [];
    }

    function delegateHelper(selector, events) {
        $(document).on(events, selector);
    }

    ////
    function loadComponents() {
        var returnObject = {}

        $.ajax({ url: "components.html", async: false, success: function(resp) {
            var components = $(resp).filter("[id]");
            
            components.each(function() {
                var element = $(this);
                var id = element.attr("id");
                var helper = element.data("helper");
                var viewTemplate = element.html();

                returnObject[id] = function() {
                    var viewVariables = arguments[0];
                    
                    if (viewVariables) {
                        var templateInterpoled = $(tmpl(viewTemplate, viewVariables));
                        templateInterpoled.data(viewVariables);
                    
                        return templateInterpoled;
                    
                    } else {
                        return helper;
                    }
                };
            });

        } });

        $.getScript("components.js");
        return returnObject;
    }

    function attributesAsObject(target, options) {
        target = (typeof target == 'object' && target.length) ? target : $(target);
        target.removeAttr('rel');
        var data = {};
        var attributes = target[0].attributes;
        var attributesString = "";
        var element = $("<div>").append(target.clone()).html();

        for (var i = 0; i < attributes.length; i++) {
            var attrName = attributes[i].name;
            var attrValue = attributes[i].value;

            attributesString += attrName + "=\"" + attrValue + "\" ";

            if (attrValue) {
                attrValue = ( attrValue.match(/^\[.*]/) ) ? stringToArray(attrValue) : attrValue;
                data[attrName] = attrValue;
                data[attrName.replace(/^data-/, "")] = attrValue;
            }
        }

        data['html'] = $.trim(target.html());
        data['element'] = element;
        data['attributes'] = attributesString;
        data['tagname'] = target.prop('tagName').toLowerCase();

        $.extend(data, options);

        return data;
    }

    function applyComponents() {
        var elements = $('body [rel]');
        var components = jUIce;

        elements.each(function() {
            var componentName = $(this).attr('rel');
            var attributes = attributesAsObject(this);
            var componentInterpoled = components[componentName](attributes);
            $(this).replaceWith(componentInterpoled);
        });
    }

    $(function() {
        jUIce = loadComponents();
        
        applyComponents();
    });    
})();
