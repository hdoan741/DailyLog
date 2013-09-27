DailyLog::Application.routes.draw do
  root to: "timeline#day"

  resources :logs

  resources :tags
end
