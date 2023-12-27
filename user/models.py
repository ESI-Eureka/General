from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Account(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        # Verify if the user already exists
        if self.id is not None:
            # Verify if the password has changed
            original_password = Account.objects.get(id=self.id).password
            if original_password != self.password:
                # Hash the new password
                self.password = make_password(self.password)
        else:
            # If it doesn't exist, hash the password before creating the user
            self.password = make_password(self.password)

        # Call the save method of the parent class 
        super(Account, self).save(*args, **kwargs)
