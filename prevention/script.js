
const ACTIVITIES=[
{id:'walk',name:'걷기·운동하기',desc:'산책, 체조 등',img:'assets/s1_walk.webp'},
{id:'social',name:'친구·이웃 만나기',desc:'대화, 모임 등',img:'assets/s1_social.webp'},
{id:'read',name:'책 읽고 공부하기',desc:'글쓰기, 신문 등',img:'assets/s1_read.webp'},
{id:'eat',name:'건강하게 먹기',desc:'과일, 채소, 골고루 먹기',img:'assets/s1_eat.webp'},
{id:'hobby',name:'취미생활 하기',desc:'그림, 만들기, 노래 등',img:'assets/s1_hobby.webp'},
{id:'learn',name:'새로운 것 배우기',desc:'컴퓨터, 스마트폰, AI 등',img:'assets/s1_learn.webp'}];
const MESSAGES=[
{id:'walk',name:'우리 같이 걸어요!',img:'assets/s2_walk.webp'},
{id:'friends',name:'친구들과 자주 만나요!',img:'assets/s2_friends.webp'},
{id:'learn',name:'즐겁게 배우고 공부해요!',img:'assets/s2_learn.webp'},
{id:'check',name:'치매검진 미리 받아요!',img:'assets/s2_check.webp'},
{id:'together',name:'치매가 있어도 함께 살아요!',img:'assets/s2_together.webp'}];
const SCENES=[
{id:'walk',name:'사람들과 걷고 있어요',img:'assets/s3_walk.webp'},
{id:'laugh',name:'친구들과 웃고 있어요',img:'assets/s3_laugh.webp'},
{id:'read',name:'책을 읽고 있어요',img:'assets/s3_read.webp'},
{id:'eat',name:'건강한 음식을 먹고 있어요',img:'assets/s3_eat.webp'},
{id:'hobby',name:'즐겁게 취미생활을 해요',img:'assets/s3_hobby.webp'},
{id:'check',name:'치매검진을 받고 있어요',img:'assets/s3_check.webp'}];
const PLACES=[
{id:'neighborhood',name:'우리 동네',img:'assets/s4_neighborhood.webp'},
{id:'park',name:'공원',img:'assets/s4_park.webp'},
{id:'center',name:'경로당',img:'assets/s4_center.webp'},
{id:'home',name:'집',img:'assets/s4_home.webp'},
{id:'dementia',name:'치매안심센터',img:'assets/s4_dementia.webp'},
{id:'other',name:'기타',img:'assets/s4_other.webp'}];
let activityIds=new Set(),activityCustom=[],messageIds=new Set(),messageCustom=[],sceneId='',sceneCustom='',placeId='',placeCustom='';
const $=id=>document.getElementById(id);
function safe(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function card(item,selected,click,extra=''){return `<div class="card ${selected?'selected':''} ${extra}" onclick="${click}"><div class="photo"><img src="${item.img}" alt="${safe(item.name)}"></div><div class="meta"><strong>${safe(item.name)}</strong>${item.desc?`<small>${safe(item.desc)}</small>`:''}</div><div class="tick">✓</div></div>`}
function renderActivities(){$('activityGrid').innerHTML=ACTIVITIES.map(x=>card(x,activityIds.has(x.id),`toggleActivity('${x.id}')`)).join('')}
function renderMessages(){$('messageGrid').innerHTML=MESSAGES.map(x=>card(x,messageIds.has(x.id),`toggleMessage('${x.id}')`)).join('')}
function renderScenes(){$('sceneGrid').innerHTML=SCENES.map(x=>card(x,sceneId===x.id,`pickScene('${x.id}')`)).join('')}
function renderPlaces(){$('placeGrid').innerHTML=PLACES.map(x=>card(x,placeId===x.id,`pickPlace('${x.id}')`,'location-card')).join('')}
function toggleActivity(id){activityIds.has(id)?activityIds.delete(id):activityIds.add(id);renderActivities();updateSummary();hideWarn()}
function toggleMessage(id){messageIds.has(id)?messageIds.delete(id):messageIds.add(id);renderMessages();updateSummary();hideWarn()}
function pickScene(id){sceneId=id;sceneCustom='';$('sceneOther').value='';renderScenes();updateSummary();hideWarn()}
function pickPlace(id){placeId=id;placeCustom='';if(id!=='other')$('placeOther').value='';renderPlaces();updateSummary();hideWarn()}
function addOtherActivity(){const v=$('activityOther').value.trim();if(!v)return;if(!activityCustom.includes(v))activityCustom.push(v);$('activityOther').value='';updateSummary();hideWarn()}
function addOtherMessage(){const v=$('messageOther').value.trim();if(!v)return;if(!messageCustom.includes(v))messageCustom.push(v);$('messageOther').value='';updateSummary();hideWarn()}
function setOtherScene(){const v=$('sceneOther').value.trim();if(!v)return;sceneId='';sceneCustom=v;renderScenes();updateSummary();hideWarn()}
function setOtherPlace(){const v=$('placeOther').value.trim();if(!v)return;placeId='';placeCustom=v;renderPlaces();updateSummary();hideWarn()}
function activityNames(){return [...ACTIVITIES.filter(x=>activityIds.has(x.id)).map(x=>x.name),...activityCustom]}
function messageNames(){return [...MESSAGES.filter(x=>messageIds.has(x.id)).map(x=>x.name),...messageCustom]}
function sceneName(){return sceneCustom||(SCENES.find(x=>x.id===sceneId)||{}).name||''}
function placeName(){return placeCustom||(PLACES.find(x=>x.id===placeId)||{}).name||''}
function updateSummary(){const a=activityNames(),m=messageNames(),s=sceneName(),p=placeName();$('sumActivities').textContent=a.length?a.map(x=>'• '+x).join('\n'):'아직 선택하지 않았어요.';$('sumMessages').textContent=m.length?m.map(x=>'• '+x).join('\n'):'아직 선택하지 않았어요.';$('sumScene').textContent=s||'아직 선택하지 않았어요.';$('sumPlace').textContent=p||'아직 선택하지 않았어요.'}
function showWarn(t){$('warn').textContent='⚠️ '+t;$('warn').style.display='block';$('warn').scrollIntoView({behavior:'smooth',block:'center'})}function hideWarn(){$('warn').style.display='none'}
function makePrompt(){const a=activityNames(),m=messageNames(),s=sceneName(),p=placeName();if(!a.length)return showWarn('1단계에서 예방 활동을 하나 이상 골라주세요.');if(!m.length)return showWarn('2단계에서 포스터 문구를 하나 이상 골라주세요.');if(!s)return showWarn('3단계에서 포스터 속 모습을 골라주세요.');if(!p)return showWarn('4단계에서 장소를 골라주세요.');const prompt=`다음 조건에 맞춰 한국어로 된 1장의 세로형 '치매예방 포스터' 이미지를 만들어 줘.\n\n[포스터 목적]\n- 건강한 생활습관과 사회적 활동을 쉽고 따뜻하게 보여주는 교육용 포스터\n- 70~80대 어르신이 보기 쉬운 완성형 이미지\n\n[내가 선택한 내용]\n- 내가 실천하고 싶은 활동: ${a.join(', ')}\n- 사람들에게 전하고 싶은 말: ${m.join(' / ')}\n- 포스터 속 나의 모습: ${s}\n- 장소: ${p}\n\n[이미지 구성]\n- 4:5 세로 비율 한 장짜리 포스터\n- 밝고 따뜻한 한국의 일상 풍경\n- 친근한 한국 어르신이 중심이 되는 장면\n- ${s} 모습이 자연스럽게 드러나게 표현\n- 장소는 ${p}로 표현\n- 내가 고른 활동(${a.join(', ')})을 작은 장면이나 아이콘으로 자연스럽게 반영\n- 포스터 문구는 ${m.map(x=>'“'+x+'”').join(', ')} 중 핵심 문구를 크고 또렷하게 배치\n- 파스텔 색감, 밝은 분위기, 큰 한국어 글씨, 읽기 쉬운 정보 구조\n- 너무 많은 문장을 넣지 말고 핵심 정보만 간결하게 배치\n\n[표현 주의]\n- 치매를 완전히 예방하거나 치료할 수 있다고 단정하지 말 것\n- 건강한 생활습관, 사회적 교류, 검진 등 일반적인 건강 정보로 표현할 것\n- 공포스럽거나 병원 중심의 무거운 분위기는 피하고 긍정적이고 존중감 있는 분위기로 만들 것\n\n전체 결과물은 설명문이 아니라 실제로 완성된 포스터 이미지 한 장으로 만들어 줘.`;$('promptOutput').textContent=prompt;$('result').classList.add('show');$('result').scrollIntoView({behavior:'smooth',block:'start'});hideWarn()}
async function copyPrompt(btn){const t=$('promptOutput').textContent;if(!t)return;try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(t)}else{const ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove()}const old=btn.textContent;btn.textContent='✅ 복사되었습니다!';setTimeout(()=>btn.textContent=old,1600)}catch(e){alert('복사에 실패했어요. 프롬프트를 직접 선택해 복사해 주세요.')}}
function resetAll(){activityIds.clear();activityCustom=[];messageIds.clear();messageCustom=[];sceneId='';sceneCustom='';placeId='';placeCustom='';['activityOther','messageOther','sceneOther','placeOther'].forEach(id=>$(id).value='');renderActivities();renderMessages();renderScenes();renderPlaces();updateSummary();$('result').classList.remove('show');hideWarn();window.scrollTo({top:0,behavior:'smooth'})}
$('activityOther').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();addOtherActivity()}});$('messageOther').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();addOtherMessage()}});$('sceneOther').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();setOtherScene()}});$('placeOther').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();setOtherPlace()}});
renderActivities();renderMessages();renderScenes();renderPlaces();updateSummary();
