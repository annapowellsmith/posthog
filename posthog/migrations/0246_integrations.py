# Generated by Django 3.2.13 on 2022-06-24 07:06

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("posthog", "0245_silence_deprecated_tags_warnings"),
    ]

    operations = [
        migrations.AlterField(
            model_name="subscription",
            name="target_type",
            field=models.CharField(
                choices=[
                    ("email", "Email"),
                    ("slack", "Slack"),
                    ("webhook", "Webhook"),
                ],
                max_length=10,
            ),
        ),
        migrations.CreateModel(
            name="Integration",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("kind", models.CharField(choices=[("slack", "Slack")], max_length=10)),
                ("config", models.JSONField(default=dict)),
                ("sensitive_config", models.JSONField(default=dict)),
                ("errors", models.TextField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "created_by",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "team",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="posthog.team"),
                ),
            ],
        ),
    ]
