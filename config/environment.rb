# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!
Jbuilder.key_format camelize: :lower
Jbuilder.deep_format_keys true

#server(ruby) snake_case ==> client(js) camelCase