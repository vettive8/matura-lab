"""Prepare labelled English reading aids from prose in the official mark scheme.
The Polish original and diagram are retained for every task. Use an unpacked
Argos Polish→English 1.9 model under CACHE/translator (model and tokenizer).
"""
import re,json,tempfile
from pathlib import Path
CACHE=Path(tempfile.gettempdir())/'cke-study-pdfs'
def passages(r):
    body=r['rubric']
    rule=re.search(r'(?:^|\s)(\d+)\s*(?:pkt|p\.)\s*[–−-]\s*(.{8,900}?)(?=\s+(?:\d+\s*(?:pkt|p\.)\s*[–−-]|Rozwiązanie|Przykład|Odpowiedź|Uwaga|Strona \d)|$)',body,re.I)
    rule=rule[2].strip() if rule else ''
    ans=re.search(r'(?:Przykładowa odpowiedź|Przykładowe rozwiązanie|Przykładowe odpowiedzi|(?:^|\s)Rozwiązanie|Poprawna odpowiedź)\s*[:.]?\s+(.{18,1100})',body)
    ans=re.split(r'\s+(?:Uwaga[:.!]?|Strona \d|Nr zadania|Zadanie \d|Rozporządzenie|Więcej arkuszy)',ans[1])[0].strip() if ans else ''
    if ans and ('•' in ans):ans=next((s.strip() for s in ans.split('•') if len(s.strip())>15),'')
    if len(ans)>490 or len(ans.split())<6 or not re.search(r'[a-ząćęłńóśźż]{4,}',ans) or re.search(r'(?:\d\s*){4}|[→⇄=≈]|\bALBO\b|Wymagani|Schemat punkt',ans):ans=''
    prompt=re.sub(r'^Zadanie\s+[\d.]+\s*(?:\(0\s*[–−-]\s*\d+\))?\s*','',r['text']).strip()
    cmd=re.search(r'\b(?:Wyjaśnij|Uzasadnij|Oblicz|Określ|Uzupełnij|Wybierz|Podaj|Wykaż|Zapisz|Napisz|Narysuj|Rozstrzygnij|Oceń|Zaznacz|Sformułuj|Przedstaw|Wskaż)\b.{8,350}?(?:[.!?](?=\s|$)|$)',prompt)
    ask=cmd[0] if cmd else ''
    if len(rule)>560:rule=''
    return dict(ask=ask,rule=rule,answer=ans)
if __name__=='__main__':
    import ctranslate2 as ct
    import sentencepiece as sp
    rows=json.loads((CACHE/'study-rows.json').read_text('utf8'))
    entries={f"{r['subject']}-{r['year']}-{r['num']}":passages(r) for r in rows}
    texts=list(dict.fromkeys(v for fields in entries.values() for v in fields.values() if v))
    model=next((CACHE/'translator').glob('*/sentencepiece.model'))
    tok=sp.SentencePieceProcessor(model_file=str(model))
    opts=dict(inter_threads=1,intra_threads=4)
    try:
        translator=ct.Translator(str(model.parent/'model'),device='cuda',compute_type='int8_float16')
        translator.translate_batch([tok.encode('Budowa atomu',out_type=str)])
    except Exception:
        translator=ct.Translator(str(model.parent/'model'),device='cpu',compute_type='int8',**opts)
    out=CACHE/'translations.json'
    trans=json.loads(out.read_text('utf8')) if out.exists() else {}
    missing=sorted((t for t in texts if t not in trans),key=len)
    for i in range(0,len(missing),32):
        batch=missing[i:i+32]
        result=translator.translate_batch([tok.encode(s,out_type=str) for s in batch],beam_size=2,max_decoding_length=170)
        trans.update({s:tok.decode(r.hypotheses[0]) for s,r in zip(batch,result)})
        if i%256==0:out.write_text(json.dumps(trans,ensure_ascii=False),'utf8')
    out.write_text(json.dumps(trans,ensure_ascii=False),'utf8')
    print(len(trans),'translated source passages')
