# Generated by Django 4.1.7 on 2023-03-13 18:41

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Password',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('site', models.CharField(max_length=100)),
                ('username', models.CharField(max_length=64)),
                ('password', models.CharField(max_length=64)),
                ('description', models.CharField(max_length=200)),
            ],
        ),
    ]
