terraform {
  required_version = ">= 1.6.0, < 2.0.0"

  required_providers {
    postgresql = {
      source  = "cyrilgdn/postgresql"
      version = "1.22.0"
    }
  }
}
