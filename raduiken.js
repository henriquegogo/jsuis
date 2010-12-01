$(document).ready(function() {
  /* Windows */
  $.each($('.window'), function() {
    if ($(this).attr('title')) {
      $(this).prepend('<h1 class="window-title">'+$(this).attr("title")+'</h1>');
    }
    if ($(this).attr('close-button') == 'true') {
      $('h1.window-title', this).append("<a href='' class='button'>x</a>");
    }
    if ($(this).attr('drag') == 'true') {
      $(this).draggable();
    }
  });
  /* Tabs */
  $.each($('.tabs'), function() {
    $(this).prepend("<ul class='tabbar'></ul>");
    $.each($('.tab', this), function() {
      $('ul.tabbar', $(this).parent()).append("<li><a href='#"+$(this).attr('id')+"'>"+$(this).attr('title')+"</a></li>");
      $(this).hide();
    });
    $('.tabbar li:first', this).addClass('active');
    $('.tab:first', this).show();

    $('.tabbar li a', this).click(function() {
      $('li',$(this).parent().parent()).removeClass('active');
      $($(this).parent()).addClass('active');
      $('div.tab',$(this).parent().parent().parent()).hide();
      $($(this).attr('href')).show();
      console.log($(this));
    });
  });
  /* Forms */
  $.each($('input[type="text"]'), function() {
    if ($(this).attr('title')) {
      $(this).before("<div class='field'></div>");
      $(this).before("<label for='"+$(this).attr('id')+"'>"+$(this).attr('title')+"</label><br>");
      $(this).after("<br><br>");
    }
  });
  $.each($('input[type="password"]'), function() {
    if ($(this).attr('title')) {
      $(this).before("<label for='"+$(this).attr('id')+"'>"+$(this).attr('title')+"</label><br>");
      $(this).after("<br><br>");
    }
  });
  $.each($('input[type="checkbox"]'), function() {
    if ($(this).attr('title')) {
      $(this).after("<label for='"+$(this).attr('id')+"'>"+$(this).attr('title')+"</label><br><br>");
    }
  });
  $.each($('input'), function() {
    if (!$(this).attr('name') && $(this).attr('id')) {
      $(this).attr('name', $(this).attr('id'));
    }
  });
});

$.fn.extend({
  fillGrid: function(json) {
    var table = $('table',this);
    var cols = '', bodylines = '', headlines = '';
    $.each(json.head, function() {
      headlines += '<th>'+this+'</th>';
    });
    $.each(json.body, function() {
      $.each(this, function() {
        cols += '<td>'+this+'</td>';
      });
      bodylines += '<tr>'+cols+'</tr>';
      cols = '';
    });
    table.append('<thead></thead><tbody></tbody>');
    $('thead', table).append('<tr>'+headlines+'</tr>');
    $('tbody', table).append(bodylines);
  }
});
