FROM python:3.7
ADD requirements.txt ./
RUN pip3 install -r requirements.txt
RUN python3 -m spacy download en_core_web_sm
RUN mkdir /server
ADD . /server/
WORKDIR /server
RUN mkdir weight
ENTRYPOINT python3 app.py