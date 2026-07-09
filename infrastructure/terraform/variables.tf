variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name (used for resource naming)"
  type        = string
  default     = "magna-web"
}

variable "blueprint_id" {
  description = "Lightsail blueprint (OS/image)"
  type        = string
  default     = "ubuntu_24_04"
}

variable "bundle_id" {
  description = "Lightsail bundle (plan)"
  type        = string
  default     = "micro_2_0"
}

variable "ssh_key_name" {
  description = "Name of the SSH key pair in Lightsail"
  type        = string
  default     = "magna-ssh-key"
}
