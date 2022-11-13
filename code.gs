function getNextDate() {
  const MONTHS = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  const now = new Date();
  now.setMonth(now.getMonth() + 1);
  return `${MONTHS[now.getMonth()]}_${now.getFullYear().toString().substring(2)}`;
}

function onOpen(e) {
  SpreadsheetApp.getUi()
      .createMenu('Exportar partidas')
      .addItem('Google DOC', 'createDoc')
      .addToUi();
}

function createDoc() {
  const VERSION = '1.1.0';
  const CUSTOMER_SPREADSHEET = '{Google Spreadsheet ID}';
  const data = SpreadsheetApp.openById(CUSTOMER_SPREADSHEET);

  const sheet = data.getSheets()[0];

  const dataRange = sheet.getRange("A:C");
  const values = dataRange.getValues();
  var content = values.filter(item => {
    return item.join('') !== '';
  })
  
  const columns = content[0].length;
  const header = [...content[0]];
  content.shift();
  const docTitle = `RL_${getNextDate()}`;
  
  
  const doc = DocumentApp.create(docTitle);
  var body = doc.getBody();

  
  for (let i=0; i<content.length; i++) {
    const item = content[i];
    const title = item[0]
    
    if (i === 0) {
      body.getChild(0).asParagraph().setText(title);
      body.getChild(0).setBold(true);
    } else {
      body.appendParagraph(title).setBold(true);
    }
    body.appendParagraph('').setBold(false);
    body.appendParagraph(`<strong>${header[1]}</strong>: ${item[1]}`);
    body.appendPageBreak();
  
  }

  

  
}
