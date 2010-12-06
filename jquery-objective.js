jQuery.fn.extend({
	objective: function() {
    var result = [];
    this.children('[name]').each(function() {
      var attrib = {};
      attrib.name = $(this).attr('name');
      attrib.value = $(this).text() ? $(this).text() : $(this).val();
      result.push(attrib);
    });
    return result;
  }
});

//  $(this).children('[name]') ? $(this).children('[name]').each(function() {
//    console.log($(this).html() ? $(this).html() : $(this).val());
//    $(this).objective();
//  }) : console.log($(this).html() ? $(this).html() : $(this).val());

