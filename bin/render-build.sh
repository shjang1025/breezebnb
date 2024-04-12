
#!/usr/bin/env bash
set -o errexit

bundle install
rails db:migrate
DISABLE_DATABASE_ENVIRONMENT_CHECK=1 rails db:seed:replant
