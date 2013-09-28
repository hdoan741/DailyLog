$(document).ready(function() {
  $('#tagColorSelector').colorPicker();

  $('#tagFormModal').on('hidden.bs.modal', function() {
    $('#save_tag').off('click');
  });

  $('#tagRemoveConfirm').on('hidden.bs.modal', function() {
    $('#remove_tag_confirmed').off('click');
  });


  //------------------
  // Create Tag
  $('#create_tag').click(function() {
    // update title
    $('#tagFormModal').find('.modal-title').html('Create Tag');

    $('#tagIdField').val(0);
    $('#tagTitleInput').val('');
    $('#tagDescTextarea').val('');
    $('#tagColorSelector').colorPicker({ pickerDefault: 'EEEEEE' });

    $('#save_tag').prop('disabled', false);
    $('#save_tag').click(function() {
      $('#save_tag').prop('disabled', true);

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
        $('#tagTableBody').append($('<tr>').html(data.html_str));
        $('#save_tag').off('click');
      });
    });

    $('#tagFormModal').modal('show');
  });

  //------------------
  // Edit tag
  $('#tagTableBody').on('click', '.edit_tag', function(evt) {
    evt.preventDefault();
     // update title
    $('#tagFormModal').find('.modal-title').html('Update Tag');

    // get tag info & set to the field
    var tag_row = $(this).parents('tr');
    var tag_id = $(tag_row).find('.tag-id').val();
    var tag_title = $(tag_row).find('.tag-title').html();
    var tag_desc = $(tag_row).find('.tag-desc').html();
    var tag_color = $(tag_row).find('.tag-color-box').css('backgroundColor');

    $('#tagIdField').val(tag_id);
    $('#tagTitleInput').val(tag_title);
    $('#tagDescTextarea').val(tag_desc);
    $('#tagColorSelector').val(tag_color);
    $('#tagColorSelector').trigger('change');

    // setup the save button
    $('#save_tag').prop('disabled', false);
    $('#save_tag').click(function() {
      $('#save_tag').prop('disabled', true);

      var tag_id = $('#tagIdField').val();
      var title = $('#tagTitleInput').val();
      var desc = $('#tagDescTextarea').val();
      var color = $('#tagColorSelector').val();

      // update / create tags
      $.ajax({
        type: "PUT",
        url: '/tags/' + tag_id,
        data: {
          tag: {
            title: title,
            desc: desc,
            color: color,
          }
        },
        success: function(data) {
          $('#tagFormModal').modal('hide');
          $('#save_tag').prop('disabled', false);

          $(tag_row).find('.tag-title').html(data.tag.title);
          $(tag_row).find('.tag-desc').html(data.tag.desc);
          $(tag_row).find('.tag-color-box').css('backgroundColor', data.tag.color);

          $('#save_tag').off('click');
        }
      });
    });

    $('#tagFormModal').modal('show');
  });

  // ------------------
  // Remove tag
  $('#tagTableBody').on('click', '.remove_tag', function(evt) {
    evt.preventDefault();
    $(this).prop('disabled', true);
    var row = $(this).parents('tr');

    // get the id of the tag
    var tag_id = $(this).attr('data-tag-id');
    console.log(tag_id);

    // show the confirmation dialog
    $('#remove_tag_confirmed').prop('disabled', false);
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
