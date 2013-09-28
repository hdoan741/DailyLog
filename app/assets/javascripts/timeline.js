$(document).ready(function() {
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
});
