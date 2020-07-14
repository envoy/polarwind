from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

UserModel = get_user_model()

import jwt
from datetime import datetime
from envoy_auth.models import EnvoyToken


# from django.contrib.auth.models import User
# from customers.models import Customer

class EnvoyAuthBackend(ModelBackend):

    ENVOY_JWT_PUBLIC_KEY = """-----BEGIN PUBLIC KEY-----
MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAExz0RpzznxVfhDJGEDVWVBZ5sT4uJDHLT
6Al27gpfLgpvZ6fFjuTKXRDGbdcJYwUXfr+aZMUU92chRtgPAYRM4sTLzWQ3uL5o
Fns98matgg8uQ5ZEnmEocNAppU09P37m
-----END PUBLIC KEY-----
"""

    def authenticate(self, request, oauth_token):
        """
        This Auth Backend can be used alongside other backends. When an Envoy user
        authenticates, it will create new User model, and save the associated
        OAuth token in the custom model EnvoyToken.
        """
        if not oauth_token:
            return

        # If this is the first time we see this User, 
        # we create a new User with the username "envoy:[envoy_user_id]"
        username = 'envoy:' + str(self._get_envoy_user_id(oauth_token))

        user, created = UserModel._default_manager.get_or_create(**{
            UserModel.USERNAME_FIELD: username
        })

        # Saves the OAuth token a custom model linked to the User.
        user = self._save_oauth_token(user, oauth_token)

        return user if self.user_can_authenticate(user) else None


    def _get_envoy_user_id(self, oauth_token):
        """
        Extracts the Envoy User ID from the JWT Token
        """
        payload = self._get_jwt_payload(oauth_token)
    
        if payload['sub'] is not None:
            sub_type, sub_id = payload['sub'].split(':')

        if sub_type == 'User':
            return int(sub_id)

    
    def _save_oauth_token(self, user, oauth_token):
        """
        Creates/Updates an EnvoyToken associated with the authenticaed User.
        """
        payload = self._get_jwt_payload(oauth_token)

        args = {
            'envoy_user_id':    self._get_envoy_user_id(oauth_token),
            'envoy_company_id': int(oauth_token['company_id']),
            'jwt_scopes':       ",".join(payload['scopes']),
            'token_type':       oauth_token['token_type'],
            'access_token':     oauth_token['access_token'],
            'expires_at':       datetime.utcfromtimestamp(oauth_token['expires_at'])
        }

        if hasattr(user, 'envoytoken'):
            for attr, value in args.items():
                setattr(user.envoytoken, attr, value)
            user.envoytoken.save()

        else:
            args['user'] = user
            EnvoyToken.objects.create(**args)

        return user


    jwt_payloads = {}
    
    def _get_jwt_payload(self, oauth_token):
        """
        Decodes and Memoizes the JWT token
        """
        jwt_token = oauth_token['access_token']

        if jwt_token in self.jwt_payloads:
            return self.jwt_payloads[jwt_token]

        # payload = jwt.decode(jwt_token, self.ENVOY_JWT_PUBLIC_KEY, verify=True)
        payload = jwt.decode(jwt_token, verify=False)

        self.jwt_payloads[jwt_token] = payload
        
        return payload



    # Custom Permissions can be added here
    def has_perm(self, user_obj, perm, obj=None):
        # This permission checks that the user and the object are part of the same Company
        if perm == 'IsInCompany':
            if isinstance(obj, dict):
                company_id = obj['company_id']
            else:
                company_id = obj.company_id

            return user_obj.envoytoken.envoy_company_id == company_id

        else:
            print("Unknown Permission")   

        return False

