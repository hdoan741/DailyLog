$(document).ready(function() {
  $('p.log_extra:empty').hide();
  // ---------------------
  // Create Log
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
      $('#activity-list').append($('<tr class="log-row">').html(log_html));
      $('p.log_extra:empty').hide();
    });
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

  // -----------------------
  // Delete Log
  $('#activity-list').on('click', '.remove_log', function(evt) {
    evt.preventDefault();
    $(this).prop('disabled', true);
    var log_id= $(this).data('log-id');
    var row = $(this).parents('tr');
    $.ajax({
      type: "DELETE",
      url: "logs/" + log_id,
      success: function(data) {
        // now remove the row
        $(row).remove();
        // remove the blocks from the timeline
      }
    });
  });
});
