variable "region" {
  type        = string
  description = "AWS Region"
}

variable "bucket_name" {
  type        = string
  description = "Bucket Name for Yummy App"
}

provider "aws" {
  region = var.region
}

resource "aws_s3_bucket" "frontend_hosting" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_public_access_block" "public_bucket" {
  bucket = aws_s3_bucket.frontend_hosting.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

data "aws_iam_policy_document" "allow_public_read_access" {
  statement {
    principals {
      identifiers = ["*"]
      type        = "*"
    }

    actions = [
      "s3:GetObject"
    ]

    resources = [
      "${aws_s3_bucket.frontend_hosting.arn}/*",
    ]
  }
}

resource "aws_s3_bucket_policy" "allow_public_read_access" {
  bucket = aws_s3_bucket.frontend_hosting.id
  policy = data.aws_iam_policy_document.allow_public_read_access.json
}


resource "aws_s3_bucket_website_configuration" "example" {
  bucket = aws_s3_bucket.frontend_hosting.id

  index_document {
    suffix = "index.html"
  }
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name              = aws_s3_bucket.frontend_hosting.bucket_regional_domain_name
    origin_id                = aws_s3_bucket.frontend_hosting.id
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Cloud Front Distribution for Yummy Application"
  default_root_object = "index.html"


  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.frontend_hosting.id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }


  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["AU"]
    }
  }

  tags = {
    Environment = "production"
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

#output "s3_bucket_id" {
#  value = aws_s3_bucket.frontend_hosting.website_endpoint
#}

