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
      $('#tagTableBody').append(data.html_str);
    });
  });

  $('.remove-tag').click(function() {
    $(this).prop('disabled', true);
    var row = $(this).parents('tr');

    // get the id of the tag
    var tag_id = $(this).attr('data-tag-id');
    console.log(tag_id);

    // show the confirmation dialog
    $('#remove_tag_confirmed').click(function() {
      $('#remove_tag_confirmed').prop('disabled', true);

      $.ajax({
        type: "DELETE",
        url: '/tags/' + tag_id,
        success: function() {
          $(row).remove();
          $('#tagRemoveConfirm').modal('hide');
          $('#remove_tag_confirmed').off('click');
          $('#remove_tag_confirmed').prop('disabled', false);
        }
      });
    });

    $('#remove_tag_confirmed').prop('disabled', false);
    $('#tagRemoveConfirm').modal('show');
  });
});
