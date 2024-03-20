from django.db import models

# Create your models here.

class Stock(models.Model):

    Company_Name = models.TextField(max_length=255)
    Symbol = models.TextField(max_length=50)
    Country = models.TextField(max_length=100)
    Sector = models.TextField(max_length=100)
    Industry = models.TextField(max_length=100)

    class Meta:
        # Specify the name of the database table
        db_table = 'stock_list'
    
    def save(self, *args, **kwargs):
        raise NotImplementedError("Saving instances of this model is not allowed")

    def delete(self, *args, **kwargs):
        raise NotImplementedError("Deleting instances of this model is not allowed")
    
    def __str__(self):
        return self.symbol