$(document).ready(function() {
  $('p.log_extra:empty').hide();

  $('#logFormModal').on('hidden.bs.modal', function() {
    $('#save_tag').off('click');
    $('.edit_log').prop('disabled', false);
  });

  var getFormData = function() {
    var selected_tag = $('#logTagSelect option:selected');
    return {
      content: $('#logContentInput').val(),
      extra: $('#logExtraTextarea').val(),
      main_tag_id: $(selected_tag).val(),
      date: $('#logDateHidden').val(),
      start_time: $('#logStartTime').html(),
      end_time: $('#logEndTime').html(),
    }
  }

  var setFormData = function(data) {
    $('#logContentInput').val(data.content || '');
    $('#LogExtraTextarea').val(data.extra || '');
    $('#logIdHidden').val(data.log_id || 0);
    $('#logStartTime').html(data.start_time || '');
    $('#logEndTime').html(data.end_time || '');
    $('#logTagSelect').select2('val', data.main_tag_id || '0');
  }

  // ---------------------
  // Create Log
  var saveLog = function() {
    // get title, content and other information
    $('#save_log').prop('disabled', true);
    var data = getFormData();
    var selected_tag = $('#logTagSelect option:selected');
    var tag_color = $(selected_tag).data('tag-color');
    $.post('/logs', {
      log: data
    }, function(data) {
      console.log(data);
      $('#save_log').off('click');
      $('#save_log').prop('disabled', false);

      // alter the selected slots to reflect the new selection
      var selected_slots = $('.time-selectable').find('.ui-selected');
      selected_slots.removeClass('time-avail-segment ui-selectee ui-selected')
        .addClass('time-disabled-segment')
        .css('background', tag_color);

      // add the new log to the bottom of the list, may add some animation
      var log_html = data.html_str;
      $('#activity-list').append($('<tr class="log-row">').html(log_html));
      $('p.log_extra:empty').hide();

      $('#logFormModal').modal('hide');
    });
  };

  // Tag Select configuration

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

  // ----------------------
  // Edit Log
  $('#activity-list').on('click', '.edit_log', function(evt) {
    evt.preventDefault();
    var edit_btn = $(this);
    $(edit_btn).prop('disabled', true);
    var row = $(edit_btn).parents('tr');

    // get current values
    var data = {
      log_id: $(row).find('.log_id').val(),
      content: $(row).find('.log_content').html(),
      extra: $(row).find('.log_extra').html(),
      main_tag_id: $(row).find('.log_main_tag_id').val(),
      start_time: $(row).find('.log_start_time').html(),
      end_time: $(row).find('.log_end_time').html(),
    }

    // setup the form
    setFormData(data);

    $("#save_log").click(function() {
      $('#save_log').prop('disabled', true);
      var data = getFormData();
      var log_id = $('#logIdHidden').val();
      var selected_tag = $('#logTagSelect option:selected');
      var tag_color = $(selected_tag).data('tag-color');
      $.ajax({
        type: "PUT",
        url: "logs/" + log_id,
        data: { log: data },
        success: function(data) {
          console.log(data);
          $('#save_log').off('click');
          $('#save_log').prop('disabled', false);
          $(edit_btn).prop('disabled', false);

          // update row content
          $(row).find('.log_content').html(data.log.content);
          $(row).find('.log_extra').html(data.log.extra);
          $(row).find('.log_main_tag_id').val(data.log.main_tag_id);
          // update the color of the bookmark
          $(row).find('.log_tag_icon').css('color', tag_color);
          // update the timeline segments
          var all_slots = $('.time-selectable').find('.time-segment');
          all_slots.each(function(index, slot ) {
            if (index >= data.start_slot && index < data.end_slot) {
              $(slot).css('background', tag_color);
            }
          });

          // hide the form
          $('#logFormModal').modal('hide');
        }
      });
    });
    $('#logFormModal').modal('show');
  });

  // -----------------------
  // Delete Log
  $('#activity-list').on('click', '.remove_log', function(evt) {
    evt.preventDefault();
    $(this).prop('disabled', true);
    var log_id = $(this).data('log-id');
    var row = $(this).parents('tr');
    $.ajax({
      type: "DELETE",
      url: "logs/" + log_id,
      success: function(data) {
        // now remove the row
        $(row).remove();
        // remove the blocks from the timeline
        var all_slots = $('.time-selectable').find('.time-segment');
        all_slots.each(function(index, slot ) {
          if (index >= data.start_slot && index < data.end_slot) {
            $(slot).removeClass('time-disabled-segment')
              .addClass('time-avail-segment')
              .css('background', '');
          }
        });
      }
    });
  });

  // -------------------------
  // Setup timeline rows
  $('.time-selectable').selectable({
    filter: '.time-avail-segment',
    stop: function(evt, ui) {
      var selected_slots = $('.time-selectable').find('.ui-selected');
      if (selected_slots.size() > 0) {
        var start_slot = $(selected_slots.first()).children('.time-slot-start').val();
        var end_slot = $(selected_slots.last()).children('.time-slot-end').val();
        console.log(start_slot, end_slot);

        // update the log form
        setFormData({
          start_time: start_slot,
          end_time: end_slot
        });

        // enable the save_log button
        $('#save_log').click(saveLog);

        // open it
        $('#logFormModal').modal('show');
      }
    }
  });

});
