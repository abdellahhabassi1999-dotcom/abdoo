import json,sys
src=json.load(open(sys.argv[1]))
out=[]
for c in src:
    r=c['rec']; d=dict(c['dep'])
    e=c['eq']; dep=[[k,v] for k,v in c['dep']]
    out.append({'name':c['name'],'rec':{'ia':r['IMPOTS AFFECTES'][0],'tl':r['TAXES LOCALES'][0],'tva':r['TVA'][0],'total':r['TOTAL'][1]},
      'dep':dep,'dfonct':d['DEPENSES DE FONCTIONNEMENT'],'eq':{'excP':e['EXCEDENT PREVISIONNEL 2027'],'excR':e['EXCEDENT REEL 2026'],'rep':e['REPORT DE CREDITS 2026'],'total':e['TOTAL']},
      'vol':c['vol']['TOTAL VOLUME BUDGETAIRE'],'rar':c.get('rar')})
t=open('template.html').read()
t=t.replace('/*DATA*/',json.dumps(out,ensure_ascii=False)).replace('/*CHARTJS*/',open(sys.argv[2]).read())
open('index.html','w').write(t)
print(len(t))
