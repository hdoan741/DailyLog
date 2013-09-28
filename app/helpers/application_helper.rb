module ApplicationHelper
  def slot_to_time_str(i)
    return "%d:%02d" % [i/2, (i%2) * 30]
  end

  def time_to_slot(t)
    return t.hour * 2 + (t.min > 0 ? 1 : 0)
  end

  def log_to_html(log)
     return "<span class='glyphicon glyphicon-bookmark' style='color: #{log.main_tag.color if log.main_tag}'></span> " +
        "#{log.start_time.strftime("%H:%M")} - #{log.end_time.strftime("%H:%M")}: #{
           (log.content.empty? && log.main_tag) ? log.main_tag.title : log.content.capitalize }"
  end
end
