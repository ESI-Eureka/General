from django.db import migrations

def create_roles(apps, schema_editor):
    Role = apps.get_model('user', 'Role')
    Role.objects.create(name='admin')
    Role.objects.create(name='moderator')
    Role.objects.create(name='user')

class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'), 
    ]

    operations = [
        migrations.RunPython(create_roles),
    ]
