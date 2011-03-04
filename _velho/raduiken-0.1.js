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
      if ($(this).attr('load')) { load_attrib = ' load="'+$(this).attr('load')+'"'; }
      else { load_attrib = ''; }
      $('ul.tabbar', $(this).parent()).append("<li><a href='#"+$(this).attr('id')+"'"+load_attrib+">"+$(this).attr('title')+"</a></li>");
      $(this).hide();
    });
    $('.tabbar li:first', this).addClass('active');
    $('.tab:first', this).show();

    $('.tabbar li a', this).click(function() {
      $('li',$(this).parent().parent()).removeClass('active');
      $($(this).parent()).addClass('active');
      $('div.tab',$(this).parent().parent().parent()).hide();
      $($(this).attr('href')).show();
      $($(this).attr('href')).load($(this).attr('load'));
      return false;
    });
  });
  /* Forms */
  $.each($(':input'), function() {
    if (!$(this).attr('name') && $(this).attr('id')) {
      $(this).attr('name', $(this).attr('id'));
    } else if ($(this).attr('name') && !$(this).attr('id')) {
      $(this).attr('id', 'field_' + $(this).attr('name'));
    } else if (!$(this).attr('name') && $(this).attr('title')) {
      $(this).attr('name', urlFriendly($(this).attr('title')));
      $(this).attr('id', 'field_' + urlFriendly($(this).attr('title')));
    }
    $(this).wrap("<div class='field' />");
    if ($(this).attr('type') == 'checkbox' || $(this).attr('type') == 'radio') {
      $(this).before("<br>");
      $(this).after("<label for='"+$(this).attr('id')+"'>"+$(this).attr('title')+"</label>");
    } else if ($(this).attr('type') == 'submit' || $(this).attr('type') == 'button') {
    } else {
      $(this).before("<label for='"+$(this).attr('id')+"'>"+$(this).attr('title')+"</label><br>");
    }
  });
});

$.fn.extend({
  fillGrid: function(json) {
    var table = $('table',this);
    var cols = '', bodylines = '', headlines = '';
    var col_ids = [];
    $.each(json.head, function(key, value) {
      col_ids.push(key);
      headlines += '<th col-id="'+key+'">'+value+'</th>';
    });
    $.each(json.body, function() {
      var line_id = this.id;
      $.each(this.cols, function(index) {
        cols += '<td col-id="'+col_ids[index]+'" line-id="'+line_id+'">'+this+'</td>';
      });
      bodylines += '<tr line-id="'+line_id+'">'+cols+'</tr>';
      cols = '';
    });
    table.append('<thead></thead><tbody></tbody>');
    $('thead', table).append('<tr>'+headlines+'</tr>');
    $('tbody', table).append(bodylines);
  },
  serializeGrid: function() {
    $.each($('tbody tr', this), function() {
      console.log($(this));
    });
  }
});

urlFriendly = function(s){ 
  var r=s.toLowerCase(); 
  r = r.replace(new RegExp("[àáâãäå]", 'g'),"a"); 
  r = r.replace(new RegExp("æ", 'g'),"ae"); 
  r = r.replace(new RegExp("ç", 'g'),"c"); 
  r = r.replace(new RegExp("[èéêë]", 'g'),"e"); 
  r = r.replace(new RegExp("[ìíîï]", 'g'),"i"); 
  r = r.replace(new RegExp("ñ", 'g'),"n");                             
  r = r.replace(new RegExp("[òóôõö]", 'g'),"o"); 
  r = r.replace(new RegExp("œ", 'g'),"oe"); 
  r = r.replace(new RegExp("[ùúûü]", 'g'),"u"); 
  r = r.replace(new RegExp("[ýÿ]", 'g'),"y"); 
  r = r.replace(new RegExp("[?!@#$%&*:;]", 'g'),""); 
  r = r.replace(new RegExp("\\W", 'g'),"_"); 
  return r; 
};

function alert(message) {
  document.write('message');
}
