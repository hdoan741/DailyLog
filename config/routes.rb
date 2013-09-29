DailyLog::Application.routes.draw do
  root to: "timeline#day"

  match "/day", to: "timeline#day", as: :day

  match "/week", to: "timeline#week", as: :week

  match "/month", to: "timeline#month", as: :month

  resources :logs

  resources :tags
end
