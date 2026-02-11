output "database_name" {
  value       = var.database
  description = "Database targeted by provisioning."
}

output "extensions_enabled" {
  value = {
    pgcrypto  = true
    uuid_ossp = var.enable_uuid_ossp
  }
  description = "Extensions enabled by Terraform."
}
