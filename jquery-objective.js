jQuery.fn.extend({
  objective: function() {
    var result = {};
    jQuery('> * > [name]', this).each(function() {
      if (true) {
        var key = $(this).attr('name');
        result[key] = (jQuery('[name]', this).size() > 0 && !jQuery.isArray($(this).val())) ? jQuery(this).objective() :
                      jQuery(this).val() ? jQuery(this).val() : jQuery(this).text();
      }
    });
    return result;
  }
});


//!($(this).parents('[name]').size() > 0) || (jQuery(jQuery(this).parents('[name]')[0]).attr('name') == parent)
