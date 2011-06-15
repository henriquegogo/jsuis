$.fn.extend({
  serializeGrid: function() {
    $.each($('tbody tr', this), function() {
      console.log($(this));
    });
  }
});
