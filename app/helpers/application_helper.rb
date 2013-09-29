module ApplicationHelper
  def slot_to_time_str(i)
    return "%d:%02d" % [i/2, (i%2) * 30]
  end

  def slot_count(t)
    count = t / (30 * 60)  # 30 min * 60 sec
    count = count > 0 ? count : 48 + count
    return count
  end

  def time_to_slot(t)
    return t.hour * 2 + (t.min > 0 ? 1 : 0)
  end
end
