# Generated by Django 4.2.3 on 2023-07-14 16:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0002_rename_bio_post_dishbio_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='dishCusine',
            new_name='dishCuisine',
        ),
    ]