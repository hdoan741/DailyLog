$(document).ready(function() {
  $('#save_log').click(function() {
    // get title, content and other information
    $('#save_log').prop('disabled', true);
    var content = $('#logContentInput').val();
    var extra = $('#logExtraTextarea').val();
    var log_id = $('#logIdHidden').val();
    var current_date = $('#logDateHidden').val();
    $.post('/logs', {
      log: {
        content: content,
        extra: extra,
        date: current_date
      }
    }, function(data) {
      console.log(data);
      $('#save_log').prop('disabled', false);
      $('#logFormModal').modal('hide');
    });
  });
});
