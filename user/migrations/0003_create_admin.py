from django.db import migrations
from django.contrib.auth.hashers import make_password

def create_admin(apps, schema_editor):
    Role = apps.get_model('user', 'Role')
    Account = apps.get_model('user', 'Account')

    role = Role.objects.get(name='admin')  # Make sure the role 'admin' exists

    # Create an admin user with a hashed password
    Account.objects.create(email='admin@gmail.com', password=make_password('admin'), role=role)


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
        ('user', '0002_create_roles'),
    ]

    operations = [
        migrations.RunPython(create_admin),
    ]
