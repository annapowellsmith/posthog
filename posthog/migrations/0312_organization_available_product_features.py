# Generated by Django 3.2.18 on 2023-04-26 19:50

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("posthog", "0311_dashboard_template_scope"),
    ]

    operations = [
        migrations.AddField(
            model_name="organization",
            name="available_product_features",
            field=django.contrib.postgres.fields.ArrayField(
                base_field=models.JSONField(), blank=True, null=True, size=None
            ),
        ),
    ]
