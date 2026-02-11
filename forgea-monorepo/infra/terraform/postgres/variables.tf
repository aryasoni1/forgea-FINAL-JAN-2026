variable "host" {
  type        = string
  description = "PostgreSQL server hostname or IP."
}

variable "port" {
  type        = number
  description = "PostgreSQL server port."
  default     = 5432
}

variable "database" {
  type        = string
  description = "Target database name for extensions."
}

variable "username" {
  type        = string
  description = "Administrative username for provisioning."
}

variable "password" {
  type        = string
  description = "Administrative password for provisioning."
  sensitive   = true
}

variable "sslmode" {
  type        = string
  description = "SSL mode for the provisioning connection."
  default     = "require"
}

variable "create_database" {
  type        = bool
  description = "Whether to create the target database."
  default     = true
}

variable "enable_uuid_ossp" {
  type        = bool
  description = "Enable uuid-ossp for legacy UUID functions when required."
  default     = false
}
