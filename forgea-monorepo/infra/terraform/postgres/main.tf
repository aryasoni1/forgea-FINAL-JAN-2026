provider "postgresql" {
  host     = var.host
  port     = var.port
  database = var.database
  username = var.username
  password = var.password
  sslmode  = var.sslmode
}

resource "postgresql_database" "app" {
  count = var.create_database ? 1 : 0

  name = var.database
}

resource "postgresql_parameter" "timezone" {
  name  = "TimeZone"
  value = "UTC"
}

resource "postgresql_parameter" "log_timezone" {
  name  = "log_timezone"
  value = "UTC"
}

resource "postgresql_parameter" "client_encoding" {
  name  = "client_encoding"
  value = "UTF8"
}

resource "postgresql_parameter" "ssl" {
  name  = "ssl"
  value = "on"
}

resource "postgresql_extension" "pgcrypto" {
  name     = "pgcrypto"
  database = var.database
}

resource "postgresql_extension" "uuid_ossp" {
  count    = var.enable_uuid_ossp ? 1 : 0
  name     = "uuid-ossp"
  database = var.database
}
