const RECIPIENT = 'lehuuduc0704@gmail.com';

function doPost(e) {
  try {
    const p = (e && e.parameter) || {};
    const required = ['fullname', 'q1', 'q2', 'q3', 'q4'];
    if (required.some(key => !p[key] || String(p[key]).trim() === '')) {
      return ContentService.createTextOutput('Missing fields');
    }
    const clean = value => String(value).trim().slice(0, 200);
    const name = clean(p.fullname);
    const body = [
      'Câu trả lời khảo sát hành vi giải trí ở sinh viên',
      'Thời gian: ' + new Date().toLocaleString('vi-VN', {timeZone: 'Asia/Ho_Chi_Minh'}),
      'Họ và tên: ' + name,
      'Thói quen lúc rảnh: ' + clean(p.q1),
      'Một tuần rảnh muốn đến: ' + clean(p.q2),
      'Khi áp lực làm đầu tiên: ' + clean(p.q3),
      'Thích làm cùng với: ' + clean(p.q4)
    ].join('\n');
    MailApp.sendEmail(RECIPIENT, 'Khảo sát giải trí sinh viên — ' + name, body);
    return ContentService.createTextOutput('OK');
  } catch (err) {
    console.error(err);
    return ContentService.createTextOutput('ERROR');
  }
}
