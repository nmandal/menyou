# Generated by Django 3.2 on 2021-09-19 14:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_auto_20210827_2033'),
    ]

    operations = [
        migrations.AddField(
            model_name='place',
            name='address',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='place',
            name='site',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
    ]
