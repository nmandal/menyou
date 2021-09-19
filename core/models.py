from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Place(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    image = models.CharField(max_length=255, blank=True, null=True)
    number_of_tables = models.IntegerField(default=1)
    address = models.CharField(max_length=255)
    site = models.CharField(max_length=255)

    def __str__(self):
        return "{}/{}".format(self.owner.username, self.name)

class Category(models.Model):
    place = models.ForeignKey(Place, on_delete=models.CASCADE, related_name="categories")
    name = models.CharField(max_length=255)

    def __str__(self):
        return "{}/{}".format(self.place, self.name)

class MenuItem(models.Model):
    place = models.ForeignKey(Place, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="menu_items", blank=True, null=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.IntegerField(default=0, blank=True, null=True)
    image = models.CharField(max_length=255, blank=True, null=True)
    is_available = models.BooleanField(default=True, blank=True, null=True) 

    def __str__(self):
        return "{}/{}".format(self.category, self.name) 

class Order(models.Model):
    PROCESSING_STATUS = "processing"
    COMPLETED_STATUS = "completed"
    STATUSES = (
        (PROCESSING_STATUS, "Processing"),
        (COMPLETED_STATUS, "Completed"),
    )

    place = models.ForeignKey(Place, on_delete=models.CASCADE)
    table = models.CharField(max_length=3)
    detail = models.TextField()
    payment_intent = models.CharField(max_length=255)
    amount = models.IntegerField()
    status = models.CharField(max_length=20, choices=STATUSES, default=PROCESSING_STATUS)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "{}/{}/${}".format(self.place, self.table, self.amount)
