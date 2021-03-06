const r = require('request');
var params = {};
var captcha = '';

const api = {
  init(token, capt){
    params.token = token
    if(capt){captcha = capt}
  },
  call(method, args, callback){
    if(params.token){args['access_token'] = params.token} args['v'] = 5.62;
    r.post({url: 'https://api.vk.com/method/'+method, form: args}, function(err, resp, body){
      const ans = JSON.parse(body);
      if (ans.error) {
        console.error('[API] Ошибка: "'+ans.error['error_msg']+'" Метод: '+method)
      }else if(ans.error && ans.error.error_code == 14){
        api.captcha({url: ans.error.captcha_img,sid: ans.error.captcha_sid},
        {name: method,args: args}, callback)
      }else{
        if(callback)callback(ans.response)
      }
    });
  },
  upload(t, data, callback){
    if(!params.token){throw new Error('[API] Невозможно загрузить файл: отсутствует access_token')}
    if(t == 'photo'){
      this.call('photos.getMessagesUploadServer',{},re=>{
        r.post({url:re.upload_url, formData: {photo: data}}, function(e,ressp,body){
          b = JSON.parse(body)
          api.call('photos.saveMessagesPhoto',{photo: b.photo,server: b.server,hash: b.hash},
          function(resp){callback('photo'+resp[0].owner_id+'_'+resp[0].id)})
        });
      });
    }else if(t == ('audio_message' || 'graffiti')){
      this.call('docs.getUploadServer',{type: t},re=>{
        r.post({url:re.upload_url, formData: {file: data}}, function(e,ressp,body){
          b = JSON.parse(body)
          api.call('docs.save',{file: b.file, title: ''},
          function(resp){callback('docs'+resp[0].owner_id+'_'+resp[0].id)})
        });
      });
    }
  },
  captcha(o, method, callback){
    r(o.url, {encoding:null}, function(err,resp,body){
      var str = body.toString('base64');
      r.post({url: 'http://rucaptcha.com/in.php', formData: {
              method: 'base64', key: o.key,
              body: {value: str, options: {contentType: 'image/jpg'}
            }}}, function(err,resp,bo){
              var id = res.split('|')[1];
              var wait = setTimeout(function(){
                r({url: this.checkUrl,
                  qs: {key:o.key,action:'get',id:id}}, function(err,resp,b){
                  if (res.startsWith('ERROR')) console.error('[API] Ошибка распознавания капчи!');
                  if (~res.indexOf('NOT_READY')) wait()
                  method.args['captcha_sid'] = o.sid;
                  method.args['captcha_key'] = res.split('|')[1];
                  vk.call(method.name, method.args, function(res){callback(res)});
                });
              }, 5000)
            })
      })
  }
}
module.exports = api;
