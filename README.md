cd api
pipenv run chalice local --stage dev
pipenv run chalice deploy --stage prod


python3 -m http.server