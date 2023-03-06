module.exports = {
  Prefix: "", //Örneğin; "+ [Şart]
  //Kullanmak istediğiniz Ön Eki (Prefix) yazıcaksınız. Fakat Slash Komut Destekli yaptığım için işinize yaramayacak.
  
  Owners: [""], //Örneğin; ["457480293423644672", "925432354560933950"] [Şart]
  //Sahip ID'(leri) Botu sadece bu ID'li hesaplar kullanabilir. İster 1 ID, ister 10 ID farketmez. 
  
  Token: process.env.Token, //Örneğin; "MwMksMwkKA234dD32DgHaFgnC..." [Şart]
  //Botunuzun tokenini .env klasörü oluşturup oraya yazacaksınız. Eğer repl.it kullanıyorsanız Secrets klasörüne yazmanız yeterli olacak. 
  
  mongoPass: process.env.mongoPass, //Örneğin; [Şart]
  //MongoDB URL'nizi .env klasörü oluşturup oraya yazacaksınız. Eğer replit kullanıyorsanız Secrets klasörüne yazmanız yeterli olacak. 
  
  Error_log_channel: "", //Örneğin; "802106926607106059" [Şart]
  //Botunuz bir sorun ile karşılaştığı zaman hata günlüğünü göndereceği kanalın ID'sini gireceksiniz.
  
  Auth_log_channel: "", //Örneğin; "802105106933612614" [Şart]
  //Bir kişi hesabını botunuza yetkilendirdiği zaman bilgilerinin düşeceği kanalının ID'sini gireceksiniz.
  
  oauth_link: "", //Örneğin; "https://discord.com/api/oauth2/authorize?client_id=..." [Şart]
  //Buraya ayarladığınız Redirect_Uri adresini seçerek Guilds Join ve İndentify şartlı Auth Linkini gireceksiniz. 
  
  client_id: "", //Örneğin; "123456789..." [Şart]
  //Botunuzun Client ID'sini yazacaksınız.
  
  logchannel: process.env.logchannel, //Örneğin; "https://discordapp.com/api/webhooks/..." [Şart]
  //Botun ana logu'dur ayarladığınız kanalın webhook'una düşer.
  
  autoroleserver: "", //Örneğin; "710192401896964148" [Şart Değil]
  //Oto Rol ayarlamak istediğiniz serverin ID'sini gireceksiniz.
  
  autoroleid: "", //Örneğin; "710199794857017427" [Şart Değil]
  //Oto Rol ayarlamak istediğiniz rolün ID'sini gireceksiniz.
  
  client_secret: process.env.client_secret, //Örneğin; "n5wa6tn67as3jdk..." [Şart]
  //Botunuzun Client Secreti'ni .env klasörü oluşturup oraya yazacaksınız. Eğer replit kullanıyorsanız Secrets klasörüne yazmanız yeterli olacak. 
  
  redirect_uri: "", //Örneğin; "https://en-iyisi.uzmanist.repl.co/authed" [Şart]
  //Domaininizi yazacaksınız. (Yetkilendirmeden Sonra Yönlendirilecek Site) 

} //Eğer Sorun Yaşarsanız https://discord.gg/sMPrwvZRfJ Adresinden Sunucuma Gelip Destek Alabilirsiniz.