"""Create English reading aids for curriculum headings and learning outcomes."""
from translate import CACHE
from requirements import ROOT
import json
import ctranslate2 as ct
import sentencepiece as sp
data=json.loads((ROOT/'requirements.json').read_text('utf8'))
keys=set(g['name'] for g in data)
for g in data:
    for item in g['items']:
        keys.update([item['sub'],item['pl']])
model=next((CACHE/'translator').glob('*/sentencepiece.model'))
tok=sp.SentencePieceProcessor(model_file=str(model))
translator=ct.Translator(str(model.parent/'model'),device='cpu',compute_type='int8',intra_threads=4)
out=ROOT/'requirements-en.json'
pairs=json.loads(out.read_text('utf8')) if out.exists() else {}
missing=sorted((k for k in keys if k and k not in pairs),key=len)
for i in range(0,len(missing),32):
    batch=missing[i:i+32]
    result=translator.translate_batch([tok.encode(s,out_type=str) for s in batch],beam_size=2,max_decoding_length=190)
    pairs.update({s:tok.decode(r.hypotheses[0]).replace('▁',' ').strip() for s,r in zip(batch,result)})
    out.write_text(json.dumps(pairs,ensure_ascii=False,indent=1)+'\n','utf8')
print(len(pairs),'curriculum translations')
