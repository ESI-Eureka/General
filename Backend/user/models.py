from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Account(models.Model):
    """
    Represents a user account.

    Attributes:
        email (str): The email address of the account.
        password (str): The password of the account.
        role (Role): The role associated with the account.
    """

    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        """
        Saves the account.

        If the account already exists, it checks if the password has changed and hashes the new password.
        If the account is being created, it hashes the password before saving.
        """
        if self.id is not None:
            original_password = Account.objects.get(id=self.id).password
            if original_password != self.password:
                self.password = make_password(self.password)
        else:
            self.password = make_password(self.password)

        super(Account, self).save(*args, **kwargs)
