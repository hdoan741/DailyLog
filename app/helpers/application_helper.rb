module ApplicationHelper
  def slot_to_time_str(i)
    return "%d:%02d" % [i/2, (i%2) * 30]
  end

  def time_to_slot(t)
    return t.hour * 2 + (t.min > 0 ? 1 : 0)
  end
end
