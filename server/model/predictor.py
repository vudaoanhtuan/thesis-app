import torch
import torch.nn as nn

from .model import Model
from .tokenizer import Tokenizer, load_tokenizer
from .decode import greedy_decode, BeamDecode






class Singleton(type):
    def __init__(cls, name, bases, attrs, **kwargs):
        super().__init__(name, bases, attrs)
        cls._instance = None

    def __call__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__call__(*args, **kwargs)
        return cls._instance


class Predictor(metaclass=Singleton):
    def __init__(self, config):
        print("Load vocab")
        tokenizer = load_tokenizer(config['src_vocab'], config['tgt_vocab'])

        print("Init model")
        src_vocab_len = len(tokenizer.src_stoi)
        tgt_vocab_len = len(tokenizer.tgt_stoi)

        if config['model_config']:
            model_config = config['model_config']
        else:
            model_config = {}
        
        model_config['init_param'] = False

        model = Model(src_vocab_len, tgt_vocab_len, **model_config)
        print("Load model")
        state = torch.load(config['model_weight'], map_location='cpu')
        model.load_state_dict(state)

        print("Init decoder")
        beam_decoder = BeamDecode(
            model, tokenizer, 
            beam_size=config['beam_size'], max_len=config['max_len'], pc_min_len=config['pc_min_len'],
            lm_path=config['lm_path'], alpha=config['alpha'], 
            len_norm_alpha=config['len_norm_alpha']
        )

        self.tokenizer = tokenizer
        self.model = model
        self.decoder = beam_decoder

    def predict(self, text):
        return self.decoder.predict(text)



