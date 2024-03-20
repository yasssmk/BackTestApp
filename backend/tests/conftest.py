import pytest
from django.conf import settings
from django.db import connection
from django.urls import reverse
from rest_framework.test import APIClient
import environ

env = environ.Env()
environ.Env.read_env()

# @pytest.fixture(scope='session')
def django_db_setup():
    settings.DATABASES['default'] = {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env('DATABASE_NAME'),
        'USER': env('DATABASE_USERNAME'),
        'PASSWORD': env('DATABASE_PASSWORD'),
        'HOST': env('DATABASE_HOSTNAME'),
        'PORT': env('DATABASE_PORT'),
    }
    connection.creation.create_test_db(keepdb=True)

@pytest.fixture
def test_user():
    client = APIClient()
    url = reverse('register')
    user_data = {"email": "test456@gmail.com", "password": "pwd123"}
    res = client.post(url, user_data)
    assert res.status_code == 201
    new_user = res.json()
    new_user['password'] = user_data["password"]
    return new_user