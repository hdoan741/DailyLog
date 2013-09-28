$(document).ready(function() {
  $('#save_log').click(function() {
    // get title, content and other information
    $('#save_log').prop('disabled', true);
    var content = $('#logContentInput').val();
    var extra = $('#logExtraTextarea').val();
    var log_id = $('#logIdHidden').val();
    var current_date = $('#logDateHidden').val();
    var start_time = $('#logStartTime').html();
    var end_time = $('#logEndTime').html();
    var selected_tag = $('#logTagSelect option:selected');
    var tag_id = $(selected_tag).val();
    var tag_color = $(selected_tag).data('tag-color');
    $.post('/logs', {
      log: {
        content: content,
        extra: extra,
        date: current_date,
        start_time: start_time,
        end_time: end_time,
        main_tag_id: tag_id
      }
    }, function(data) {
      console.log(data);
      $('#save_log').prop('disabled', false);
      $('#logFormModal').modal('hide');

      // alter the selected slots to reflect the new selection
      var selected_slots = $('.time-selectable').find('.ui-selected');
      selected_slots.removeClass('time-avail-segment ui-selectee ui-selected')
        .addClass('time-disabled-segment')
        .css('background', tag_color);

      // add the new log to the bottom of the list, may add some animation
      var log_html = data.html_str;
      $('#activity-list').append($('<li>').html(log_html));
    });
  });

  $('.time-selectable').selectable({
    filter: '.time-avail-segment',
    stop: function(evt, ui) {
      var selected_slots = $('.time-selectable').find('.ui-selected');
      if (selected_slots.size() > 0) {
        var start_slot = $(selected_slots.first()).children('.time-slot-start').val();
        var end_slot = $(selected_slots.last()).children('.time-slot-end').val();
        console.log(start_slot, end_slot);

        // update the log form
        $('#logStartTime').html(start_slot);
        $('#logEndTime').html(end_slot);

        // open it
        $('#logFormModal').modal('show');
      }
    }
  });

  var formatTagSelectOption = function(state) {
    var tag_color = $(state.element).data('tag-color');
    return "<div class='tag-color-box-small' style='background-color: " + tag_color + "'></div><span>" + state.text + "</span>";
  }

  $('#logTagSelect').select2({
    width: '100%',
    formatResult: formatTagSelectOption,
    formatSelection: formatTagSelectOption,
    escapeMarkup: function(m) { return m; }
  });
});
