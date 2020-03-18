# Build
`$ docker-compose build`  

# Run

### Resource
Download and extract `weight.zip`, download `vn.bin` and put it to `weight` dir
```
weight
|-- vocab
|   |-- src_vocab.txt   (src vocab)
|   `-- tgt_vocab.txt   (tgt vocab)
|-- config.json:        (model configuration)
|-- model.h5:           (model weight)
|-- vn.bin:             (language model)
```

### Config file
- `model_weight`: filename of model weight, e.g: `model.bin`

Using Language Model (important, set value for these variables)
- `lm_path`: filename of language model weight, e.g: `vn.bin`, if it is `null`, LM will be not used
- `alpha`: ~[0,1], pc of LM score, e.g: `0.5`,

### Set environment variable
`$ export WEIGHT_DIR=path_to_weight_dir`  
`$ export API_ADDRESS=http://server_ip:5000/api`

### Run services
`$ docker-compose up`
