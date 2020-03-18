# Build
`$ docker-compose build`  

# Run

### Resource
Download and extract `resource.zip` to `weight` dir
```
weight
|-- config.json:        (model configuration)
|-- model.h5:           (model weight)
|-- vn.bin:             (language model)
```

### Config file
- `model_weight`: filename of model weight, eg: model.bin
- `lm_path`: filename of language model weight, eg: vn.bin
- `alpha`: ~[0,1], pc of lm score

### Set environment variable
`$ export WEIGHT_DIR=path_to_weight_dir`  
`$ export API_ADDRESS=http://server_ip:5000/api`

### Run services
`$ docker-compose up`
