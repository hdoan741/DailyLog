$(document).ready(function() {
  $('#tagColorSelector').colorPicker();

  $('#save_tag').click(function() {
    $('#save_tag').prop('disabled', true);

    var tag_id = $('#tagIdField').val();
    var title = $('#tagTitleInput').val();
    var desc = $('#tagDescTextarea').val();
    var color = $('#tagColorSelector').val();

    // update / create tags
    $.post('/tags', {
      tag: {
        title: title,
        desc: desc,
        color: color,
      },
    }, function(data) {
      $('#tagFormModal').modal('hide');
      $('#save_tag').prop('disabled', false);

      console.log(data);
    });
  });
});
