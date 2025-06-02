function doGet(e) {
  if (e == undefined) {
    console.warn('この関数は HTTP GET から実行してください。');
    return;
  }
  if (!e.parameter.button_on_air || !e.parameter.button_on_key || !e.parameter.temperature) {
    console.warn('中身空やん');
    let res = { air:e.parameter.button_on_air, key:e.parameter.button_on_key, temp:e.parameter.temperature };
    let jsonStr = JSON.stringify(res); // JSON文字列に変換
    return ContentService.createTextOutput(jsonStr);
  }
  let button_on_air = parseInt(e.parameter.button_on_air, 10);  // 文字列を整数に変換
  let button_on_key = parseInt(e.parameter.button_on_key, 10);  // 文字列を整数に変換
  let temperature = parseInt(e.parameter.temperature, 10);  // 文字列を整数に変換

  // let button_on = 1;
  // let temperature = 15;
  var st = SpreadsheetApp.getActiveSheet();
  // button_onと現在の気温をURLから読み込む
  let now = new Date();
  let format = 'yyyy年MM月dd日 HH時mm分ss秒';
  let time_log = Utilities.formatDate(now, 'Asia/Tokyo', format);
  console.log(time_log);
  write_log(time_log, button_on_air, button_on_key, temperature);

  let input_time_air = st.getRange('A2').getValue();
  let input_time_key = st.getRange('A4').getValue();
  let now_temp = st.getRange('B2').getValue();
  console.log(input_time_air, input_time_key, now_temp);

  let res = { now_temp: now_temp, input_time_air: input_time_air, input_time_key: input_time_key };
  // let jsonStr = JSON.stringify(res); // JSON文字列に変換
  console.log(jsonStr);
  // return ContentService.createTextOutput(jsonStr);
  const template = HtmlService.createTemplateFromFile('main');
  template.paramData = JSON.stringify(res);
  return template.evaluate();
  // var response = JSON.stringify(object);
  // return ContentService.createTextOutput(response);
}

function write_log(time, button_on_air, button_on_key, temperature) {
  let st = SpreadsheetApp.getActiveSheet();
  let c = st.getRange('A2');
  if(button_on_air == 1){
    c.setValue(time);
  }else if(button_on_key == 1){
    c = st.getRange('A4');
    c.setValue(time);
  }else if(button_on_key == 2){
    c = st.getRange('B4');
    c.setValue(time);
  }else if(temperature != 0){
    c = st.getRange('B2');
    c.setValue(temperature);
  };
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
