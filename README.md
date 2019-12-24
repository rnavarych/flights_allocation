## Test task about allocation passengers between flights

### Backend part:

***For the running of the backend part you should use this steps:***

**steps:**
> 1. cd rubiq_backend
> 2. yarn install
> 3. yarn start

***For the running of the frontend part you should use this steps:***

**steps:**
> 1. cd rubiq_frontend
> 2. yarn install
> 3. yarn start

For the testing of the algorithm you can find files:
```
flights:     ./rubiq_frontend/flights1.csv
passengers:  ./rubiq_frontend/PNR1-task.csv
```

<p align="left" >
  <kbd>
    <img src="http://dl4.joxi.net/drive/2019/12/24/0023/3958/1511286/86/0e067ff938.jpg" title="Files uploading" float="left">
  </kbd>
</p>

### DOCKER

***For the running of the backend part with DOCKER you should use this steps:***

**steps:**
> 1. cd rubiq_backend
> 2. docker image build -t rubiq_b .
> 3. docker container run --publish 8081:8081 --detach --name b_rubiq rubiq_b

***For the running of the frontend part with DOCKER you should use this steps:***

**steps:**
> 1. cd rubiq_frontend
> 2. docker image build -t rubiq_f .
> 3. docker container run --publish 3001:3001 --detach --name f_rubiq rubiq_f
