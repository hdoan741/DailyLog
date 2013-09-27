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
    $.post('/logs', {
      log: {
        content: content,
        extra: extra,
        date: current_date,
        start_time: start_time,
        end_time: end_time
      }
    }, function(data) {
      console.log(data);
      $('#save_log').prop('disabled', false);
      $('#logFormModal').modal('hide');
    });
  });

  $('.time-selectable').selectable({
    filter: '.time-segment',
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
});
