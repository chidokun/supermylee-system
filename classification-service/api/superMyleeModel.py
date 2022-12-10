import torch
from transformers import AutoModel, AutoTokenizer, AutoConfig, RobertaModel, RobertaConfig, RobertaForSequenceClassification
import torch.nn.functional as F
from torch.utils.data import Dataset
import json

class superMyleeDataset2(Dataset):
    def __init__(self,inputs,maxLength=256):
            self.tokenizer=AutoTokenizer.from_pretrained("/Users/tuan/Projects/supermylee-system/classification-service/api/vinai/phobert-base")
            self.samples=[torch.tensor((self.tokenizer.encode(sample[:maxLength-2])+[self.tokenizer.pad_token_id]*maxLength)[:maxLength]) for sample in inputs]
            
    def __len__(self):
            return len(self.samples)

    def __getitem__(self, idx):
            if torch.is_tensor(idx):
                idx = idx.tolist()
            sample = {'input': self.samples[idx],\
                    'attention_mask': self.samples[idx]!=self.tokenizer.pad_token_id, \
                    }
            return sample

class superMyleeModel(torch.nn.Module):
    def __init__(self,config,num_labels):
        super(superMyleeModel,self).__init__()
        self.phobert=RobertaModel(config=config,add_pooling_layer=False)
        self.dense = torch.nn.Linear(config.hidden_size, config.hidden_size)
        classifier_dropout = (
                config.classifier_dropout if config.classifier_dropout is not None else config.hidden_dropout_prob
        )
        self.dropout = torch.nn.Dropout(classifier_dropout)
        self.out_proj = torch.nn.Linear(config.hidden_size, num_labels)
    def forward(self,input,attention_mask):
        outputs=self.phobert(input,attention_mask=attention_mask)
        # print("[DEBUG] output:",outputs.last_hidden_state,outputs.last_hidden_state.size())
        # outputs2=self.phobert(input)
        # print("[DEBUGGING] input {}, output {}, output2 {}".format(input.size(),outputs.last_hidden_state,outputs2.last_hidden_state))
        x = outputs.last_hidden_state[:, 0, :]  # take <s> token (equiv. to [CLS])
        x = self.dropout(x)
        x = self.dense(x)
        x = torch.tanh(x)
        x = self.dropout(x)
        x = self.out_proj(x)
        return x

class superMyLeeClassifier:
    def __init__(self, checkpoint_path, labels_file, batch_size) -> None:
        with open(labels_file,"r") as f:
            self.labels=json.load(f)
        self.model=superMyleeModel(config = RobertaConfig.from_pretrained("/Users/tuan/Projects/supermylee-system/classification-service/api/vinai/phobert-base/config.json"),
                                    num_labels = len(self.labels))
        self.cuda=False
        if torch.cuda.is_available():
            self.cuda=True
            self.model.cuda()
        state_dict=torch.load(checkpoint_path)
        self.model.load_state_dict(state_dict["model"])
        self.batch_size=batch_size
            
    def predict(self,inputs):
        predicts=None
        with torch.no_grad():
            for batch in torch.utils.data.DataLoader(superMyleeDataset2(inputs),batch_size=self.batch_size, shuffle=False):
                y_preds=self.model.forward(batch["input"].cuda() if self.cuda else batch["input"],
                                        attention_mask=batch["attention_mask"].cuda() if self.cuda else batch["attention_mask"])
                y_preds = y_preds.detach().cpu()
                predicts=y_preds if predicts is None else torch.cat((predicts,y_preds),dim=0)
            predicts_probs=torch.nn.functional.softmax(predicts,dim=-1).tolist()
        return [[{"category": self.labels[idx], "category_index": idx, "score": score} for idx,score in enumerate(s)]for s in predicts_probs]

class superMyLeeClassifier2:
    def __init__(self, checkpoint_path, labels_file, batch_size) -> None:
        with open(labels_file,"r") as f:
            self.labels=json.load(f)
        config = RobertaConfig.from_pretrained("/Users/tuan/Projects/supermylee-system/classification-service/api/vinai/phobert-base/config.json",
                from_tf=False,
                num_labels = len(self.labels), 
                output_hidden_states=False,)
        self.model=RobertaForSequenceClassification.from_pretrained(checkpoint_path,config=config)
        self.cuda=False
        if torch.cuda.is_available():
            self.cuda=True
            self.model.cuda()
        self.batch_size=batch_size
            
    def predict(self,inputs):
        predicts=None
        with torch.no_grad():
            for batch in torch.utils.data.DataLoader(superMyleeDataset2(inputs),batch_size=self.batch_size, shuffle=False):
                outputs=self.model.forward(batch["input"].cuda() if self.cuda else batch["input"],
                                        attention_mask=batch["attention_mask"].cuda() if self.cuda else batch["attention_mask"])
                y_preds = outputs[0].detach().cpu()
                predicts=y_preds if predicts is None else torch.cat((predicts,y_preds),dim=0)
            predicts_probs=torch.nn.functional.softmax(predicts,dim=-1).tolist()
        return [[{"category": self.labels[idx], "category_index": idx, "score": score} for idx,score in enumerate(s)]for s in predicts_probs]
    