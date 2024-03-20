from django.test import TestCase
import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from myapp.models import CustomUser
from django.conf import settings
import jwt


@pytest.mark.django_db(transaction=True)
def test_register_user():
    client = APIClient()
    url = reverse('register')
    data = {'email': 'test2@example.com', 'password': 'testpassword'}

    # Send a POST request to the registration endpoint
    response = client.post(url, data)
    print(CustomUser.objects.all())

    assert response.status_code == 201

    response_existing_user = client.post(url, data)

    assert response_existing_user.status_code == 400

    assert CustomUser.objects.filter(email='test2@example.com').exists()


@pytest.mark.django_db(transaction=True)
@pytest.mark.parametrize("email, password", [
    ("testexample.com", "testpassword"),
    ("test@example.com", ""),
    ("", "testpassword"),
    ("test@example.com", "a" * 129),
])
def test_register_user_with_wrong_format(email, password):
    client = APIClient()
    url = reverse('register')
    data = {'email': email, 'password': password}

    response = client.post(url, data)
    print(CustomUser.objects.all())

    assert response.status_code == 400


@pytest.mark.django_db(transaction=True)
def test_login(test_user):
    client = APIClient()
    url = reverse('login')  
    data = {'email': test_user['email'], 'password': test_user['password']}
    response = client.post(url, data)

    assert response.status_code == 200

    token = response.data.get('access')
    decoded_token =jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'], verify=True)

    user_id = decoded_token.get('user_id')
    user_email = decoded_token.get('email')

    assert user_id == test_user['id']
    assert user_email == test_user['email']

@pytest.mark.django_db(transaction=True)
def test_logout(test_user):
    client = APIClient()

    login_url = reverse('login')  
    data = {'email': test_user['email'], 'password': test_user['password']}
    login_response = client.post(login_url, data)

    refresh_token = login_response.data.get('refresh')
    # print(login_response.data)
    assert refresh_token

    client.credentials(HTTP_AUTHORIZATION=f'Bearer {login_response.data.get("access")}')

    logout_url = reverse('logout')
    logout_data = {'refresh_token': refresh_token}
    response = client.post(logout_url, logout_data)

    assert response.status_code == 200


@pytest.mark.django_db(transaction=True)
@pytest.mark.parametrize("email, password, status_code",[
    ("wrongemail@gmail.com", "pwd123", 401),
    ("test456@gmail.com", "wrongCredential", 401),
    ("wrongemail@gmail.com", "wrongCredential", 401),
    # (None, "wrongCredential", 422),
    # ("wrongemail@gmail.com", None, 422)
])
def test_incorect_login(email, password, status_code):
    client = APIClient()
    url = reverse('login')  
    data = {'email': email, 'password': password}
    response = client.post(url, data)

    assert response.status_code == status_code


@pytest.mark.django_db(transaction=True)
def test_user_view(test_user):
    client = APIClient()

    login_url = reverse('login')  
    data = {'email': test_user['email'], 'password': test_user['password']}
    login_response = client.post(login_url, data)
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {login_response.data.get("access")}')

    userview_url = reverse('userview')
    response = client.get(userview_url)

    user = CustomUser.objects.filter(email=test_user['email']).first()

    assert response.status_code == 200
    assert user.id == response.data['id']