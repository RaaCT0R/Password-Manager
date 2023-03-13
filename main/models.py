from django.db import models


class Password(models.Model):
    site = models.CharField(max_length=100)
    username = models.CharField(max_length=64)
    password = models.CharField(max_length=64)
    description = models.CharField(max_length=200)
