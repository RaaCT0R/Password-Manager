from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Password
from .serializers import PasswordsSerializer
from .managers.encryption_manager import encryption_manager


class All(APIView):

    def get(self, request):
        passwords = Password.objects.all()
        serializer = PasswordsSerializer(passwords, many=True)

        dec_data = []
        for data in serializer.data:
            dec_data.append({
                'id': data['id'],
                'site': data['site'],
                'username': encryption_manager.decrypt(data['username']),
                'password': encryption_manager.decrypt(data['password']),
                'description': data['description']
            })

        return Response(dec_data)


class Site(APIView):

    def get(self, request, site):
        passwords = Password.objects.filter(site__contains=site)
        serializer = PasswordsSerializer(passwords, many=True)

        dec_data = []
        for data in serializer.data:
            dec_data.append({
                'id': data['id'],
                'site': data['site'],
                'username': encryption_manager.decrypt(data['username']),
                'password': encryption_manager.decrypt(data['password']),
                'description': data['description']
            })

        return Response(dec_data)


class Description(APIView):

    def get(self, request, desc):
        passwords = Password.objects.filter(description__contains=desc)
        serializer = PasswordsSerializer(passwords, many=True)

        dec_data = []
        for data in serializer.data:
            dec_data.append({
                'id': data['id'],
                'site': data['site'],
                'username': encryption_manager.decrypt(data['username']),
                'password': encryption_manager.decrypt(data['password']),
                'description': data['description']
            })

        return Response(dec_data)


class Add(APIView):

    def post(self, request):
        site = request.data['site']
        username = request.data['username']
        password = request.data['password']
        description = request.data['description']

        enc_data = {
            'site': site,
            'username': encryption_manager.encrypt(username),
            'password': encryption_manager.encrypt(password),
            'description': description
        }

        serializer = PasswordsSerializer(data=enc_data)
        if serializer.is_valid():
            serializer.save()
            return Response({'id': serializer.data['id']}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Key(APIView):

    def post(self, request):
        key = request.data['key']
        encryption_manager.update_key(key)
        return Response(data=None, status=status.HTTP_202_ACCEPTED)
