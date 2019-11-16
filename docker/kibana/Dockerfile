ARG ELK_VERSION_TAG

FROM docker.elastic.co/kibana/kibana:${ELK_VERSION_TAG}

# Add your kibana plugins setup here
# Example: RUN kibana-plugin install <name|url>

# _bulk_get
#curl -X POST "http://localhost:5601/api/saved_objects/_bulk_get" -H 'kbn-xsrf: true' -H 'Content-Type: application/json' -d'
#[
#  {
#    "type": "index-pattern",
#    "id": "my-pattern"
#  },
#  {
#    "type": "dashboard",
#    "id": "my-dashboard"
#  }
#]
#'

#_bulk_create
#curl -X POST "http://localhost:5601/api/saved_objects/_bulk_create" -H 'kbn-xsrf: true' -H 'Content-Type: application/json' -d'
#[
#  {
#    "type": "index-pattern",
#    "id": "my-pattern",
#    "attributes": {
#      "title": "my-pattern-*"
#    }
#  },
#  {
#    "type": "dashboard",
#    "id": "my-dashboard",
#    "attributes": {
#      "title": "Look at my dashboard"
#    }
#  }
#]
#'
